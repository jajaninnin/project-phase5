import React, { useEffect, useState } from "react";
import { useOutletContext, Link, useNavigate, useParams } from "react-router-dom";
import { useUser } from "./Adult";
import { fetchData } from "./utils/fetchData";

function NewChild({isEdit = false}) {
    const { signedIn } = useUser();
    const { family, child, setChild, setFamily, setEvents } = useOutletContext();
    const { user } = useUser();
    const { id } = useParams();
    const navigate = useNavigate();
    const [childToEdit, setChildToEdit] = useState();

    useEffect(() => {
        const oldFamily = family.find((fam) => {
            return fam.children_member.some((chld_mem) => {
                return chld_mem?.id.toString() === id;
            });
        });

        const chldToEdit = isEdit ? child.find(child => child?.id?.toString() === id?.toString()) : null;

        setChildToEdit(chldToEdit);

        const initFormData = {
            firstname: chldToEdit?.firstname || '',
            lastname: chldToEdit?.lastname || '',
            nickname: chldToEdit?.nickname || '',
            birthday: chldToEdit?.birthday || '',
            age: chldToEdit?.age || '',
            allergies: chldToEdit?.allergies || '',
            meds: chldToEdit?.meds || '',
            topsize: chldToEdit?.topsize || '',
            pantssize: chldToEdit?.pantssize || '',
            shoesize: chldToEdit?.shoesize || '',
            dresssize: chldToEdit?.dresssize || '',
            schoollevel: chldToEdit?.schoollevel || '',
            schoolname: chldToEdit?.schoolname || '',
            favorites: chldToEdit?.favorites || '',
            hates: chldToEdit?.hates || '',
            family_id: oldFamily?.id || family?.[0]?.id || '',
            old_family_id: oldFamily?.id || ''
        };

        setFormData(initFormData);
    }, [child, family, id, isEdit]);

    const [ formData, setFormData ] = useState({});
    const [ image, setImage ] = useState(undefined);

    const addOrEditchild = (newChild) => {
        const isExistingchild = !!childToEdit;
        const { old_family_id, ...newChildWithoutOldFamilyId } = newChild;
        const bodyToSend = isExistingchild ? { ...newChild, user_id: user?.id } : { ...newChildWithoutOldFamilyId, user_id: user?.id } 
        fetch(isExistingchild ? `/children/${childToEdit.id}` : "/children", {
            method: isExistingchild  ? "PUT" : "POST",
            headers: {
                "Content-Type": "Application/JSON",
            },
            body: JSON.stringify(bodyToSend),
        })
        .then((response) => response.json())
        .then((newChild) => {
            if (!!image) {
                const data = new FormData();
                data.append('file', image);
                data.append('name', 'image');
                fetch(`/children/${newChild.id}/image`, {
                    method: "POST",
                    body: data
                })
                .then((response) => response.json())
                .then(() => {
                    fetchData(signedIn, setChild, setFamily, setEvents);
                    navigate(`/children/${newChild.id}`);
                })
                .catch(e => console.error("Error uploading child image", e));
            } else {
                fetchData(signedIn, setChild, setFamily, setEvents);
                navigate(`/children/${newChild.id}`);
            }

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

    const familyId = !childToEdit ? null : family.find(fam => fam.children_member.find(chld_mem => chld_mem.id === childToEdit.id))?.id;
    const familySorted = !childToEdit ? family : [...family].sort((famA, famB) => {
        if (famA.id.toString() === familyId.toString()) {
            return -1;
        }
        if (famB.id.toString() === familyId.toString()) {
            return 1;
        }
        return 0;
    });

    return (
        <div className="container-2">
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
                        <label htmlFor="family_id">Child's Family</label>
                    </div>
                    <div className="col-75">
                        <select name="family_id" id="family_id" value={formData.family_id} onChange={handleChange}>
                            {familySorted.map(fam => (
                                <option key={`famOption${fam.id}`} value={fam.id}>{fam.name}</option>
                            ))}
                        </select>
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
}

export default NewChild;