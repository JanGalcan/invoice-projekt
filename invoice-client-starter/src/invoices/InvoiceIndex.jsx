import React, {useEffect, useState} from "react";

import {apiDelete, apiGet} from "../utils/api";

import InvoiceTable from "./InvoiceTable";
import InputField from "../components/InputField";
import InputSelect from "../components/InputSelect";


const InvoiceIndex = () => {
    const [invoices, setInvoices] = useState([]);
    const [search, setSearch] = useState("");



    const deleteInvoice = async (id) => {
        try {
            await apiDelete("/api/invoices/" + id);
        } catch (error) {
            console.log(error.message);
            alert(error.message)
        }
        setInvoices(invoices.filter((item) => item._id !== id));
    };

    useEffect(() => {
    const params = new URLSearchParams();

    if (search) params.append("product", search);

    apiGet("/api/invoices?" + params.toString())
        .then((data) => setInvoices(data));
}, [search]);


    return (
        <div>

            <h1>Seznam faktur</h1>
                            
            <InvoiceTable
                deleteInvoice={deleteInvoice}
                items={invoices}
                label="Počet faktur:"
            />
            
        </div>
    );
};
export default InvoiceIndex;