@REM H:
@REM cd /ent
@REM call npm -version
@REM npn stop
@echo off

echo Starting all bots...

 start node index.js 

cd .. 
 start serve -s build 

 start opera http://localhost:5000