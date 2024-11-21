import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './Layout.jsx';
import SingleUser from './SingleUser.jsx';

const router = createBrowserRouter([{
    path: "/",
    element: <Layout />,
    children: [{
        path: "",
        element: <App />
    }, {
        path: "/user/:id",
        element: <SingleUser />
    }]
}])

createRoot(document.getElementById('root')).render(
    <RouterProvider router={router}/>
)
