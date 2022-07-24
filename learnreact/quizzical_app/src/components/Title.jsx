import React from "react";

export default function Title(props) {
    return (
        <div className="title">
            <h1 className="title--header">Quizzical</h1>
            <button 
                className="title--button" 
                onClick={() => props.handleStart(true)}
            >
                Start quiz
            </button>
        </div>
    )
}