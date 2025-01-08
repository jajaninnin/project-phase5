import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useUser } from "./Adult";

function Header() {
    const {signedIn, setSignedIn, setUser } = useUser();

    useEffect(() => {
        fetch('/check')
        .then((res) => res.json())
        .then((data) => {
            if (data?.id) {
                setSignedIn(true);
                setUser(data);
            }
            else {
                setSignedIn(false);
                setUser(null);
            }
        })
    }, [setSignedIn, setUser])

    const logout = (e) => {
        e.preventDefault();
        fetch('/logout', {
            method: 'DELETE'
        })
        .then(() => {
            setSignedIn(false);
            setUser(null)
        })
    }

    return(
        <header className="header">
            <span className="title-nav">Parently</span>
            <span className="headerlinks">
                <NavLink className="headerlink" to='/'>Home</NavLink>
                <NavLink className="headerlink" to='/families'>Family</NavLink>
                <NavLink className="headerlink" to='/children'>Child</NavLink>
                {!signedIn ? 
                (<NavLink className="headerlink" to='/signin'>Sign In</NavLink>) :
                (<NavLink className="headerlink" onClick={logout}>Log out</NavLink>)
                }
            </span>
        </header>
    )
}

export default Header;