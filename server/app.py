#!/usr/bin/env python3
from flask_migrate import Migrate
from flask import Flask, request, make_response, jsonify, session
from flask_restful import Resource, Api
from sqlalchemy.exc import NoResultFound
from werkzeug.security import generate_password_hash, check_password_hash
from werkzeug.utils import secure_filename
from dateutil import parser
import uuid

# Local imports
import os
from config import app, db, api
# Add your model imports
from models import Adult, Child, FamilyMember, Family, File, Event

# Views go here!
@app.route('/')
def index():
    return '<h1>Project Server</h1>'

class CheckSession(Resource):
    def get(self):
        user_id = session.get('user_id')
        if user_id:
            user = db.session.get(Adult, user_id)
            if user:
                return make_response(user.to_dict(), 200)
        return make_response({'error': 'No authorization'}, 401)

api.add_resource(CheckSession, '/check')

class Signup(Resource):
    def post(self):
        params = request.json
        try:
            username = params.get('username')
            password = params.get('password')
            age = params.get('age')
            firstname = params.get('firstname')
            lastname = params.get('lastname')
            role = params.get('role')

            if not username or not password or not age or not firstname or not lastname or not role:
                return make_response({'error': 'Missing required fields'}, 400)
            
            existing_user = Adult.query.filter_by(username=username).first()
            if existing_user:
                return make_response({'error': 'Username already exists'}, 400)

            
            user = Adult(username=username, password_hash=password, age=age, firstname=firstname, lastname=lastname, role=role)

            db.session.add(user)
            db.session.commit()
            session['user_id'] = user.id
            return make_response(user.to_dict(), 201)

        except Exception as e:
            print(f'error occured: {e}')
            return make_response({'error': 'failed to sign up'})
        
api.add_resource(Signup, '/signup')

class UpdateCurrentUser(Resource):
    def patch(self):
        try:
            user_id = session.get('user_id')
            if user_id:
                user = db.session.get(Adult, user_id)
                param = request.json
                for attr in param:
                    setattr(user, attr, param[attr])
                db.session.commit()
                return make_response(user.to_dict(), 202)
            return make_response({'error': 'No authorization'}, 401)
        except Exception as e:
            print(f'error occured: {e}')
            return make_response({'error': ['validation errors']}, 400)

api.add_resource(UpdateCurrentUser, '/my-profile/edit')

class Login(Resource):
    def post(self):
        params = request.json
        user = params.get('username')
        password = params.get('password')

        if not user or not password:
            return make_response({'error': 'Username and password are required'}, 400)
        
        user = db.session.query(Adult).filter_by(username=user).first()

        if not user:
            return make_response({'error': 'user not found'}, 404)

        if user.authenticate(password):
            session['user_id'] = user.id
            return make_response(user.to_dict(), 200)
        else:
            print('invalid password')
            return make_response({'error': 'invalid password'}, 401)

api.add_resource(Login, '/login')

class Logout(Resource):
    def delete(self):
        session.pop('user_id', None)
        return make_response({}, 204)
    
api.add_resource(Logout, '/logout')

