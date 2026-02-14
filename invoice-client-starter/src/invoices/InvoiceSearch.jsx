import React, { useState } from "react";
import { apiGet } from "../utils/api";
import InputField from "../components/InputField";
import InvoiceTable from "./InvoiceTable";

const InvoiceSearch = () => {
    const [invoices, setInvoices] = useState([]);

    const [name, setName] = useState("");
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");

    const handleSearch = () => {
        const params = {};

        if (name.trim() !== "") {
            params.product = name;
        }

        if (minPrice !== "" && !isNaN(minPrice)) {
            params.min_price = minPrice;
        }

        if (maxPrice !== "" && !isNaN(maxPrice)) {
            params.max_price = maxPrice;
        }

        apiGet("/api/invoices", params)
            .then((data) => setInvoices(data))
            .catch((err) => console.error(err));
    };

    return (
        <div>
            <h1>Vyhledávání faktur</h1>

            <InputField
                label="Název / produkt"
                type="text"
                value={name}
                handleChange={(e) => setName(e.target.value)}
            />

            <InputField
                label="Min cena"
                type="number"
                value={minPrice}
                handleChange={(e) => setMinPrice(e.target.value)}
            />

            <InputField
                label="Max cena"
                type="number"
                value={maxPrice}
                handleChange={(e) => setMaxPrice(e.target.value)}
            />

            <button 
                className="btn btn-success" 
                onClick={handleSearch}
            >
                Hledat
            </button>

            <InvoiceTable items={invoices} />
        </div>
    );
};

export default InvoiceSearch;
