import React from "react";

export default function Answer(props) {

    const styles = {
        backgroundColor: props.isSelected ? "#D6DBF5" : "#FFFFFF"
    }

    return (
        <button  
            className="answer--button"
            onClick={props.handleClick}
            style={styles}
        >
            {props.answer}
        </button>       
    )
}