class Children(Resource):
    def get(self):
        try:
            user_id = session.get('user_id')
            if user_id:
                family_memberships = db.session.execute(db.select(FamilyMember).filter_by(member_id=user_id, member_type="adult")).scalars()
                list_children = []
                for fam_mem in family_memberships:
                    children = db.session.execute(db.select(Child).select_from(FamilyMember).join(Child, db.and_(Child.id == FamilyMember.member_id, FamilyMember.member_type == "child")).filter(FamilyMember.family_id==fam_mem.family_id)).scalars()
                    list_children += [n.to_dict() for n in children]
                return make_response(list_children)
            return make_response({'error': 'No authorization'}, 401)
        except Exception as e:
            print(f'error occured: {e}')
            return make_response({'error': ['validation errors']}, 400)
    
    def post(self):
        try:
            user_id = session.get('user_id')
            if user_id:
                param = request.json
                new_child = Child(
                    firstname=param['firstname'],
                    lastname=param['lastname'],
                    nickname=param['nickname'],
                    age=param['age'],
                    birthday=parser.parse(param['birthday']),
                    allergies=param['allergies'],
                    meds=param['meds'],
                    topsize=param['topsize'],
                    pantssize=param['pantssize'],
                    dresssize=param['dresssize'],
                    shoesize=param['shoesize'],
                    schoollevel=param['schoollevel'],
                    schoolname=param['schoolname'],
                    favorites=param['favorites'],
                    hates=param['hates'],
                )
                db.session.add(new_child)
                db.session.commit()
                new_family_member_child = FamilyMember(
                    family_id=param['family_id'],
                    member_id=new_child.id,
                    member_type='child'
                )
                db.session.add(new_family_member_child)
                db.session.commit()
                return make_response(new_child.to_dict(), 201)
            return make_response({'error': 'No authorization'}, 401)
        except Exception as e:
            print(f'error occured: {e}')
            return make_response({'error': ['validation errors']}, 400)

class ChildrenById(Resource):
    def get(self, id):
        try:
            child = db.session.execute(db.select(Child).filter_by(id=id)).scalar_one()
            return make_response(child.to_dict())
        except Exception as e:
            print(f'error occured: {e}')
            return make_response({'error': 'Child not found'}, 404)
        
    def put(self, id):
        try:
            child = db.session.execute(db.select(Child).filter_by(id=id)).scalar_one()
            param = request.json
            child_family_membership = db.session.execute(db.select(FamilyMember).filter_by(member_id=id, family_id=param['old_family_id'], member_type='child')).scalar_one()
            setattr(child_family_membership, 'family_id', param['family_id'])
            for attr in param:
                if attr == 'family_id' or attr == 'old_family_id':
                    pass
                elif attr == 'birthday':
                    setattr(child, attr, parser.parse(param[attr]))
                else:    
                    setattr(child, attr, param[attr])
            db.session.commit()
            return make_response(child.to_dict(), 202)
        except NoResultFound:
            return make_response({'error': 'Child not found'}, 404)
        except Exception as e:
            print(f'error occured: {e}')
            return make_response({'error': [e]}, 400)
    
    def delete(self, id):
        try:
            child = db.session.execute(db.select(Child).filter_by(id=id)).scalar_one()
            db.session.delete(child)
            db.session.commit()
            return make_response(jsonify(''), 204)
        except Exception as e:
            print(f'error occured: {e}')
            return make_response({'error': 'Child not found'}, 404)
        
class ChildrenAddImage(Resource):
    def post(self, id):
        try:
            child = db.session.execute(db.select(Child).filter_by(id=id)).scalar_one()
            accepted_file_extensions = ['jpeg', '.jpg', '.png', '.gif']
            file = request.files['file']
            filename = secure_filename(file.filename)
            isAcceptedFileExtension = False
            fileExt = filename[-4:]
            for ext in accepted_file_extensions:
                if ext == fileExt:
                    isAcceptedFileExtension = True

            if isAcceptedFileExtension:
                file.save(os.path.join(app.config['UPLOAD'], filename)) 
                setattr(child, "image", f"/{os.path.join(app.config['UPLOAD'], filename)}")
                db.session.commit()
                return make_response({'filepath': f"/{os.path.join(app.config['UPLOAD'], filename)}", 'id': child.id}, 200)
            else:
                print(f'error occured: {e}')
                return make_response({'error': 'Image wrong file extension'}, 404)
        except Exception as e:
            print(f'error occured: {e}')
            return make_response({'error': 'Image upload failed'}, 404)
    
api.add_resource(Children, '/children')
api.add_resource(ChildrenById, '/children/<int:id>')
api.add_resource(ChildrenAddImage, '/children/<int:id>/image')

