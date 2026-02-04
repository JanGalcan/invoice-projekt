import React from "react";
import {Link} from "react-router-dom";

const PersonStatisticTable = ({label, items, deletePerson}) => {
    return (
        <div>
            <p>
                {label} {items.length}
            </p>

            <table className="table table-bordered">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Jméno</th>
                    <th>Příjem</th>
                </tr>
                </thead>
                <tbody>
                {items.map((item, index) => (
                    <tr key={index + 1}>
                        <td>{item.personId}</td>
                        <td>{item.personName}</td>
                        <td>{item.revenue}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            
        </div>
    );
};

export default PersonStatisticTable;
