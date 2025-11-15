@echo off
echo 🚀 Starting all services in the same terminal...

cd create-user-service
start /B mvn spring-boot:run
cd ..

cd signin-service
start /B mvn spring-boot:run
cd ..

cd forgot-password-service
start /B mvn spring-boot:run
cd ..

cd update-profile-service
start /B mvn spring-boot:run
cd ..

cd user-dashboard
start /B npm start
cd ..

echo ✅ All services started (running in background). Press Ctrl+C to stop.
pause
