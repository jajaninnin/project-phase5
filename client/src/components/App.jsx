import React, { useEffect, useState } from "react";
import { Outlet } from 'react-router'
import { useUser } from "./Adult";
import Header from './Header'
import Footer from './Footer'
import { fetchData } from "./utils/fetchData";

function App() {
  const { signedIn } = useUser();
  const [ child, setChild ] = useState([]);
  const [ family, setFamily ] = useState([]);
  const [ events, setEvents ] = useState([]);

  useEffect(() => {
    fetchData(signedIn, setChild, setFamily, setEvents);
  }, [signedIn]);

  return (
    <div>
      <Header />
        <div>
          <Outlet context={{
            child:child,
            setChild:setChild,
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
