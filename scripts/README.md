# Auto-push every 5 minutes

`auto-push.sh` commits and pushes any changes every 5 minutes when the launchd job is loaded.

**Requirement:** Git must be able to push without a password prompt (SSH key or stored credential).

## Enable (run once)

```bash
ln -sf "$(pwd)/scripts/com.jarrydaddinall.homeclear.autopush.plist" ~/Library/LaunchAgents/
launchctl load ~/Library/LaunchAgents/com.jarrydaddinall.homeclear.autopush.plist
```

## Disable

```bash
launchctl unload ~/Library/LaunchAgents/com.jarrydaddinall.homeclear.autopush.plist
```

## Logs

- stdout: `/tmp/autopush-homeclear.log`
- stderr: `/tmp/autopush-homeclear.err`
