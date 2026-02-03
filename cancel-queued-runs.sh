#!/usr/bin/env bash
# cancel-queued-runs-with-poll.sh
# - Dry-run by default. Use --execute to perform cancels.
# - --force-delete will attempt DELETE if cancel isn't accepted (admin only).
# - Polls runs in pre-queue states for up to MAX_WAIT seconds to see if they become queueable.
set -euo pipefail

REPO="CloseZad/portfolio"
TOKEN="${GITHUB_TOKEN:-}"
PER_PAGE=100

DRY_RUN=true
FORCE_DELETE=false
MAX_WAIT=30        # max seconds to wait for a run to become queued
POLL_INTERVAL=3    # seconds between checks

for arg in "$@"; do
  case "$arg" in
    --execute) DRY_RUN=false ;;
    --force-delete) FORCE_DELETE=true ;;
    -h|--help)
      echo "Usage: $0 [--execute] [--force-delete]"
      exit 0
      ;;
    *) echo "Unknown arg: $arg"; exit 1 ;;
  esac
done

if [ -z "$TOKEN" ]; then
  echo "ERROR: please set GITHUB_TOKEN (repo + workflow scopes)"
  exit 1
fi

echo "Fetching recent workflow runs for repo: $REPO..."
runs_json=$(curl -s -H "Authorization: Bearer $TOKEN" -H "Accept: application/vnd.github+json" \
  "https://api.github.com/repos/$REPO/actions/runs?per_page=$PER_PAGE")

run_count=$(echo "$runs_json" | jq -r '.total_count // 0')
if [ "$run_count" -eq 0 ]; then
  echo "No workflow runs found."
  exit 0
fi

echo "Found $run_count runs (first page up to $PER_PAGE)."

echo "$runs_json" | jq -c '.workflow_runs[]' | while read -r run; do
  id=$(echo "$run" | jq -r '.id')
  name=$(echo "$run" | jq -r '.name')
  head_branch=$(echo "$run" | jq -r '.head_branch')
  created_at=$(echo "$run" | jq -r '.created_at')
  url=$(echo "$run" | jq -r '.html_url')
  status=$(echo "$run" | jq -r '.status // "null"')
  conclusion=$(echo "$run" | jq -r '.conclusion // "null"')

  echo "----------------------------------------"
  echo "Run ID: $id"
  echo "  workflow:  $name"
  echo "  branch:    $head_branch"
  echo "  created:   $created_at"
  echo "  url:       $url"
  echo "  status:    $status"
  echo "  conclusion:$conclusion"

  # Only attempt cancel for queued or in_progress runs
  attempt_cancel=false
  if [ "$status" = "queued" ] || [ "$status" = "in_progress" ]; then
    attempt_cancel=true
  else
    # for runs in requested/waiting/pending, poll briefly to see if they become queued
    if [ "$status" = "requested" ] || [ "$status" = "waiting" ] || [ "$status" = "pending" ]; then
      echo "  Run is in pre-queue state ($status). Polling up to $MAX_WAIT seconds for queued/in_progress..."
      waited=0
      while [ "$waited" -lt "$MAX_WAIT" ]; do
        sleep "$POLL_INTERVAL"
        waited=$((waited + POLL_INTERVAL))
        # fetch latest run status
        latest=$(curl -s -H "Authorization: Bearer $TOKEN" -H "Accept: application/vnd.github+json" \
          "https://api.github.com/repos/$REPO/actions/runs/$id")
        new_status=$(echo "$latest" | jq -r '.status // "null"')
        echo "    checked at +${waited}s: status=$new_status"
        if [ "$new_status" = "queued" ] || [ "$new_status" = "in_progress" ]; then
          attempt_cancel=true
          break
        fi
        if [ "$new_status" = "completed" ]; then
          echo "    run completed while waiting; skipping."
          break
        fi
      done
      if ! $attempt_cancel; then
        echo "  Not queued after ${MAX_WAIT}s; skipping cancel for $id (server will queue later or it's non-cancelable)."
      fi
    else
      echo "  Run status '$status' is not cancelable. Skipping."
    fi
  fi

  if ! $attempt_cancel; then
    continue
  fi

  if $DRY_RUN; then
    echo "  Dry-run: would attempt cancel for run $id"
    continue
  fi

  echo "  Sending cancel request..."
  # capture response body and code
  resp=$(curl -s -w "\n--CODE--%{http_code}" -X POST \
    -H "Authorization: Bearer $TOKEN" -H "Accept: application/vnd.github+json" \
    "https://api.github.com/repos/$REPO/actions/runs/$id/cancel" || true)
  body=$(echo "$resp" | sed -n '1,/--CODE--/p' | sed '/--CODE--/d')
  code=$(echo "$resp" | sed -n 's/.*--CODE--\([0-9]\+\)$/\1/p')

  echo "  HTTP $code"
  if [ -n "$body" ]; then
    echo "  Response body: $body"
  fi

  if [ "$code" = "202" ]; then
    echo "  Cancel accepted."
    continue
  fi

  if [ "$code" = "409" ]; then
    echo "  Server returned 409 (not cancelable right now). Message above may say: 'Cannot cancel a workflow re-run that has not yet queued.'"
    if $FORCE_DELETE; then
      echo "  Attempting DELETE (admin required)..."
      del_resp=$(curl -s -w "\n--CODE--%{http_code}" -X DELETE \
        -H "Authorization: Bearer $TOKEN" -H "Accept: application/vnd.github+json" \
        "https://api.github.com/repos/$REPO/actions/runs/$id" || true)
      del_body=$(echo "$del_resp" | sed -n '1,/--CODE--/p' | sed '/--CODE--/d')
      del_code=$(echo "$del_resp" | sed -n 's/.*--CODE--\([0-9]\+\)$/\1/p')
      echo "  DELETE HTTP $del_code"
      [ -n "$del_body" ] && echo "  DELETE body: $del_body"
      if [ "$del_code" = "204" ]; then
        echo "  Deleted run $id."
      else
        echo "  Delete failed (HTTP $del_code). Check permissions or API messages."
      fi
    else
      echo "  Not deleting (use --force-delete to allow deletion)."
    fi
  else
    echo "  Cancel failed with HTTP $code. Check response above and consider contacting GitHub Support if you see 5xx errors."
  fi
done

echo "Done."