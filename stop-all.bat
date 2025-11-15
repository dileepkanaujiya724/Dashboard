@echo off
echo Stopping all Spring Boot and React services...
taskkill /IM java.exe /F
taskkill /IM node.exe /F
echo All services stopped.
pause
