import { createBrowserRouter } from "react-router";
import RootLayout from "../Layout/RootLayout";
import Home from "../Pages/Home/Home/Home";
import AuthLayouts from "../Layout/AuthLayouts";
import Login from "../Pages/Authentication/Login/Login";
import Register from "../Pages/Authentication/Register/Register";
import Coverage from "../Pages/Coverage/Coverage";
import PrivateRoute from "../routes/PrivateRoute";
import SendParcel from "../Pages/sendParcel/sendParcel";
import DashboardLayout from "../Layout/dashBoardLayout";
import MyParcels from "../Pages/MyParcels/MyParcels";


export const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: 'coverage',
                element: <Coverage />,
                loader: () => fetch('./warehouses.json')
            },
            {
                path: 'sendParcel',
                element: <PrivateRoute><SendParcel /></PrivateRoute>,
                loader: () => fetch('./warehouses.json')
            }
        ]
    },
    {
        path: '/',
        element: <AuthLayouts />,
        children: [
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/register',
                element: <Register />
            }
        ]
    },
    {
        path: '/dashboard',
        element: <PrivateRoute><DashboardLayout /></PrivateRoute>,
        children: [
            {
                path: 'myParcels',
                element: <MyParcels />
            }
        ]
    }
])