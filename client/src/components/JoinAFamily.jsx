import React, {useEffect, useState} from "react";
import { useNavigate, useParams } from "react-router-dom";

function Home() {
    const navigate = useNavigate();
    const { inviteCode } = useParams();
    const [familyJoinError, setFamilyJoinError] = useState(false);
    useEffect(() => {
        fetch(`/join-family/${inviteCode}`, {
            method: "POST"
        }).then(resp => {
            if (resp.ok) {
                setTimeout(() => {
                    navigate('/families', { replace: true });
                }, 1500);
            } else {
                console.error('error joining family');
                setFamilyJoinError(true);
            }
        })
        .catch(() => {
            console.error('error joining family');
            setFamilyJoinError(true);
        });
    }, []);

    if (familyJoinError) {
        return (
            <section>
                Failed to join family, please try again!
            </section>
        );
    }

    return (
        <section className="section-title">
            <h1 className="title">Joining A Family</h1>
            <h2 className="title-h2">PLease wait while we add you to the family. Welcome!</h2>
        </section>
    );
}

export default Home;