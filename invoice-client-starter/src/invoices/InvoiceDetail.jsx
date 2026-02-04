import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {apiGet} from "../utils/api";
import InputField from "../components/InputField";


import PersonDetail from "../persons/PersonDetail";

const InvoiceDetail = () => {
    
    const {id} = useParams();
    const [invoice, setInvoice] = useState({});
    const [person, setPerson] = useState({});

    useEffect(() => {
        apiGet("/api/invoices/" + id)
        .then((data)=> {
            setInvoice(data);
        })
        .catch((error) => {
            console.error("Error fetching invoice data:", error);
        });        
    }, [id]);
    

    return (
        <>
            <div>
                <h1>Detail faktury</h1>
                <hr/>
                <h3><strong>Číslo faktury: </strong>{invoice.invoiceNumber}</h3>
                <p>
                    <strong>Prodejce:</strong>
                    <br/>
                    <strong>{invoice.seller? invoice.seller.name : ""}</strong>
                    <br/>
                    <strong>Ičo: </strong> 
                    {invoice.seller? invoice.seller.identificationNumber : ""},
                    <br/>
                    <strong>Sídlo: </strong>
                    {invoice.seller? invoice.seller.street : ""},
                    {invoice.seller? invoice.seller.city : ""},
                    {invoice.seller? invoice.seller.zip : ""},
                    <br/>
                    <strong>Země: </strong>
                    {invoice.seller? invoice.seller.country : ""}
                </p>
                <p>
                    <strong>Kupující:</strong>
                    <br/>
                    <strong>{invoice.buyer? invoice.buyer.name : ""}</strong>
                    <br/>
                    <strong>Ičo: </strong> 
                    {invoice.buyer? invoice.buyer.identificationNumber : ""},
                    <br/>
                    <strong>Sídlo: </strong>
                    {invoice.buyer? invoice.buyer.street : ""},
                    {invoice.buyer? invoice.buyer.city : ""},
                    {invoice.buyer? invoice.buyer.zip : ""},
                    <br/>
                    <strong>Země: </strong>
                    {invoice.buyer? invoice.buyer.country : ""}
                </p>
                <p>
                    <strong>Vystavené:</strong>
                    <br/>
                    {invoice.issued}
                </p>
                <p>
                    <strong>Splatné:</strong>
                    <br/>
                    {invoice.dueDate}
                </p>
                <p>
                    <strong>Cena:</strong>
                    <br/>
                    {invoice.price}                
                </p>
                <p>
                    <strong>DPH:</strong>
                    <br/>
                    {invoice.vat}                
                </p>
                <p>
                    <strong>Poznámka:</strong>
                    <br/>
                    {invoice.note}
                </p>
            </div>
        </>
    );
};

export default InvoiceDetail;