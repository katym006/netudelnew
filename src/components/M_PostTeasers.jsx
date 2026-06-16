import React from "react";

import A_Text from "./A_Text.jsx";

export default function M_PostTeaser ({
    url,
    title,
    description
}) {
    return (
        <div className="O_Article">
           <a href={url} className="A_ArticleTitle">{title}</a>
           <A_Text text={description} type="A_ArticleDesctiption" />
        </div>
    )
}