import React, { useEffect, useState } from "react";
import { Outlet } from 'react-router'
import { useUser } from "./Adult";
import Header from './Header'
import Footer from './Footer'

function App() {
  const { user, signedIn } = useUser();
  const [ child, setChild ] = useState([]);
  const [ family, setFamily ] = useState([]);
  // const [ files, setFiles ] = useState([]);
  const [ events, setEvents ] = useState([]);

  useEffect(() => {
    if (signedIn) {
      fetch('/children')
      .then((resp) => resp.json())
      .then((data) => setChild(data))
      .catch((error) => console.error('Error fetching data', error));

      // fetch(`/child-files`)
      // .then(resp => resp.json())
      // .then((data) => setFiles(data))
      // .catch((error) => console.error('Error fetching data', error));
    
      fetch(`/families`)
      .then(resp => resp.json())
      .then((data) => setFamily(data))
      .catch((error) => console.error('Error fetching data', error));

      fetch(`/events`)
      .then(resp => resp.json())
      .then((data) => setEvents(data))
      .catch((error) => console.error('Error fetching data', error));
    }
  }, [setChild, setEvents, setFamily, signedIn, user?.id]);

  return (
    <div>
      <Header />
        <div>
          <Outlet context={{
            child:child,
            setChild:setChild,
            // files:files,
            // setFiles:setFiles,
            family:family,
            setFamily:setFamily,
            events:events,
            setEvents:setEvents,
          }}/>
        </div>
      <Footer />
    </div>
  )
}

export default App;
