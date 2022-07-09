import React from "react";
import Info from "./components/Info";
import About from "./components/About";
import Interests from "./components/Interests";
import Footer from "./components/Footer";
import './App.css';

export default function App() {
    return (
        <div className="main">
            <Info/>
            <About/>
            <Interests/>
            <Footer/>
        </div>
    )
}