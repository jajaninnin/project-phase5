# PARENTLY

## Description

"Parently"

---

## Features

- Create and sign into your account
- Create and view
- Full CRUD functionality
- Filter
- Create 

## Setup

1. Clone the Github Repo
2. Navigate to the server directory
3. Ensure you have the proper dependencies installed:
```console
pip install flask flask-sqlalchemy flask-migrate flask-cors
```
4. Create a pipenv shell to work in:
```console
pipenv install
pipenv shell
```
5. Create and upgrade the SQL database:
```console
export FLASK_RUN=app.py
flask db init
flask db migrate
flask db upgrade
```
6. Finally, run the flask server:
```console
flask run
```
7. Now for the frontend, navigate out of the server directory and into the client directory
8. Install dependencies:
```console
npm install
```
9. Run the frontend server:
```console
npm start
```
10. Your program should now be up and running!

## Routes

### Signup

- POST ```/signup```: creates a new user within the database and signs them in
- GET ```/check```: returns the current user that the session belongs to
- POST ```/login```: creates a new login request using existing users in the database and signs them in
- DELETE ```/logout```: removes the current user's session (signs them out)

### User Profile

- PATCH ```/myprofile/edit'```: edit the current user within the database

### Children

- GET ```/children```: returns a list of all children in the database
- POST ```/children```: creates a new child within the database
- GET ```/children/<id>```: returns a child at the specified id
- PUT ```/children/<id>```: updates a child with new information at a specified id
- DELETE ```/children/<id>```: permanently removes a child from the database at a specified id

### Families

- GET ```/families```: returns a list of families in the database
- POST ```/families```: creates a new family within the database
- GET ```/families/<id>```: returns a family at the specified id
- PATCH ```/families/<id>```: updates a family with given information at a specified id
-DELETE ```/families/<id>```: permanently removes a family from the database at a specified id
-GET ```/users-families/<id>```: returns a the user owner of a family at a specified id

### Files

- GET ```/children-files```: returns a list of all files in the database
- GET ```/children-files/<id>```: returns an file at the specified id
- POST ```/children-files/<id>```: creates a new file to add to the collection at the specified id
- DELETE ```/children-files/<id>```: permanently removes an file or collection of files from a specified id

## Usage

### Sign-in

1. Navigate to the 'Sign In' page
2. If you are creating a new account, select the register new account button
3. Enter your credentials to sign in, if successful you will recieve an alert confirming your sign in and be redirected to the home page
4. While signed in, you can fully access the features of this website, but you can always log out at any point by selecting the logout button in the navbar

### Managing Your Account

1. Access your profile from the dashboard.
2. Update your profile or change your password as needed.

### Creating and Viewing children

1. To add a child, sign in and navigate to the 'Create child' page
2. Enter in all of the information about the child and click submit to confirm it being added
3. To view children, navigate to the 'children' page
4. From here, you may sort by price, and click on a child to view more information

### Altering Your children

1. While signed in, navigate to the 'My children' page
2. From here, you can view all of your current children, click on the one that you wish to alter to pull up its full detailed information
3. If you wish to delete a child, simply click the delete button and confirm it's removal WARNING: THIS ACTION CANNOT BE UNDONE
4. If you wish to edit a child, click the edit button to pull up it's information, and change it as you want. files will have to be reattached, but otherwise you can make changes using it's current information

### Creating and Viewing Families

1. While signed in, navigate to the 'family' page
2. You now can navigate to the 'families' page to view all of your current families
3. Clicking on each family will allow you to view the details of the each family
4. In each family, you can now view the members and events

### Altering Your Family

1. While signed in, navigate to the 'My Family' page
2. From here, you can view all of your current family, click on the one that you wish to alter to pull up its full detailed information
3. If you wish to delete a family, simply click the delete button and confirm it's removal WARNING: THIS ACTION CANNOT BE UNDONE
4. If you wish to edit a family, click the edit button to pull up it's information, and change it as you want. files will have to be reattached, but otherwise you can make changes using it's current information

### Files - create, view, delete

1. While signed in, navigate to the 'family' page
2. You now can navigate to the 'families' page to view all of your current families
3. Clicking on each family will allow you to view the details of the each family
4. In each family, you can now view the members and events