class Families(Resource):
    def get(self):
        try:
            user_id = session.get('user_id')
            if user_id:
                family_memberships = db.session.execute(db.select(FamilyMember).filter_by(member_id=user_id, member_type="adult")).scalars()
                list_families = []
                for fam_mem in family_memberships:
                    families = db.session.execute(db.select(Family).filter_by(id=fam_mem.family_id)).scalars()
                    list_families += [n.to_dict() for n in families]
                return make_response(list_families)
            return make_response({'error': 'No authorization'}, 401)
        except Exception as e:
            print(f'error occured: {e}')
            return make_response({'error': ['validation errors']}, 400)
    
    def post(self):
        try:
            user_id = session.get('user_id')
            if user_id:
                param = request.json
                new_family = Family(
                    name=param['name'],
                    invite_code=str(uuid.uuid4())
                )
                db.session.add(new_family)
                db.session.commit()
                new_family_member = FamilyMember(
                    family_id=new_family.id,
                    member_id=user_id,
                    member_type='adult'
                )
                db.session.add(new_family_member)
                db.session.commit()
                return make_response(new_family.to_dict(), 201)
            return make_response({'error': 'No authorization'}, 401)
        except Exception as e:
            print(f'error occured: {e}')
            return make_response({'error': ['validation errors']}, 400)

class FamiliesById(Resource):
    def get(self, id):
        try:
            family = db.session.execute(db.select(Family).filter_by(id=id)).scalar_one()
            return make_response(family.to_dict())
        except Exception as e:
            print(f'error occured: {e}')
            return make_response({'error': 'Family not found'}, 404)
    
    def delete(self, id):
        try:
            user_id = session.get('user_id')
            if user_id:
                family = db.session.execute(db.select(Family).filter_by(id=id)).scalar_one()
                family_memberships_child = db.session.execute(db.select(FamilyMember).filter_by(member_type="child", family_id=family.id)).scalars()
                family_memberships_adult = db.session.execute(db.select(FamilyMember).filter_by(member_type="adult", family_id=family.id)).scalars()
                children = db.session.execute(db.select(Child).select_from(FamilyMember).join(Child, db.and_(Child.id == FamilyMember.member_id, FamilyMember.member_type == "child")).filter(FamilyMember.family_id==family.id)).scalars()
                db.session.delete(family)
                for family_membership in family_memberships_child:
                    db.session.delete(family_membership)
                for family_membership in family_memberships_adult:
                    db.session.delete(family_membership)
                for child in children:
                    db.session.delete(child)
                db.session.commit()
                return make_response(jsonify(''), 200)
            return make_response({'error': 'No authorization'}, 401)
        except Exception as e:
            print(f'error occured: {e}')
            return make_response({'error': 'Family not found'}, 404)

api.add_resource(Families, '/families')
api.add_resource(FamiliesById, '/families/<int:id>')

class FilesByChildId(Resource):
    def get(self, id):
        try:
            files = db.session.execute(db.select(File).filter_by(child_id=id)).scalars()
            files_per_child = [file.to_dict() for file in files]
            return make_response(files_per_child)
        except Exception as e:
            print(f'error occured: {e}')
            return make_response({'error': 'files not found'}, 404)
    
    def post(self, id):
        try:
            accepted_file_extensions = ['jpeg', '.jpg', '.png', '.gif', '.doc', 'docx', '.ppt', 'pptx', '.xls', 'xlsx', '.txt', '.pdf']
            file = request.files['file']
            filename = secure_filename(file.filename)
            isAcceptedFileExtension = False
            fileExt = filename[-4:]
            for ext in accepted_file_extensions:
                if ext == fileExt:
                    isAcceptedFileExtension = True

            if isAcceptedFileExtension:
                file.save(os.path.join(app.config['UPLOAD'], filename)) 
                newFile = File(
                    filename=f"/{os.path.join(app.config['UPLOAD'], filename)}",
                    child_id=id
                )
                db.session.add(newFile)
                db.session.commit()
                return make_response(newFile.to_dict(), 200)
            else:
                print(f'error occured: {e}')
                return make_response({'error': 'file wrong file extension'}, 404)
        except Exception as e:
            print(f'error occured: {e}')
            return make_response({'error': 'file upload failed'}, 404)
    
    def delete(self, id):
        try:
            db.session.query(File).filter_by(id = id).delete()
            db.session.commit()
            return make_response(jsonify(''), 204)
        except Exception as e:
            print(f'error occured: {e}')
            return make_response({'error': 'files not found'}, 404)
        
