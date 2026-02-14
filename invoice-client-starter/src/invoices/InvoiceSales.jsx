import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiGet } from "../utils/api";
import InvoiceTable from "./InvoiceTable";

const InvoiceSales = () => {
    const { ico } = useParams();
    const [invoices, setInvoices] = useState([]);

    useEffect(() => {
        apiGet(`/api/identification/${ico}/sales`)
            .then((data) => setInvoices(data));
    }, [ico]);

    return (
        <div>
            <h1>Prodeje osoby (IČ: {ico})</h1>
            <InvoiceTable items={invoices} />
        </div>
    );
};

export default InvoiceSales;
