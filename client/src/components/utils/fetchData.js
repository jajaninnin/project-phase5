export const fetchData = (signedIn, setChild, setFamily, setEvents) => {
    if (signedIn) {
        fetch('/children')
        .then((resp) => resp.json())
        .then((data) => setChild(data))
        .catch((error) => console.error('Error fetching data', error));
      
        fetch(`/families`)
        .then(resp => resp.json())
        .then((data) => setFamily(data))
        .catch((error) => console.error('Error fetching data', error));
  
        fetch(`/events`)
        .then(resp => resp.json())
        .then((data) => setEvents(data))
        .catch((error) => console.error('Error fetching data', error));
    }
}