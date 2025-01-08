import { createBrowserRouter } from "react-router-dom";
import HomePage from './HomePage'
import Children from './Children';
import ChildDetails from "./ChildDetails";
import SignIn from "./SignIn";
import Files from "./Files";
import Families from './Families'
import FamilyDetails from "./FamilyDetails";
import Events from './Events'
import App from './App'
import NewChild from "./NewChild";

const routes = createBrowserRouter([{
    path: '/', element: <App />,
    children: [
        { path: '/', element: <HomePage/>},
        { path: '/children', element: <Children/>},
        { path: '/children/:id', element: <ChildDetails />},
        { path: '/new-child', element: <NewChild /> },
        { path: '/children/:id/edit', element: <NewChild isEdit={true} />},
        { path: '/families', element: <Families />},
        { path: '/families/:id', element: <FamilyDetails />},
        { path: '/files/:id', element: <Files />},
        { path: '/signin', element: <SignIn />},
        { path: '/events', element: <Events />},
    ]
}])

export default routes;