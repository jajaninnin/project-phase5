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
                <div className="content-left">
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
                <div className="homepage-image-container-right">
                    <img className="homepage-image-right" src="/files/familycartoon.png" alt="a house" />
                </div>
            </div>
            <div className="container-2">
                <div className="content-left">
                    <h2 className="section-header">Keep track of your families</h2>
                    <p>Easily manage and keep track of the various family groups you're part of.
                        You can view and organize both adult and child members in each family, ensuring you stay connected and updated on everyone’s details and roles.
                        Managing multiple family dynamics and staying on top of events, updates, and responsibilities is seamless and user-friendly.</p>
                    <Link to='/families'><button className="submit-button">See all my Families</button></Link>
                </div>
                <div className="homepage-image-container-right">
                    <img className="homepage-image-right" src="/files/familypage.png" alt="families" />
                </div>
            </div>
            <div className="container-3">
                <div className="content-left">
                    <h2 className="section-header">Keep track of all your family's events</h2>
                    <p>Manage events for each family group you belong to, with the ability to add, view, and delete events as needed.
                        Each event includes details such as the date, time, and the owner—the user who created the event.
                        Whether it's a birthday party, family outing, or school meeting, you can stay organized and keep everyone in the loop, ensuring no important moments are missed.</p>
                    <Link to='/events'><button className="submit-button">See all my Events</button></Link>
                </div>
                <div className="homepage-image-container-right">
                    <img className="homepage-image-right" src="/files/event.png" alt="events" />
                </div>
            </div>
            <div className="container-4">
                <div className="content-left">
                    <h2 className="section-header">Keep track of all your children</h2>
                    <p>Track all your children—whether they’re your kids or even pets—that you manage, making it easy to create, update, or delete profiles for each one.
                        You can assign each child to a specific family group, and as a user, you can choose which group you belong to.
                        This feature helps you stay organized across different family dynamics, ensuring you have all the essential details at your fingertips, from your child’s milestones to your pet’s care needs.</p>
                    <Link to='/children'><button className="submit-button">See all my Children</button></Link>
                </div>
                <div className="homepage-image-container-right">
                    <img className="homepage-image-right" src="/files/childrenpage.png" alt="children" />
                </div>
            </div>
            <div className="container-2">
                <div className="content-left">
                    <h2 className="section-header">Keep track of all your children's files</h2>
                    <p>User has the ability to upload and organize important files in one convenient place.
                        Whether it's a class photo, vaccination records, or school documents, you can easily upload images or PDFs for each child.
                        Users can view and delete these files as needed, ensuring that all important documents are stored securely and easily accessible, all in one organized page for each child.</p>
                    <Link to='/children'><button className="submit-button">See all my Children's Files</button></Link>
                </div>
                <div className="homepage-image-container-right">
                    <img className="homepage-image-right" src="/files/files.png" alt="files" />
                </div>
            </div>
            
        </div>
    )
}

export default Home;