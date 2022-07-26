import React from "react";

export default function Answer(props) {

    const styles = {
        backgroundColor: determineColor()
    }

    function determineColor() {
        if (props.checkCorrect) {
            if (props.isCorrect) {
                if (props.isSelected) {
                    return "#00FF00" // green
                } else {
                    return "#FF0000" //red
                }
            }
            if (props.isSelected) {
                return "#FF0000" //red
            }
        } else {
            return props.isSelected ? "#D6DBF5" : "#FFFFFF"
        }
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