import React from "react";

function Results(props) {
    return (
        <tr>
            <td>
                <img src={props.picture} alt={props.firstName}></img>
            </td>
            <td>
                {props.firstName}
            </td>
            <td>
                {props.lastName}
            </td>
            <td>
                {props.email}
            </td>
            <td>
                {props.phone}
            </td>
        </tr>
    )
};

export default Results;