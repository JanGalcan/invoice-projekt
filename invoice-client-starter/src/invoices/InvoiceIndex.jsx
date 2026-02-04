import React, {useEffect, useState} from "react";

import {apiDelete, apiGet} from "../utils/api";

import InvoiceTable from "./InvoiceTable";
import InputField from "../components/InputField";
import InputSelect from "../components/InputSelect";


const InvoiceIndex = () => {
    const [invoices, setInvoices] = useState([]);

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
        apiGet("/api/invoices").then((data) => setInvoices(data));
    }, []);

    return (
        <div>

            <h1>Seznam faktur</h1>
            <InputField label="Hledat fakturu podle čísla:" 
             type="text"></InputField>
                
            <InvoiceTable
                deleteInvoice={deleteInvoice}
                items={invoices}
                label="Počet faktur:"
            />
            
        </div>
    );
};
export default InvoiceIndex;