import React from "react";
import { Link } from "react-router-dom";
import { useUser } from "./Adult";

function Home() {
    const { signedIn } = useUser();

    return (
        <div className="home">
            <section className="section-title">
                <h1>FamilyHub</h1>
                <h2 className="title-h2">your new co-parenting tool</h2>
            </section>
            <div className="container-4">
                <div className="content">
                    <h2 className="section-header">Parenting made easy</h2>
                    <p>A parenting app designed to make family management easier and more organized.
                        With features like creating and joining families, adding children, and uploading files for each child, it ensures you stay on top of every detail.
                        You can also create and view family events, keeping everyone in the loop.
                        Whether you're organizing a playdate, tracking milestones, or simply sharing important documents, our app helps you manage it all in one place.</p>
                    <p>{signedIn ?
                    <Link to='/logout'><button className="submit-button">Log Out</button></Link>
                    :
                    <Link to='/signin'><button className="submit-button">Sign In</button></Link>
                    }</p>
                </div>
            </div>
            <div className="container-2">
                <div className="content">
                    <h2 className="section-header">Keep track of your families</h2>
                    <p>some text here</p>
                    <Link to='/families'><button className="submit-button">See all my Families</button></Link>
                </div>
            </div>
            <div className="container-3">
                <div className="content">
                    <h2 className="section-header">Keep track of all your family's events</h2>
                    <p>some text here</p>
                    <Link to='/events'><button className="submit-button">See all my Events</button></Link>
                </div>
            </div>
            <div className="container-4">
                <div className="content">
                    <h2 className="section-header">Keep track of all your children/pets</h2>
                    <p>some text here</p>
                    <Link to='/children'><button className="submit-button">See all my Children</button></Link>
                </div>
            </div>
            <div className="container-2">
                <div className="content">
                    <h2 className="section-header">Keep track of all your children's files</h2>
                    <p>some text here</p>
                    <Link to='/children'><button className="submit-button">See all my Children's Files</button></Link>
                </div>
            </div>
            
        </div>
    )
}

export default Home;