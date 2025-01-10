import React, { useState, useEffect } from "react";
import { useOutletContext, Link, useNavigate, useParams } from "react-router-dom";
import { useUser } from "./Adult";

function NewChild({isEdit = false}) {
    const { child, setChild } = useOutletContext();
    const { user, signedIn, setSignedIn } = useUser();
    const { id } = useParams();
    const navigate = useNavigate();

    const childToEdit = isEdit ? child.find(child => child?.id?.toString() === id?.toString()) : null;
    
    const initialFormData = {
        firstname: childToEdit?.firstname || '',
        lastname: childToEdit?.lastname || '',
        nickname: childToEdit?.nickname || '',
        birthday: childToEdit?.birthday || '',
        age: childToEdit?.age || '',
        allergies: childToEdit?.allergies || '',
        meds: childToEdit?.meds || '',
        topsize: childToEdit?.topsize || '',
        pantssize: childToEdit?.pantssize || '',
        shoesize: childToEdit?.shoesize || '',
        dresssize: childToEdit?.dresssize || '',
        schoollevel: childToEdit?.schoollevel || '',
        schoolname: childToEdit?.schoolname || '',
        favorites: childToEdit?.favorites || '',
        hates: childToEdit?.hates || ''
    };

    const [ formData, setFormData ] = useState({...initialFormData});
    const [ image, setImage ] = useState(undefined);
        
    useEffect(() => {
        fetch('/check')
        .then((resp) => {
            if(resp.ok) {
                setSignedIn(true)
            }
            else {
                setSignedIn(false)
            }
        })
    }, [setSignedIn])

    const addOrEditchild = (newChild) => {
        const isExistingchild = !!childToEdit;
        fetch(isExistingchild ? `/children/${childToEdit.id}` : "/children", {
            method: isExistingchild  ? "PUT" : "POST",
            headers: {
                "Content-Type": "Application/JSON",
            },
            body: JSON.stringify({ ...newChild, user_id: user?.id }),
        })
        .then((response) => response.json())
        .then((newChild) => {
            const data = new FormData();
            data.append('file', image);
            data.append('name', 'image');
            fetch(`/children/${newChild.id}/image`, {
                method: "POST",
                body: data
            })
            .then((response) => response.json())
            .then((image) => {
                if (image?.filepath) {
                    newChild.image = image.filepath;
                }
                const oldchildren = isExistingchild ? 
                child.filter((chld) => chld?.id?.toString() !== newChild?.id?.toString()) 
                : child;
                setChild([...oldchildren, newChild]);
                navigate(`/children/${newChild.id}`);
            })
            .catch(e => console.error("Error uploading child image", e));
            
        })
        .catch((error) => console.error("Error adding new child", error));
      };
    
    const handleChange = (e) => {
        const { name, value} = e.target;
        setFormData({
                ...formData,
                [name]: value
        });
    }
   

    const handleSubmit = (e) => {
        e.preventDefault();
        addOrEditchild(formData);
    };

    return (
        <div>
            {!signedIn ? 
            ((<div>
                <section>
                    <h2>Please sign in to create a new child</h2>
                    <Link to='/signin'><button className="submit-button">Sign In</button></Link>
                </section>
            </div>)) : (
            <div className="container">
                <h2>{!!childToEdit ? 'Edit child:' : 'Add a new child:'}</h2>
                <form onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col-25">
                            <label htmlFor="firstname">First Name</label>
                        </div>
                        <div className="col-75">
                            <input
                                required
                                className="new-child-input"
                                type='text'
                                name='firstname'
                                placeholder="Child's first name here"
                                minLength="1"
                                value={formData.firstname}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-25">
                            <label htmlFor="adress">Last name</label>
                        </div>
                        <div className="col-75">
                            <input
                                required
                                className="new-child-input"
                                type='text'
                                name='lastname'
                                placeholder="Child's last name here"
                                minLength="1"
                                value={formData.lastname}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-25">
                            <label htmlFor="nickname">Nickname</label>
                        </div>
                        <div className="col-75">
                            <input
                                required
                                className="new-child-input"
                                type="text"
                                name="nickname"
                                placeholder="Child's nickname here"
                                minLength="1"
                                value={formData.nickname}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-25">
                            <label htmlFor="birthday">Birthday</label>
                        </div>
                        <div className="col-75">
                            <input
                                required
                                className="new-child-input"
                                type='date'
                                name='birthday'
                                placeholder="Child's birthday here"
                                value={formData.birthday}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-25">
                            <label htmlFor="age">Age</label>
                        </div>
                        <div className="col-75">
                            <input
                                required
                                className="new-child-input"
                                type='number'
                                name='age'
                                placeholder="Child's age here"
                                min="0"
                                max='18'
                                value={formData.age}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-25">
                            <label htmlFor="allergiess">Allergies</label>
                        </div>
                        <div className="col-75">
                            <input
                                required
                                className="new-child-input"
                                type='text'
                                name='allergies'
                                placeholder="List all the child's allergies here"
                                minLength="1"
                                value={formData.allergies}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-25">
                            <label htmlFor="meds">Medications</label>
                        </div>
                        <div className="col-75">
                            <input
                                required
                                className="new-child-input"
                                type='text'
                                name='meds'
                                placeholder="List all meds the child is currently taking"
                                minLength="1"
                                value={formData.meds}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-25">
                            <label htmlFor="topsize">Top Size</label>
                        </div>
                        <div className="col-75">
                            <input
                                required
                                className="new-child-input"
                                type='text'
                                name='topsize'
                                placeholder="Child's shirt size here"
                                minLength="1"
                                value={formData.topsize}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-25">
                            <label htmlFor="pantssize">Pants Size</label>
                        </div>
                        <div className="col-75">
                            <input
                                required
                                className="new-child-input"
                                type="text"
                                name="pantssize"
                                placeholder="Child's pants size here"
                                minLength="1"
                                value={formData.pantssize}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-25">
                            <label htmlFor="dresssize">Dress Size</label>
                        </div>
                        <div className="col-75">
                            <input
                                required
                                className="new-child-input"
                                type="text"
                                name="dresssize"
                                placeholder="Child's dress size here"
                                minLength="1"
                                value={formData.dresssize}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-25">
                            <label htmlFor="shoesize">Shoe Size</label>
                        </div>
                        <div className="col-75">
                            <input
                                required
                                className="new-child-input"
                                type="text"
                                name="shoesize"
                                placeholder="Child's shoe size here"
                                minLength="1"
                                value={formData.shoesize}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-25">
                            <label htmlFor="schoollevel">School level</label>
                        </div>
                        <div className="col-75">
                            <input
                                required
                                className="new-child-input"
                                type="text"
                                name="schoollevel"
                                placeholder="Write child's current school level, ex, daycare, or grade 1, etc."
                                minLength="1"
                                value={formData.schoollevel}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-25">
                            <label htmlFor="schoolname">School Name</label>
                        </div>
                        <div className="col-75">
                            <input
                                required
                                className="new-child-input"
                                type="text"
                                name="schoolname"
                                placeholder="Write child's current school name here"
                                minLength="1"
                                value={formData.schoolname}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-25">
                            <label htmlFor="favorites">Favorites</label>
                        </div>
                        <div className="col-75">
                            <input
                                required
                                className="new-child-input"
                                type="text"
                                name="favorites"
                                placeholder="List child's favorites here"
                                minLength="1"
                                value={formData.favorites}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-25">
                            <label htmlFor="hates">Dislikes</label>
                        </div>
                        <div className="col-75">
                            <input
                                required
                                className="new-child-input"
                                type="text"
                                name="hates"
                                placeholder="List child's dislikes here"
                                minLength="1"
                                value={formData.hates}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-25">
                            <label htmlFor="image">Image</label>
                        </div>
                        <div className="col-75">
                            <input
                                type='file'
                                name='image'
                                accept="image/*"
                                onChange={(e) => {
                                    if (e?.target?.files?.[0]) {
                                        setImage(e.target.files[0])
                                    }
                                }}
                            />
                        </div>
                    </div>
                <div>
                    <button className="submit-button">{!!childToEdit ? 'Submit Changes' : 'Submit New child' }</button>
                </div>
                </form>
                <Link to={`/children/${id}`}><button className="submit-button">Cancel</button></Link>
                <Link to='/children'><button className="submit-button">Back to All children</button></Link>
            </div>
        )
    }</div>)
}

export default NewChild;