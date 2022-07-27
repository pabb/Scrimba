import React from "react";
import icon from "../images/globe_icon.png";

export default function Navbar() {
    return (
        <nav className="navbar">
            <img className="navbar--icon" src={icon} alt="Blog logo."/>
            <h3 className="navbar--title">my travel journal.</h3>
        </nav>
    )
}