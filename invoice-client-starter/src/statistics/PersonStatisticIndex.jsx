import React, {useEffect, useState} from "react";

import {apiDelete, apiGet} from "../utils/api";

import PersonStatisticTable from "./PersonStatisticTable";

const PersonStatisticIndex = () => {
    const [persons, setPersons] = useState([]);



    useEffect(() => {
        apiGet("/api/statistics/persons/").then((data) => setPersons(data));
    }, []);

    return (
        <div>
            <h1>Seznam osob</h1>
            <PersonStatisticTable
                
                items={persons}
                label="Počet osob:"
            />
        </div>
    );
};
export default PersonStatisticIndex;