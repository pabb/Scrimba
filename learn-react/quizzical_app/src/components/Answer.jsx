import React from "react";

export default function Answer(props) {

    const styles = {
        backgroundColor: determineColor()
    }

    function determineColor() {
        if (props.checkCorrect) {
            // Correct answer
            if (props.isCorrect) {
                return "#94D7A2";
            }

            // Selected but not correct
            if (props.isSelected) {
                return "#F8BCBC";
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