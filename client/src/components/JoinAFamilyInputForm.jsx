import React, {useState} from "react";
import { useNavigate } from "react-router-dom";

function JoinAFamilyInputForm() {
    const [ inviteCode, setInviteCode ] = useState('');    
    const navigate = useNavigate();
    const joinFamily = () => {
        if (!!inviteCode) {
            navigate(`/join-a-family/${inviteCode}`);
        }
    };
    return (
        <>
            <section className="section-title">
                <h2 className="title">Joining A Family</h2>
                <h3 className="title-h2">To join an existing family, ask someone in that family for their invite code, and put it in here!</h3>
            </section>
            <div className="row">
                <div className="col-25">
                    <label htmlFor="firstname">Invite Code</label>
                </div>
                <div className="col-75">
                    <input
                        required
                        className="new-child-input"
                        type='text'
                        name='inviteCode'
                        placeholder="Pase Invite Code Here"
                        minLength="1"
                        value={inviteCode}
                        onChange={(e) => {
                            setInviteCode(e.target.value)
                        }}
                    />
                </div>
                <button className="submit-button" onClick={joinFamily}>Submit</button>
            </div>
        </>
    );
}

export default JoinAFamilyInputForm;