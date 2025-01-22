# FAMILYHUB

## Description

"FamilyHub"

A parenting app designed to make family management easier and more organized. nWith features like creating and joining families, adding children, and uploading files for each child, it ensures you stay on top of every detail. You can also create and view family events, keeping everyone in the loop. Whether you're organizing a playdate, tracking milestones, or simply sharing important documents, our app helps you manage it all in one place.

---

## Features

- Create and sign into your account
- Update your profile information, has a summary of your relationships
- Create, view and join a 'family'
- Create and delete events per 'family'
- Create, view, update, delete a child/pet and assign a child to a family
- Upload, view and delete a file per 'child'

---

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
cd server
export FLASK_RUN=app.py
flask db init
flask db migrate -m 'init'
flask db upgrade
python seed.py
```
6. Finally, run the flask server:
```console
flask run
```
7. Now for the frontend, navigate out of the server directory and into the client directory
8. Install dependencies:
```console
cd client
npm install
```
9. Run the frontend server:
```console
npm start
```
10. Your program should now be up and running!

---

## Routes

### Signup

- POST ```/signup```: creates a new user within the database and signs them in
- GET ```/check```: returns the current user that the session belongs to
- POST ```/login```: creates a new login request using existing users in the database and signs them in
- DELETE ```/logout```: removes the current user's session (signs them out)

### User Profile

- PATCH ```/myprofile/edit'```: edit the current user within the database

### Children

- GET ```/children```: returns a list of all children the user has from the database
- POST ```/children```: creates a new child within the database
- GET ```/children/<id>```: returns a child at the specified id
- PUT ```/children/<id>```: updates a child with new information at a specified id
- DELETE ```/children/<id>```: permanently removes a child from the database at a specified id

### Families

- GET ```/families```: returns a list of families the user belongs to from the database
- POST ```/families```: creates a new family within the database
- GET ```/families/<id>```: returns a family at the specified id
-DELETE ```/families/<id>```: permanently removes a family from the database at a specified id

### Joining or Leaving a Family group

- POST ```/join-family/<string:invite_code>```: allows user to join an existing family using the unique invite code
- DELETE ```/leavefamily/<int:id>```: allows user to leave a family group

### Files

- GET ```/children-files/<id>```: returns an file at the specified id
- POST ```/children-files/<id>```: creates a new file to add to the collection at the specified id
- DELETE ```/children-files/<id>```: permanently removes an file or collection of files from a specified id

### Events

- GET ```/events```: returns a list of events the user belongs to from the database
- POST ```/events```: creates a new event within the database
-DELETE ```/events/<id>```: permanently removes an event from the database at a specified id

---

## Usage

### Sign-in

1. Navigate to the 'Sign In' page
2. If you are creating a new account, select the register new account button
3. Enter your information to sign in, if successful you will recieve an alert confirming your sign in and be redirected to the home page
4. While signed in, you can fully access the features of this website, but you can always log out at any point by selecting the log out button in the header

### Managing Your Account

1. Access your profile by clicking 'My Profile' from the header.
2. Update your profile or change your password as needed.
3. In here, you can view a summary of the family groups that you belong to and the corresponding adult and children members.

### Creating and Viewing Families

1. While signed in, navigate to the 'Family' page to view all the family group the user belongs to. 
2. Clicking on 'See more details' will allow you to view the all the members, adult and children, of the family
3. To leave the family group, simply click the 'Leave the family' button.
4. To remove a family, simply click the 'Delete Family' button, WARNING: THIS ACTION CANNOT BE UNDONE.

### Creating and Viewing Events

1. While signed in, navigate to the 'Events' page to view all the events, the user has, it will be shown in a table form. 
2. The user can sort the events by date, sooner or later. 
2. To add a new event, enter all the information needed on the form then click the 'Submit new event' button.
4. To remove an event, on the last column on the events table, click the 'Delete event' button, WARNING: THIS ACTION CANNOT BE UNDONE.

### Creating and Viewing children

1. You must be signed in to perform this. To view all children of the user, click the 'Children' from the header.
2. To add a child, click the 'Add a new child' button on the "Children" page.
3. Enter in all of the information about the child and click submit to confirm it being added.
4. From here, you can click 'More Details' button on each child card to view more information.

### Altering Your children

1. Once you have clicked 'More Details' from each child card, you will be redirected to the child's page.
2. From here, you can view all of the information on the current child, at the end of the table, click on 
3. If you wish to delete a child, simply click the 'Remove Child' button. Removal WARNING: THIS ACTION CANNOT BE UNDONE
4. If you wish to edit a child, click the 'Edit Child Info' button to pull up it's information, and change it as you want. The child's profile image is saved as it was, and need to upload a new image if you wish to change the image.


### Files - create, view, delete

1. While signed in, navigate to the 'Children' page, and pick a child to add files to and click 'More details' button.
2. You now can navigate to middle of the page says 'Add a new file'.
3. To add a new file, click the 'Choose file' button. Then click 'Submit File' if ready. 
4. To view all the child's files, navigate to the end of the page and it says 'Child's Files' and are viewed in a table.
    a. On the third column on the file table, click on the 'View File' and it will navigate you to a new page, to the file viewer.
    b. User can now navigate, view all files and can click the right and left arrows to go through the files.
    c. User can also delete a file, whichever is shown by clicking the 'Delete file' button. WARNING: THIS ACTION CANNOT BE UNDONE.
5. To remove a file, on the last column on the files table, click the 'Delete file' button, WARNING: THIS ACTION CANNOT BE UNDONE.

---

### Room for Improvement

In the future, we can incorporate a dynamic functional calendar to manage all the event.

---




