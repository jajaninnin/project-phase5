import React from "react";
import { Link } from "react-router-dom";

function Home() {
    return (
        <div className="home">
            <section className="section-title">
                <h1 className="title">Welcome to Parently</h1>
                <h2 className="title-h2">your new co-parenting tool for easier parenting</h2>
            </section>
            <section>
                <h2 className="section-header">Parenting made easy</h2>
                <p>some text here</p>
                <Link to='/signin'><button className="submit-button">Sign In</button></Link>
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
                <Link to='/files'><button className="submit-button">See all my Children's Files</button></Link>
            </section>
            
        </div>
    )
}

export default Home;