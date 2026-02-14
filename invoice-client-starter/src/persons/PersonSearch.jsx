import React, { useState } from "react";
import { apiGet } from "../utils/api";
import InputField from "../components/InputField";
import PersonTable from "./PersonTable";

const PersonSearch = () => {
    const [persons, setPersons] = useState([]);

    const [name, setName] = useState("");
    const [identification, setIdentification] = useState("");
    const [city, setCity] = useState("");

    const handleSearch = () => {
        const params = {};

        if (name.trim() !== "") {
            params.name = name;
        }

        if (identification.trim() !== "") {
            params.identification = identification;
        }

        if (city.trim() !== "") {
            params.city = city;
        }

        apiGet("/api/persons", params)
            .then((data) => setPersons(data))
            .catch((err) => console.error(err));
    };

    return (
        <div>
            <h1>Seznam osob</h1>

            <InputField
                label="Jméno"
                type="text"
                value={name}
                handleChange={(e) => setName(e.target.value)}
            />

            <InputField
                label="IČ / DIČ"
                type="text"
                value={identification}
                handleChange={(e) => setIdentification(e.target.value)}
            />

            <InputField
                label="Město"
                type="text"
                value={city}
                handleChange={(e) => setCity(e.target.value)}
            />

            <button 
                className="btn btn-success" 
                onClick={handleSearch}
            >
                Hledat
            </button>

            <PersonTable items={persons} />
        </div>
    );
};

export default PersonSearch;
