@REM Set up Virtual Environment
py -m pip install virtualenv
py -m venv venv

@REM Activate Virtual Environment
.\venv\Scripts\activate

@REM Install dependencies for server
py -m pip install -r requirements.txt

@REM Give choice for creating a super user
@echo off

set /p input=Type 'y' if you'd like to create an admin user account: 
if "%input%"=="y" (
    @REM Yes please I want a super user account!!
    cd ./app
    py manage.py createsuperuser
    cd ../
)

@REM Deactivate Virtual Environment
.\venv\Scripts\deactivate

echo Exiting set up...