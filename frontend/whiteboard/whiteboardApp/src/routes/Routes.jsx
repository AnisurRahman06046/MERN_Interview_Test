import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../Layout/RootLayout";
import Home from "../pages/Home";
import Draw from "../pages/Draw";
import SingleDrawing from "../components/SingleDrawing";
import EditDrawing from "../pages/EditDrawing";

export const router = createBrowserRouter([
    {
        path:"/",
        element:<RootLayout/>,
        children:[
            {
                path:"/",
                element:<Home/>
            },
            {
                path:"/create-drawing",
                element:<Draw/>
            },
            {
                path:"/drawing/:id",
                element:<SingleDrawing/>
            },
            {
                path:"/drawing/edit/:id",
                element:<EditDrawing/>
            },
        ]

    }
])