import React, {useEffect, useRef, useState} from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { useUser } from "./Adult";
import { fetchData } from "./utils/fetchData";

function JoinAFamily() {
    const navigate = useNavigate();
    const { signedIn } = useUser();
    const { inviteCode } = useParams();
    const { setFamily, setChild, setEvents } = useOutletContext();
    const [familyJoinError, setFamilyJoinError] = useState(false);
    const hasSentJoinFamilyRequest = useRef(false);
    
    useEffect(() => {
        if (!hasSentJoinFamilyRequest.current) {
            hasSentJoinFamilyRequest.current = true;
            fetch(`/join-family/${inviteCode}`, {
                method: "POST"
            })
            .then(resp => resp.json())
            .then(data => {
                if (!data?.error) {
                    fetchData(signedIn, setChild, setFamily, setEvents);
                } else {
                    console.error('error joining family');
                    setFamilyJoinError(true);
                }
            })
            .catch((error) => {
                console.error('error joining family', error);
                setFamilyJoinError(true);
            })
            .finally(() => {
                setTimeout(() => {
                    hasSentJoinFamilyRequest.current = false;
                    navigate('/families', { replace: true });
                }, 1000);
            });
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [inviteCode]);

    if (familyJoinError) {
        return (
            <section>
                Failed to join family, please try again! Navigating you back to your families!
            </section>
        );
    }

    return (
        <section className="section-title">
            <h1>Joining A Family</h1>
            <h2 className="title-h2">Please wait while we add you to the family. Welcome!</h2>
        </section>
    );
}

export default JoinAFamily;