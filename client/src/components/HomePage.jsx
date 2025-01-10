import React from "react";
import { Link } from "react-router-dom";
import { useUser } from "./Adult";

function Home() {
    const { signedIn } = useUser();

    return (
        <div className="home">
            <section className="section-title">
                <h1 className="title">Parently</h1>
                <h2 className="title-h2">your new co-parenting tool</h2>
            </section>
            <section>
                <h2 className="section-header">Parenting made easy</h2>
                <p>some text here</p>
                <p>{signedIn ?
                <Link to='/logout'><button className="submit-button">Log Out</button></Link>
                :
                <Link to='/signin'><button className="submit-button">Sign In</button></Link>
                }</p>
            </section>
            <section>
                <h2 className="section-header">Keep track of your families</h2>
                <p>some text here</p>
                <Link to='/families'><button className="submit-button">See all my Families</button></Link>
            </section>
            <section>
                <h2 className="section-header">Keep track of all your family's events</h2>
                <p>some text here</p>
                <Link to='/events'><button className="submit-button">See all my Events</button></Link>
            </section>
            <section>
                <h2 className="section-header">Keep track of all your children/pets</h2>
                <p>some text here</p>
                <Link to='/children'><button className="submit-button">See all my Children</button></Link>
            </section>
            <section>
                <h2 className="section-header">Keep track of all your children's files</h2>
                <p>some text here</p>
                <Link to='/children'><button className="submit-button">See all my Children's Files</button></Link>
            </section>
            
        </div>
    )
}

export default Home;