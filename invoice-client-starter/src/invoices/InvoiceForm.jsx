import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { apiGet, apiPost, apiPut } from "../utils/api";

import InputField from "../components/InputField";
import InputSelect from "../components/InputSelect";
import FlashMessage from "../components/FlashMessage";

const InvoiceForm = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const [invoice, setInvoice] = useState({
        invoiceNumber: "",
        seller: "",
        buyer: "",
        issued: "",
        dueDate: "",
        product: "",
        price: "",
        vat: "",
        note: "",
    });

    const [persons, setPersons] = useState([]);
    const [sent, setSent] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        apiGet("/api/persons").then((data) => setPersons(data));

        if (id) {
            apiGet("/api/invoices/" + id).then((data) => setInvoice(data));
        }
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const request = id
            ? apiPut("/api/invoices/" + id, invoice)
            : apiPost("/api/invoices", invoice);

        request
            .then(() => {
                setSent(true);
                setSuccess(true);
                navigate("/invoices");
            })
            .catch((err) => {
                setError(err.message);
                setSent(true);
                setSuccess(false);
            });
    };

    return (
        <div>
            <h1>{id ? "Upravit" : "Vytvořit"} fakturu</h1>
            <hr />

            {error && <div className="alert alert-danger">{error}</div>}

            {sent && success && (
                <FlashMessage
                    theme="success"
                    text="Uložení faktury proběhlo úspěšně."
                />
            )}

            <form onSubmit={handleSubmit}>
                <InputField
                    required
                    type="text"
                    label="Číslo faktury"
                    value={invoice.invoiceNumber}
                    handleChange={(e) =>
                        setInvoice({ ...invoice, invoiceNumber: e.target.value })
                    }
                />

                <InputSelect
                    required
                    name="buyer"
                    label="Kupující"
                    prompt="Vyberte kupujícího"
                    items={persons}
                    value={invoice.buyer}
                    handleChange={(e) =>
                        setInvoice({ ...invoice, buyer: e.target.value })
                    }
                />

                <InputSelect
                    required
                    name="seller"
                    label="Prodávající"
                    prompt="Vyberte prodávajícího"
                    items={persons}
                    value={invoice.seller}
                    handleChange={(e) =>
                        setInvoice({ ...invoice, seller: e.target.value })
                    }
                />

                <InputField
                    required
                    type="date"
                    label="Datum vystavení"
                    value={invoice.issued}
                    handleChange={(e) =>
                        setInvoice({ ...invoice, issued: e.target.value })
                    }
                />

                <InputField
                    required
                    type="date"
                    label="Datum splatnosti"
                    value={invoice.dueDate}
                    handleChange={(e) =>
                        setInvoice({ ...invoice, dueDate: e.target.value })
                    }
                />

                <InputField
                    required
                    type="text"
                    label="Produkt / služba"
                    value={invoice.product}
                    handleChange={(e) =>
                        setInvoice({ ...invoice, product: e.target.value })
                    }
                />

                <InputField
                    required
                    type="number"
                    label="Cena"
                    value={invoice.price}
                    handleChange={(e) =>
                        setInvoice({ ...invoice, price: e.target.value })
                    }
                />

                <InputField
                    required
                    type="number"
                    label="DPH"
                    value={invoice.vat}
                    handleChange={(e) =>
                        setInvoice({ ...invoice, vat: e.target.value })
                    }
                />

                <InputField
                    type="text"
                    label="Poznámka"
                    value={invoice.note}
                    handleChange={(e) =>
                        setInvoice({ ...invoice, note: e.target.value })
                    }
                />

                <input
                    type="submit"
                    className="btn btn-primary"
                    value="Uložit"
                />
            </form>
        </div>
    );
};

export default InvoiceForm;
