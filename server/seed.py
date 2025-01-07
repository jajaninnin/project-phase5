#!/usr/bin/env python3

# Standard library imports
from random import random, randint, choice as rc
import random

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db, Adult, Child, Family, FamilyMember

with app.app_context():
    fake = Faker()

    Adult.query.delete()

    adults = []

    roles = ['parent', 'step-parent', 'aunt/uncle', 'granparent', 'friend', 'aupair']
    
    for n in range(6):
        adult = Adult(
            username=fake.user_name(),
            password_hash='password',
            firstname=fake.first_name(),
            lastname=fake.last_name(),
            age=random.randint(18, 99),
            role=rc(roles)
        )
        adults.append(adult)
    
    db.session.add_all(adults)
    db.session.commit()

    Child.query.delete()

    allergies = ['NA', 'peanuts', 'shellfish', 'egg', 'gluten', 'dairy']
    medis = ['NA', 'epiphen', 'multivitamins', 'steroid cream', 'prune juice']
    size = ['small', 'medium', 'large']
    schoolnames = ['PS 1', 'PS2', 'Charter School', 'Daycare', 'None']
    favorites = ['fruits', 'toys', 'playing', 'playground', 'none']
    hates = ['darkness', 'car rides', 'sleeping alone', 'none']
    schoollevels = ['daycare', 'kinder', 'nursery', 'grade 1', 'grade 2', 'grade 3',
                    'grade 4', 'grade 5', 'grade 6', 'grade 7', 'grade 8', 'grade 9', 'grade 10', 'grade 11', 'grade 12']
    
    children = []

    for n in range(12):
        child = Child(
            image=fake.word(),
            firstname=fake.first_name(),
            lastname=fake.last_name(),
            nickname=fake.first_name(),
            age=random.randint(18, 99),
            birthday=fake.date_of_birth(maximum_age=18),
            meds=rc(medis),
            topsize=rc(size),
            pantssize=rc(size),
            dresssize=rc(size),
            shoesize=rc(size),
            schoollevel=rc(schoollevels),
            schoolname=rc(schoolnames),
            favorites=rc(favorites),
            hates=rc(hates)
        )

if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        print("Starting seed...")
        # Seed code goes here!
