import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import { Outlet } from 'react-router'
import { useUser } from "./Adult";
import Header from './Header'
import Footer from './Footer'

function App() {
  const { user, signedIn } = useUser();
  const { child, setChild } = useState([]);
  const { family, setFamily } = useState([]);
  const { files, setFiles } = useState([]);
  const { events, setEvents } = useState([]);

  useEffect(() => {
    if (signedIn) {
    fetch('http://localhost:5555/children')
    .then((resp) => resp.json())
    .then((data) => setChild(data))
    .catch((error) => console.error('Error fetching data', error));

    fetch(`http://localhost:5555/child-files`)
    .then(resp => resp.json())
    .then((data) => setFiles(data))
    .catch((error) => console.error('Error fetching data', error));
  
    fetch(`http://localhost:5555/families`)
    .then(resp => resp.json())
    .then((data) => setFamily(data))
    .catch((error) => console.error('Error fetching data', error));

    fetch(`http://localhost:5555/events`)
    .then(resp => resp.json())
    .then((data) => setEvents(data))
    .catch((error) => console.error('Error fetching data', error));
    }
  }, [signedIn, user?.id]);

  return (
    <div>
      <Header />
        <div>
          <Outlet context={{
            child:child,
            setChild:setChild,
            files:files,
            setFiles:setFiles,
            family:family,
            setFamily:setFamily,
            events:setEvents
          }}/>
        </div>
      <Footer />
    </div>
  )
}

export default App;
