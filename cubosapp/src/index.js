import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './global.css';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter } from "react-router-dom";
import MyRoutes from './routes';

const root = createRoot(document.getElementById('root'));
root.render(
    <StrictMode>
        <BrowserRouter>
            <MyRoutes/>
            <ToastContainer/>
        </BrowserRouter>
    </StrictMode>
);
