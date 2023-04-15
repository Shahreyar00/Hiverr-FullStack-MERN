import React from "react";
import "./app.scss";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import { Navbar, Footer } from "./components";
import { Home, Gigs, Gig, Login, Register, Add, Orders, Messages, Message, MyGigs, Pay, Success } from "./pages";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const App = () => {
    const queryClient = new QueryClient();

    const Layout = () => {
        return (
            <div className="app">
                <QueryClientProvider client={queryClient}>
                    <Navbar />
                    <Outlet />
                    <Footer />
                </QueryClientProvider>
            </div>
        );
    };

    const router = createBrowserRouter([
        {
            path: "/",
            element: <Layout />,
            children: [
                {
                    path: "/",
                    element: <Home />,
                },
                {
                    path: "/gigs",
                    element: <Gigs />,
                },
                {
                    path: "/myGigs",
                    element: <MyGigs />,
                },
                {
                    path: "/orders",
                    element: <Orders />,
                },
                {
                    path: "/messages",
                    element: <Messages />,
                },
                {
                    path: "/message/:id",
                    element: <Message />,
                },
                {
                    path: "/add",
                    element: <Add />,
                },
                {
                    path: "/gig/:id",
                    element: <Gig />,
                },
                {
                    path: "/register",
                    element: <Register />,
                },
                {
                    path: "/login",
                    element: <Login />,
                },
                {
                    path: "/pay/:id",
                    element: <Pay />,
                },
                {
                    path: "/success",
                    element: <Success />,
                },
            ],
        },
    ]);

    return <RouterProvider router={router} />;

}

export default App