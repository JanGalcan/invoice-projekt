import InputField from "../components/InputField";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {apiGet} from "../utils/api";
import InvoiceTable from "../invoices/InvoiceTable";
import InputSelect from "../components/InputSelect";
import FlashMessage from "../components/FlashMessage";

import Country from "../persons/Country";
import PersonDetail from "../persons/PersonDetail";
import PersonForm from "../persons/PersonForm";
import React from "react";
import {Link} from "react-router-dom";

const StatisticTable = ({label, result}) => {
    return (
        <div>
            <p>
                {label} {result.length}
            </p>

            <table className="table table-bordered">
                <tbody>            
                <tr>
                    <td>Součet za aktuální rok</td>
                    <td>{result.currentYearSum}</td>
                </tr>
                <tr>
                    <td>Součet za všechny roky</td>
                    <td>{result.allTimeSum}</td>                   
                </tr>
                <tr>
                    <td>Počet faktur celkem</td>
                    <td>{result.invoicesCount}</td>
                </tr>
                <tr>
                    <td>Zadaný rok</td>
                    <td>{result.yearUsed}</td>
                </tr>
                </tbody>  
                
            </table>
        </div>
    );
};

export default StatisticTable;