api.add_resource(FilesByChildId, '/child-files/<int:id>')

class Events(Resource):
    def get(self):
        try:
            user_id = session.get('user_id')
            family_memberships = db.session.execute(db.select(FamilyMember).filter_by(member_id=user_id, member_type="adult")).scalars()
            list_events = []
            if user_id:
                for fam_mem in family_memberships:
                    events = db.session.execute(db.select(Event).filter_by(family_id=fam_mem.family_id)).scalars()
                    list_events += [n.to_dict() for n in events]
                return make_response(list_events)
            return make_response({'error': 'No authorization'}, 401)
        except Exception as e:
                    print(f'error occured: {e}')
                    return make_response({'error': ['validation errors']}, 400)
    
    def post(self):
        try:
            user_id = session.get('user_id')
            if user_id:
                param = request.json
                new_event = Event(
                    name=param['name'],
                    date=parser.parse(param['date']),
                    time=param['time'],
                    owner=param['owner'],
                    family_id=param['family_id']
                )
                db.session.add(new_event)
                db.session.commit()
                return make_response(new_event.to_dict(), 201)
        except Exception as e:
            print(f'error occured: {e}')
            return make_response({'error': ['validation errors']}, 400)

api.add_resource(Events, '/events')

class EventsById(Resource):      
    def delete(self, id):
        try:
            event = db.session.execute(db.select(Event).filter_by(id=id)).scalar_one()
            db.session.delete(event)
            db.session.commit()
            return make_response(jsonify(''), 200)
        except Exception as e:
            print(f'error occured: {e}')
            return make_response({'error': 'Event not found'}, 404)

api.add_resource(EventsById, '/events/<int:id>')

class JoinFamily(Resource):
    def post(self, invite_code):
        try:
            user_id = session.get('user_id')
            if user_id:
                family = db.session.execute(db.select(Family).filter_by(invite_code=invite_code)).scalar_one()
                is_already_in_family = db.session.execute(db.select(FamilyMember).filter_by(family_id=family.id, member_id=user_id, member_type='adult')).scalar()
                if (is_already_in_family):
                    return make_response({'message': 'Already in family'}, 200)
                
                new_family_member = FamilyMember(
                    family_id=family.id,
                    member_id=user_id,
                    member_type='adult'
                )
                db.session.add(new_family_member)
                db.session.commit()
                return make_response(family.to_dict(), 200)
            return make_response({'error': 'No authorization'}, 401)
        except Exception as e:
            print(f'error occured: {e}')
            return make_response({'error': ['validation errors']}, 400)
        

api.add_resource(JoinFamily, '/join-family/<string:invite_code>')

class LeaveFamily(Resource):
    def delete(self, id):
        try:
            user_id = session.get('user_id')
            if user_id:
                family = db.session.execute(db.select(Family).filter_by(id=id)).scalar_one()
                family_member = db.session.execute(db.select(FamilyMember).filter_by(family_id=family.id, member_id=user_id, member_type='adult')).scalar()
                db.session.delete(family_member)
                db.session.commit()
                return make_response(jsonify(''), 204)
            return make_response({'error': 'No authorization'}, 401)
        except Exception as e:
            print(f'error occured: {e}')
            return make_response({'error': 'Family not found'}, 404)
        
api.add_resource(LeaveFamily, '/leavefamily/<int:id>')

if __name__ == '__main__':
    app.run(port=5555, debug=True)

