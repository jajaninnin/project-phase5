import { createBrowserRouter } from "react-router-dom";
import HomePage from './HomePage'
import Children from './Children';
import ChildDetails from "./ChildDetails";
import SignIn from "./SignIn";
import Files from "./Files";
import Families from './Families'
import Events from './Events'
import App from './App'

const routes = createBrowserRouter([{
    path: '/', element: <App />,
    children: [
        { path: '/', element: <HomePage/>},
        { path: '/children', element: <Children/>},
        { path: 'children/:id', element: <ChildDetails />},
        { path: '/signin', element: <SignIn />},
        { path: '/events', element: <Events />},
        { path: '/families', element: <Families />},
        { path: '/files', element: <Files />}
    ]
}])

export default routes;