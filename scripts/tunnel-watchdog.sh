#!/usr/bin/env bash
set -u

# Auto-reconnect watchdog for localhost.run SSH tunnel.
# Defaults assume nginx listens on local port 80.

HOST="${TUNNEL_HOST:-localhost.run}"
SSH_USER="${TUNNEL_SSH_USER:-nokey}"
REMOTE_PORT="${TUNNEL_REMOTE_PORT:-80}"
LOCAL_PORT="${TUNNEL_LOCAL_PORT:-80}"
RETRY_SECONDS="${TUNNEL_RETRY_SECONDS:-3}"

RUNTIME_DIR="${TUNNEL_RUNTIME_DIR:-/root/health-vault-aura/.runtime}"
LOG_FILE="${RUNTIME_DIR}/localhostrun.log"
URL_FILE="${RUNTIME_DIR}/localhostrun.url"
PID_FILE="${RUNTIME_DIR}/localhostrun.pid"
LOCK_FILE="${RUNTIME_DIR}/localhostrun.lock"

mkdir -p "${RUNTIME_DIR}"

exec 9>"${LOCK_FILE}"
if ! flock -n 9; then
  echo "[watchdog] another watchdog process is already running"
  exit 1
fi

echo "$$" > "${PID_FILE}"
cleanup() {
  rm -f "${PID_FILE}"
}
trap cleanup EXIT

echo "[$(date '+%F %T')] watchdog started (remote:${REMOTE_PORT} -> local:${LOCAL_PORT})" >> "${LOG_FILE}"

while true; do
  echo "[$(date '+%F %T')] connecting to ${SSH_USER}@${HOST}" >> "${LOG_FILE}"
  compact_buffer=""

  ssh \
    -o StrictHostKeyChecking=no \
    -o ServerAliveInterval=30 \
    -o ExitOnForwardFailure=yes \
    -R "${REMOTE_PORT}:localhost:${LOCAL_PORT}" \
    "${SSH_USER}@${HOST}" 2>&1 | while IFS= read -r line; do
      echo "${line}" >> "${LOG_FILE}"
      compact_buffer="${compact_buffer}${line}"
      compact_buffer="$(echo "${compact_buffer}" | tr -d '[:space:]' | tail -c 4000)"
      latest_url="$(echo "${compact_buffer}" | grep -Eo 'https://[A-Za-z0-9]+\.lhr\.life' | tail -n 1 || true)"
      if [ -n "${latest_url}" ]; then
        echo "${latest_url}" > "${URL_FILE}"
      fi
    done

  exit_code=${PIPESTATUS[0]}

  echo "[$(date '+%F %T')] tunnel exited with code ${exit_code}, retry in ${RETRY_SECONDS}s" >> "${LOG_FILE}"
  sleep "${RETRY_SECONDS}"
done
