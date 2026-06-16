import React from "react";
import classNames from "classnames";

export default function A_Text ({
    text,
    type
}) {

    const classes = classNames ({
        A_Text: true,
        [`${type}`]: true
    })

    return (
        <p className={classes}>{text}</p>
    )
}