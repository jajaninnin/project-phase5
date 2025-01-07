import React from "react";
import { useOutletContext, Link } from "react-router-dom";
import ChildCard from './ChildCard'
import { useUser } from './Adult'

function Children() {
    const {child} = useOutletContext();
    const {user} = useUser();
    const { isSignedIn } = useUser();
    
    return (
        <div>
            <h2>My Child</h2>
            <ul className="cards">{ isSignedIn ? 
                <ChildCard
                key={child.id}
                id={child.id}
                firstname={child.firstname}
                lastname={child.lastname}
                nickname={child.nickname}
                age={child.age}
                birthday={child.birthday}
                allergies={child.allergies}
                meds={child.meds}
                topsize={child.topsize}
                pantssize={child.pantssize}
                dresssize={child.dresssize}
                shoesize={child.shoesize}
                schoollevel={child.schoollevel}
                schoolname={child.schoolname}
                favorites={child.favorites}
                hates={child.hates}
                /> : (
                    <section>
                        <p>Please sign in to see all your children</p>
                        <Link to='/signin'><button className="submit-button">Sign In</button></Link>
                    </section>
                )}
            </ul>
        </div>
    )
}

export default Children