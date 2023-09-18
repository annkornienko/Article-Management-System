import {
    createBrowserRouter,
    Navigate,
    RouterProvider,
    Outlet
} from "react-router-dom";
import AddNewArticle from "../pages/AddNewArticle";
import App from "../App";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Logout from "../pages/Logout"

const ProtectedRoute = () => {
    const userExists = !!localStorage.getItem("user");


    if (!userExists) {
        return <Navigate to="login" />
    }

    return <Outlet />
}

const Routes = () => {
    const routesForAuth = [{
        path: "/",
        element: <ProtectedRoute />,
        children: [
            {
                path: "/",
                element: <App />,
            },
            {
                path: "/new",
                element: <AddNewArticle />,
            },
            {
                path: "/logout",
                element: <Logout />
            },
        ]
    }];

    const routesForPublic = [
        {
            path: "/login",
            element: <Login />,
        },
        {
            path: "/register",
            element: <Register />,
        },
    ];

    const router = createBrowserRouter([
        ...routesForPublic,
        ...routesForAuth
    ]);

    return <RouterProvider router={router} />
}

export default Routes;