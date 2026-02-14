/*  _____ _______         _                      _
 * |_   _|__   __|       | |                    | |
 *   | |    | |_ __   ___| |___      _____  _ __| | __  ___ ____
 *   | |    | | '_ \ / _ \ __\ \ /\ / / _ \| '__| |/ / / __|_  /
 *  _| |_   | | | | |  __/ |_ \ V  V / (_) | |  |   < | (__ / /
 * |_____|  |_|_| |_|\___|\__| \_/\_/ \___/|_|  |_|\_(_)___/___|
 *                                _
 *              ___ ___ ___ _____|_|_ _ _____
 *             | . |  _| -_|     | | | |     |  LICENCE
 *             |  _|_| |___|_|_|_|_|___|_|_|_|
 *             |_|
 *
 *   PROGRAMOVÁNÍ  <>  DESIGN  <>  PRÁCE/PODNIKÁNÍ  <>  HW A SW
 *
 * Tento zdrojový kód je součástí výukových seriálů na
 * IT sociální síti WWW.ITNETWORK.CZ
 *
 * Kód spadá pod licenci prémiového obsahu a vznikl díky podpoře
 * našich členů. Je určen pouze pro osobní užití a nesmí být šířen.
 * Více informací na http://www.itnetwork.cz/licence
 */

import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  BrowserRouter as Router,
  Link,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import PersonIndex from "./persons/PersonIndex";
import PersonDetail from "./persons/PersonDetail";
import PersonForm from "./persons/PersonForm";
import InvoiceIndex from "./invoices/InvoiceIndex";
import InvoiceDetail from "./invoices/InvoiceDetail";
import InvoiceForm from "./invoices/InvoiceForm";
import StatisticIndex from "./statistics/StatisticIndex";
import PersonStatisticIndex from "./statistics/PersonStatisticIndex";
import InvoiceSearch from "./invoices/InvoiceSearch";
import PersonSearch from "./persons/PersonSearch";
import InvoiceSales from "./invoices/InvoiceSales";
import InvoicePurchases from "./invoices/InvoicePurchases";
import Footer from "./components/Footer";

export function App() {
  return (
    <Router>
      <div className="d-flex min-vh-100">

        {/* LEVÁ NAVIGACE */}
        <aside className="bg-light border-end" style={{ width: "250px" }}>
          <div className="p-3">
            <h5>Menu</h5>
            <ul className="nav flex-column">
              <li className="nav-item">
                <Link to="/persons" className="nav-link">Osoby</Link>
              </li>
              <li className="nav-item">
                <Link to="/invoices" className="nav-link">Faktury</Link>
              </li>
              <li className="nav-item">
                <Link to="/invoices/search" className="nav-link">Vyhledávání faktur</Link>
              </li>
              <li className="nav-item">
                <Link to="/persons/search" className="nav-link">Vyhledávání osob</Link>
              </li>
              <li className="nav-item">
                <Link to="/api/statistics/invoices/" className="nav-link">
                  Statistiky faktur
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/api/statistics/persons/" className="nav-link">
                  Statistiky osob
                </Link>
              </li>
            </ul>
          </div>
        </aside>

        {/* PRAVÁ ČÁST – OBSAH + FOOTER */}
        <div className="d-flex flex-column flex-grow-1">

          {/* HLAVNÍ OBSAH */}
          <main className="container flex-grow-1 mt-4">
            <Routes>
              <Route index element={<Navigate to="/persons" />} />

              <Route path="/persons">
                <Route index element={<PersonIndex />} />
                <Route path="show/:id" element={<PersonDetail />} />
                <Route path="create" element={<PersonForm />} />
                <Route path="edit/:id" element={<PersonForm />} />
              </Route>

              <Route path="/invoices">
                <Route index element={<InvoiceIndex />} />
                <Route path="show/:id" element={<InvoiceDetail />} />
                <Route path="create" element={<InvoiceForm />} />
                <Route path="edit/:id" element={<InvoiceForm />} />
              </Route>

              <Route path="/invoices/search" element={<InvoiceSearch />} />
              <Route path="/persons/search" element={<PersonSearch />} />
              <Route path="/persons/:ico/sales" element={<InvoiceSales />} />
              <Route path="/persons/:ico/purchases" element={<InvoicePurchases />} />

              <Route path="/api/statistics/invoices/" element={<StatisticIndex />} />
              <Route path="/api/statistics/persons/" element={<PersonStatisticIndex />} />
            </Routes>
          </main>

          {/* FOOTER */}
          <Footer />

        </div>
      </div>
    </Router>
  );
}

export default App;