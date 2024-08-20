import React from "react";
import { Outlet } from "react-router-dom";
import { Navbar } from "../components/Navbar";

const SecondaryLayout = () => {
    return (
        <div>
            <main>
                <Outlet />
            </main>
        </div>
    );
};

export default SecondaryLayout;