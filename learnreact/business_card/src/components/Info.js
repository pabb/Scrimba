import React from "react";
import photo from "../images/pb.jpg";

const EMAIL = "mailto:philblackburn@protonmail.com";
const LINKEDIN_URL = "https://www.linkedin.com/in/phillipblackburn/";

function emailButton() {
    window.location.href = EMAIL;
}

function linkedInButton() {
    window.location.href = LINKEDIN_URL;
}

export default function Info() {
    return (
        <div className="info">
            <img className="info--photo" src={photo} alt=""/>
            <h1 className="info--name">Phil Blackburn</h1>
            <h3 className="info--title">Frontend Developer</h3>
            <h4 className="info--site">pbstotallyrealwebsite.com</h4>
            <div className="info--buttons">
                <button onClick={emailButton} className="info--email" type="button">Email</button>
                <button onClick={linkedInButton} className="info--linkedin" type="button">LinkedIn</button>
            </div>
        </div>   
    )
}