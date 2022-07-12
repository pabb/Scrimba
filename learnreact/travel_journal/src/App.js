import React from "react";
import Card from "./components/Card";
import Navbar from "./components/Navbar";
import data from "./data";
import './App.css';

export default function App() {
    const cards = data.map(card => {
        return (
            <Card
                key={card.id}
                item={card} 
            />
        )
    })
    return (
        <div>
            <Navbar />
            <div className="main">
                {cards}
            </div>
        </div>
    )
}