import React, {useEffect, useRef, useState} from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";

function JoinAFamily() {
    const navigate = useNavigate();
    const { inviteCode } = useParams();
    const { setFamily } = useOutletContext;
    const [familyJoinError, setFamilyJoinError] = useState(false);
    const hasSentJoinFamilyRequest = useRef(false);
    useEffect(() => {
        if (!hasSentJoinFamilyRequest.current) {
            hasSentJoinFamilyRequest.current = true;
            fetch(`/join-family/${inviteCode}`, {
                method: "POST"
            }).then(resp => {
                if (resp.ok) {
                    setTimeout(() => {
                        hasSentJoinFamilyRequest.current = false;
                        navigate('/families', { replace: true });
                    }, 1000);
                } else {
                    console.error('error joining family');
                    setFamilyJoinError(true);
                }
            })
            .catch(() => {
                console.error('error joining family');
                setFamilyJoinError(true);
            });
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [inviteCode]);

    if (familyJoinError) {
        return (
            <section>
                Failed to join family, please refresh and try again!
            </section>
        );
    }

    return (
        <section className="section-title">
            <h1 className="title">Joining A Family</h1>
            <h2 className="title-h2">Please wait while we add you to the family. Welcome!</h2>
        </section>
    );
}

export default JoinAFamily;