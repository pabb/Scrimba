import React from "react";
import photo from "../images/location_icon.png";

export default function Card(props) {
    return (
        <div className="card">
            <img className="card--img" src={props.item.imageUrl} alt="Experience location."/>
            <div className="card--info">
                <span className="card--topbar">
                    <img className="card--location-icon" src={photo} alt="Location icon."/>
                    <p className="card--location">{props.item.location}</p>
                    <a className="card--location-link" href={props.item.googleMapsUrl}>View on Google Maps</a>
                </span>
                <h1 className="card--title">{props.item.title}</h1>
                <span className="card--dates">{props.item.startDate} - {props.item.endDate}</span>
                <p className="card--description">{props.item.description}</p>
            </div>
        </div>
    )
}