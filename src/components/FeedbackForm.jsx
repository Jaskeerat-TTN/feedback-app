import React, { useState, useContext, useEffect } from "react";
import Card from "./shared/Card";
import Button from "./shared/Button";
import RatingSelect from "./RatingSelect";
import FeedbackContext from "../context/FeedbackContext";

function FeedbackForm() {
    const { addFeedback, feedbackEdit, updateFeedback } = useContext(FeedbackContext);
    
    const [text, setText] = useState("");
    const [rating, setRating] = useState(10);
    const [btnDisabled, setBtnDisabled] = useState(true);
    const [message, setMessage] = useState("");

    useEffect(() => {
        if (feedbackEdit.edit) {
            setBtnDisabled(false);
            setText(feedbackEdit.item.text);
            setRating(feedbackEdit.item.rating);
        }
    }, [feedbackEdit])

    const handleTextChange = ({target : {value}}) => {
        if (value === "") {
            setBtnDisabled(true);
            setMessage(null);
        } else if (value.trim().length <= 10) {
            setMessage("Text must be at least 10 characters");
            setBtnDisabled(true);
        } else {
            setMessage(null);
            setBtnDisabled(false);
        }

        setText(value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (text.trim().length > 10) {
            const newFeedback = {
                text,
                rating,
            }

            if (feedbackEdit.edit) {
                updateFeedback(feedbackEdit.item.id, newFeedback)
            }
            else {
                addFeedback(newFeedback);
            }

            setBtnDisabled(true);
            setRating(10)
            setText('');
        }
    }

    return (
        <Card>
            <form onSubmit={handleSubmit}>
                <h2>How would you rate your services with us?</h2>
                <RatingSelect select= {setRating} selected = {rating} />
                <div className="input-group">
                    <input
                        type="text"
                        onChange={handleTextChange}
                        placeholder="Write a review"
                        value={text}
                    />
                    <Button type="submit" isDisabled={btnDisabled}>
                        Send
                    </Button>
                </div>

                {message && <div className="message">{message}</div>}
            </form>
        </Card>
    );
}

export default FeedbackForm;
