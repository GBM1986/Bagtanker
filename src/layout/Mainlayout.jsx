import React from "react";
import { Outlet } from "react-router-dom";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { Breadcrumb } from "../components/Breadcrumb";
import { Navbar } from "../components/Navbar";
import { FullMenu } from "../components/Fullmenu";
import ContentWrapper from "../components/ContentWrapper";


const MainLayout = () => {

    return (
        <div>
            <header>
                <Header />
            </header>

    
            <main>
            <ContentWrapper>
                <Breadcrumb />
                <Outlet />
            </ContentWrapper>
            </main>

            <footer>
                <Footer />
            </footer>
        </div>
    );
};

export default MainLayout