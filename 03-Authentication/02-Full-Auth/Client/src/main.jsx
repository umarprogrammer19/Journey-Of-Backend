import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './Layout.jsx'
import Login from './login.jsx'
import Signup from './signup.jsx'

const router = createBrowserRouter([{
  path: "/",
  element: <Layout />,
  children: [{
    path: "",
    element: <App />
  }, {
    path: "/login",
    element: <Login />
  }, {
    path: "/signup",
    element: <Signup />
  }],
}])

createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
