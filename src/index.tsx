import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';

import './styles/reset.css';

import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";

import Index from 'components/Search';
import Issues from 'components/Issue';
import NotFound from 'components/NotFound';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Issues />} />
            <Route path="issues" element={<Issues />} />
            <Route path="search" element={<Index />} />
            <Route path={"*"} element={<NotFound />}/>
        </Routes>
    </BrowserRouter>
);

reportWebVitals();