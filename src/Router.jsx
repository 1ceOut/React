import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import LoginPage from "./Pages/LoginPage.jsx";
import HomePage from './Pages/HomePage.jsx';
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import LoginAccess from "./components/Login/LoginAccess.jsx";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

const Router = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={<LoginPage/>} />
                    <Route path="/login/oauth2/code/:provider" element={<LoginAccess/>} />

                    <Route path='/' element={<HomePage/>}/>
                </Routes>
            </BrowserRouter>
            <ReactQueryDevtools />
        </QueryClientProvider>
    );
};

export default Router;
