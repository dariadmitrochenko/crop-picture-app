import { createBrowserRouter, Navigate } from "react-router-dom";
import Login from "./views/Login.jsx";
import Register from "./views/Register.jsx";
import ProcessImage from "./views/ProcessImage.jsx";
import NotFound from "./views/NotFound.jsx";
import DefaultLayout from "./components/DefaultLayout.jsx";
import GuestLayout from "./components/GuestLayout.jsx"


const router = createBrowserRouter( [
    {
        path: '/',
        element: <DefaultLayout />,
        children: [
            {
                path: '/process-image',
                element: <ProcessImage />
            },
            {
                path: '/',
                element: <Navigate to="/process-image" />
            },
        ]
    },
    {
        path: '/',
        element: <GuestLayout />,
        children: [
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/register',
                element: <Register />
            },
        ]
    },
    {
        path: '*',
        element: <NotFound />
    },
])
export default router;