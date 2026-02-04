import React, {useEffect, useState} from "react";

import {apiDelete, apiGet} from "../utils/api";

import StatisticTable from "./invoiceStatisticTable";

const StatisticIndex = () => {
    const [statistics, setStatistics] = useState([]);

    useEffect(() => {
        apiGet("/api/statistics/invoices/").then((data) => setStatistics(data));
    }, []);
    console.log(statistics);
    return (
        <div>
            <h1>Seznam statistik</h1>
            <StatisticTable
                
                result={statistics}
                
            />
        </div>
    );
};
export default StatisticIndex;