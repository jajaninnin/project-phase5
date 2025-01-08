#!/usr/bin/env python3

# Standard library imports
from random import random, randint, choice as rc
import random
import uuid

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
            age=random.randint(1, 18),
            birthday=fake.date_of_birth(maximum_age=18),
            allergies=rc(allergies),
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

        children.append(child)
    
    db.session.add_all(children)
    db.session.commit()

    adultsFromDB = db.session.execute(db.select(Child)).scalars()
    list_adults = [n.to_dict(rules=('-familymembers',)) for n in adultsFromDB]

    Family.query.delete()
    families = []
    for n in range(3):
        family = Family(
            name=list_adults[n*2]['lastname'],
            invite_code=str(uuid.uuid4())
        )
        families.append(family)
    
    blended_family = Family(
        name=f'{list_adults[0]["lastname"]} blended family',
        invite_code=str(uuid.uuid4())
    )
    families.append(blended_family)

    db.session.add_all(families)
    db.session.commit()

    childrenFromDB = db.session.execute(db.select(Child)).scalars()
    list_children = [n.to_dict(rules=('-familymembers',)) for n in childrenFromDB]

    familiesFromDB = db.session.execute(db.select(Family)).scalars()
    list_families = [n.to_dict() for n in familiesFromDB]

    FamilyMember.query.delete()
    family_members = []
    for n in range(3):
        
        adult1 = FamilyMember(
            family_id=list_families[n]['id'],
            member_id=list_adults[n*2]['id'],
            member_type='adult'
        )
        adult2 = FamilyMember(
            family_id=list_families[n]['id'],
            member_id=list_adults[n*2+1]['id'],
            member_type='adult'
        )
        kid1 = FamilyMember(
            family_id=list_families[n]['id'],
            member_id=list_adults[n*4]['id'],
            member_type='child'
        )
        kid2 = FamilyMember(
            family_id=list_families[n]['id'],
            member_id=list_adults[n*4+1]['id'],
            member_type='child'
        )
        kid3 = FamilyMember(
            family_id=list_families[n]['id'],
            member_id=list_adults[n*4+2]['id'],
            member_type='child'
        )
        kid4 = FamilyMember(
            family_id=list_families[n]['id'],
            member_id=list_adults[n*4+3]['id'],
            member_type='child'
        )
        family_members.extend([adult1, adult2, kid1, kid2, kid3, kid4])
    
    blended_adult1 = FamilyMember(
        family_id=list_families[3]['id'],
        member_id=list_adults[0]['id'],
        member_type='adult'
    )
    blended_adult2 = FamilyMember(
        family_id=list_families[3]['id'],
        member_id=list_adults[2]['id'],
        member_type='adult'
    )
    blended_kid1 = FamilyMember(
        family_id=list_families[3]['id'],
        member_id=list_children[8]['id'],
        member_type='child'
    )
    blended_kid2 = FamilyMember(
        family_id=list_families[3]['id'],
        member_id=list_children[9]['id'],
        member_type='child'
    )
    blended_kid3 = FamilyMember(
        family_id=list_families[3]['id'],
        member_id=list_children[10]['id'],
        member_type='child'
    )
    blended_kid4 = FamilyMember(
        family_id=list_families[3]['id'],
        member_id=list_children[11]['id'],
        member_type='child'
    )

    family_members.extend([blended_adult1, blended_adult2, blended_kid1, blended_kid2, blended_kid3, blended_kid4])

    db.session.add_all(family_members)
    db.session.commit()

    # Make like two unique sets of events and just loop them between the families, and maybe give the blended family a unique set?


if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        print("Starting seed...")
        # Seed code goes here!
