*install virtual env : 
python -m venv myenv
*activate it : 
.\myenv\Scripts\activate
*install djangorestframework : 
pip install djangorestframework
*create django project
django-admin startproject DjangoAPI
*run the project
.\manage.py runserver
*create new App :
python .\manage.py startapp EmployeeApp
*make migrations : 
python .\manage.py makemigrations EmployeeApp
*migrate : 
python .\manage.py migrate EmployeeApp