import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiGet } from "../utils/api";
import InvoiceTable from "./InvoiceTable";

const InvoicePurchases = () => {
    const { ico } = useParams();
    const [invoices, setInvoices] = useState([]);

    useEffect(() => {
        apiGet(`/api/identification/${ico}/purchases`)
            .then((data) => setInvoices(data))
            .catch((err) => console.error(err));
    }, [ico]);

    return (
        <div>
            <h1>Nákupy osoby (IČ: {ico})</h1>
            <InvoiceTable items={invoices} />
        </div>
    );
};

export default InvoicePurchases;
