@REM Activate Virtual Environment
call .\venv\Scripts\activate

@REM Run Server
cd ./app
py manage.py runserver
cd ../