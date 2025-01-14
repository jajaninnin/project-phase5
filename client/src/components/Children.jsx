import React from "react";
import { useOutletContext, Link } from "react-router-dom";
import ChildCard from './ChildCard'
import { useUser } from './Adult'

function Children() {
    const { child } = useOutletContext();
    const { signedIn } = useUser();
   
    return (
        <div>
            <h2>My Child</h2>
                { signedIn ? (
                    <div>
                        <Link to='/new-child'><button className="submit-button">Add a new child</button></Link>
                        <ul className="cards"> 
                            {child.map((chld, index) => (
                                <ChildCard
                                    key={`${chld.id}_${index}`}
                                    id={chld.id}
                                    firstname={chld.firstname}
                                    lastname={chld.lastname}
                                    nickname={chld.nickname}
                                    age={chld.age}
                                    birthday={chld.birthday}
                                    allergies={chld.allergies}
                                    meds={chld.meds}
                                    topsize={chld.topsize}
                                    pantssize={chld.pantssize}
                                    dresssize={chld.dresssize}
                                    shoesize={chld.shoesize}
                                    schoollevel={chld.schoollevel}
                                    schoolname={chld.schoolname}
                                    favorites={chld.favorites}
                                    hates={chld.hates}
                                    image={chld.image}
                                />
                            ))}
                        </ul>
                    </div>
                ) : (
                    <section>
                        <p>Please sign in to see all your children</p>
                        <Link to='/signin'><button className="submit-button">Sign In</button></Link>
                    </section>
            )}
        </div>
    )
}

export default Children;