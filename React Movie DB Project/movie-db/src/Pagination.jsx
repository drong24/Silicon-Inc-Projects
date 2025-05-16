import React from "react";

export default function Pagination(props) {
    return (
        <div>
            <button onClick={props.onPrev}>Prev</button>
            <p>{props.currentPage} / {props.totalPages}</p>
            <button onClick={props.onNext}>Next</button>
        </div>
    );
}