@echo off
cd /d "%~dp0"
set "PATH=C:\Users\abdul\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin;%PATH%"
node node_modules\next\dist\bin\next dev --hostname 127.0.0.1
pause
