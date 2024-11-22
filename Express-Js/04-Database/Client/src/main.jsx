import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './layout.jsx';
import SingleUser from './SingleUser.jsx';

const router = createBrowserRouter([{
  path: "/",
  element: <Layout />,
  children: [{
    path: "",
    element: <App />
  }, {
    path: "/users/:id",
    element: <SingleUser />
  }]
}]);

createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
