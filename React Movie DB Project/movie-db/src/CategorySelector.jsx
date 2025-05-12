import React from "react";
import { CATAGORIES } from "./constants";

export default function CategorySelector(props) {

    const handleChange = (e) => {
        props.onCategoryChange(e.target.value);
    }

    return (
        <select value={props.category} onChange={handleChange}>
            {
                Object.values(CATAGORIES).map((category) => {
                    return (
                        <option value={category.value} key={category.value}>{category.label}</option>
                    );
                })
            }
        </select>
    );
}