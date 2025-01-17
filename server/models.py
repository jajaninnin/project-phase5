from flask_sqlalchemy import SQLAlchemy
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.orm import validates
from sqlalchemy.ext.associationproxy import association_proxy
from werkzeug.security import generate_password_hash, check_password_hash
from sqlalchemy.dialects.postgresql import ENUM
from sqlalchemy.sql import func

from config import db

# Models go here!
class Adult(db.Model, SerializerMixin):
    __tablename__ = 'adults'
    id = db.Column(db.Integer, primary_key=True)
    firstname = db.Column(db.String, nullable=False)
    lastname = db.Column(db.String, nullable=False)
    age = db.Column(db.Integer, nullable=False)
    role = db.Column(db.String, nullable=False)
    username = db.Column(db.String, nullable=False, unique=True)
    _password_hash = db.Column(db.String, nullable=False)

    serialize_rules = ('-familymembers', '-families', '-children')

    @validates('firstname')
    def validate_firstname(self, key, value):
        if not value or (len(value) < 1):
            raise ValueError('Adult must a first name')
        return value
    
    @validates('lastname')
    def validate_lastname(self, key, value):
        if not value or (len(value) < 1):
            raise ValueError('Adult must have a last name')
        return value
    
    @validates('role')
    def validate_role(self, key, value):
        if not value or (len(value) < 1):
            raise ValueError('Adult must have role')
        return value
    
    @validates('age')
    def validate_age(self, key, value):
        if not value or (int(value) < 18):
            raise ValueError('Adult must have an age and must be >18 y.o.')
        return value
    
    @property
    def password_hash(self):
        return self._password_hash
    
    @password_hash.setter
    def password_hash(self, password):
        self._password_hash = generate_password_hash(password)
    
    def authenticate(self, password):
        password = password.strip()
        return check_password_hash(self.password_hash, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'password': self.password_hash,
            'firstname': self.firstname,
            'lastname': self.lastname,
            'age': self.age,
            'role': self.role
        }

class Child(db.Model, SerializerMixin):
    __tablename__ = 'children'
    id = db.Column(db.Integer, primary_key=True)
    image = db.Column(db.String)
    firstname = db.Column(db.String, nullable=False)
    lastname = db.Column(db.String, nullable=False)
    nickname = db.Column(db.String, nullable=False)
    age = db.Column(db.Integer, nullable=False)
    birthday = db.Column(db.Date, nullable=False)
    allergies = db.Column(db.String, nullable=False)
    meds = db.Column(db.String, nullable=False)
    topsize = db.Column(db.String, nullable=False)
    pantssize = db.Column(db.String, nullable=False)
    dresssize = db.Column(db.String, nullable=False)
    shoesize = db.Column(db.String, nullable=False)
    schoollevel = db.Column(db.String, nullable=False)
    schoolname = db.Column(db.String, nullable=False)
    favorites = db.Column(db.String, nullable=False)
    hates = db.Column(db.String, nullable=False)

    serialize_rules = ('-families', '-adults', '-familymembers', '-events')

    @validates('firstname')
    def validate_firstname(self, key, value):
        if not value or (len(value) < 1):
            raise ValueError('Child must have a first name')
        return value
    
    @validates('lastname')
    def validate_lastname(self, key, value):
        if not value or (len(value) < 1):
            raise ValueError('Child must have a lastname')
        return value
    
    @validates('nickname')
    def validate_nickname(self, key, value):
        if not value or (len(value) < 1):
            raise ValueError('Child must have a nickname')
        return value
    
    @validates('age')
    def validate_age(self, key, value):
        if not value:
            raise ValueError('Child must have an age')
        return value
    
    @validates('birthday')
    def validate_birthday(self, key, value):
        if not value:
            raise ValueError('Child must have a birthday')
        return value
    
    @validates('allergies')
    def validate_allergies(self, key, value):
        if not value or (len(value) < 1):
            raise ValueError('If no allergy, put NA, must have an input')
        return value
    
    @validates('topsize')
    def validate_topsize(self, key, value):
        if not value or (len(value) < 1):
            raise ValueError('Child must have a tops size')
        return value
    
    @validates('pantssize')
    def validate_pantssize(self, key, value):
        if not value or (len(value) < 1):
            raise ValueError('Child must have a pants size')
        return value
    
    @validates('dresssize')
    def validate_dresssize(self, key, value):
        if not value or (len(value) < 1):
            raise ValueError('Child must have a dresssize')
        return value
    
    @validates('shoesize')
    def validate_shoesize(self, key, value):
        if not value or (len(value) < 1):
            raise ValueError('Child must have a shoe size')
        return value
    
    @validates('schoollevel')
    def validate_schoollevel(self, key, value):
        if not value or (len(value) < 1):
            raise ValueError('Child must have a school level')
        return value
    
    @validates('schoolname')
    def validate_schoolname(self, key, value):
        if not value or (len(value) < 1):
            raise ValueError('Child must have a school name')
        return value
    
    @validates('favorites')
    def validate_favorites(self, key, value):
        if not value or (len(value) < 1):
            raise ValueError('Child must have a favorite')
        return value
    
    @validates('hates')
    def validate_hates(self, key, value):
        if not value or (len(value) < 1):
            raise ValueError('Child must have a hates')
        return value

