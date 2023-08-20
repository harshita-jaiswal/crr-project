import React from "react";

export function buildTable(columns, rows) {
    return (
        <table>
            <thead>
            <tr>{columns}</tr>
            </thead>
            <tbody>{rows}</tbody>
        </table>
    );
}