class FamilyMember(db.Model, SerializerMixin):
    __tablename__ = 'familymembers'
    id = db.Column(db.Integer, primary_key=True)
    family_id = db.Column(db.Integer, db.ForeignKey('families.id'), nullable=False)
    member_id = db.Column(db.Integer, nullable=False)
    member_type = db.Column(ENUM('adult', 'child', name='member_types'), nullable=False)

    serialize_rules = ('-families', )

    def to_dict(self):
        return {
            'id': self.id,
            'family_id': self.family_id,
            'member_id': self.member_id,
            'member_type': self.member_type,
        }

class Family(db.Model, SerializerMixin):
    __tablename__ = 'families'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    invite_code = db.Column(db.String, nullable=False, unique=True)

    adults_member = db.relationship(
        'Adult',
        secondary='familymembers',
        primaryjoin='foreign(FamilyMember.family_id)==Family.id',
        secondaryjoin="and_(FamilyMember.member_type=='adult', foreign(FamilyMember.member_id)==Adult.id)",
        backref=db.backref('familymembers_member', lazy='dynamic'),
        lazy='dynamic',
        viewonly=True,
    )

    children_member = db.relationship(
        'Child',
        secondary='familymembers',
        primaryjoin='foreign(FamilyMember.family_id)==Family.id',
        secondaryjoin="and_(FamilyMember.member_type=='child', foreign(FamilyMember.member_id)==Child.id)",
        lazy='dynamic',
        viewonly=True,
    )

    serialize_rules = ('-events', '-adults', '-children', '-familymembers', '-files')

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "adults_member": [adult.to_dict() for adult in self.adults_member],
            "children_member": [child.to_dict() for child in self.children_member],
            "invite_code": self.invite_code
        }

    @validates('invite_code')
    def validate_invite_code(self, key, value):
        if not value or (len(value) < 1):
            raise ValueError('Family must have an invite code')
        return value
    
    @validates('name')
    def validate_name(self, key, value):
        if not value or (len(value) < 1):
            raise ValueError('Family must have a name')
        return value

class File(db.Model, SerializerMixin):
    __tablename__ = 'files'
    id = db.Column(db.Integer, primary_key=True)
    filename = db.Column(db.String, nullable=False)
    filedate = db.Column(db.DateTime, nullable=False, default=db.func.now())
    child_id = db.Column(db.Integer, db.ForeignKey('children.id'))

    @validates('filename')
    def validate_filename(self, key, value):
        if not value or (len(value) < 1):
            raise ValueError('File must have a file name')
        return value
    
    @validates('filedate')
    def validate_filedate(self, key, value):
        if not value:
            raise ValueError('File')
        return value
    
class Event(db.Model, SerializerMixin):
    __tablename__ = 'events'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    date = db.Column(db.Date, nullable=False)
    start_time = db.Column(db.String, nullable=False)
    end_time = db.Column(db.String, nullable=False)
    owner = db.Column(db.Integer, db.ForeignKey('adults.id'))
    family_id = db.Column(db.Integer, db.ForeignKey('families.id'), nullable=False)
  
    @validates('name')
    def validate_name(self, key, value):
        if not value or (len(value) < 1):
            raise ValueError('Event must have a name')
        return value
    
    @validates('date')
    def validate_date(self, key, value):
        if not value:
            raise ValueError('Event must have a date')
        return value
    
    @validates('start_time')
    def validate_start_time(self, key, value):
        if not value:
            raise ValueError('Event must have a start time')
        return value
    
    @validates('end_time')
    def validate_end_time(self, key, value):
        if not value:
            raise ValueError('Event must have an end_time')
        return value
  