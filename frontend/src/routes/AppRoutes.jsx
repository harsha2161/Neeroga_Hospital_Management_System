import { Routes, Route } from "react-router-dom";
import Login from "../pages/auth/login";
import DrTharakaDashboard from "../pages/dr.tharaka/drTharakaDashbourd";
import AddDrugsStockPage from "../pages/dr.tharaka/addstocks";
import AddInventoryStockPage from "../pages/dr.tharaka/addinventory";
import ViewInventoryStocks from "../pages/dr.tharaka/viewInventoryStocks";
import ViewDrugsStocks from "../pages/dr.tharaka/viewDrugsStocks";
import ManageUsers from "../pages/dr.tharaka/manageUsers";
import ManageDepartments from "../pages/dr.tharaka/manageDepartments";
import SummaryDrugsPage from "../pages/dr.tharaka/summaryDrugs";
import SummaryInventoryPage from "../pages/dr.tharaka/summaryInventory";
import DistributeDrugsPage from "../pages/dr.tharaka/distributeDrugs";
import DistributeInventoryPage from "../pages/dr.tharaka/distributeInventory";
import DMNDashbourd from "../pages/headNurse/drugsManageNurse/DMNDashbourd";
import NurseCreateOrder from "../pages/headNurse/drugsManageNurse/NurseCreateOrder";
import LowStocksTheaters from "../pages/headNurse/drugsManageNurse/LowStocksTheaters";
import DistributeDrugs from "../pages/headNurse/drugsManageNurse/DistributeDrugs";

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/*" element={<Login />} />
            <Route path="/login" element={<Login />} />

            <Route path="/dr.tharaka" element={<DrTharakaDashboard />} />
            <Route path="/dr.tharaka/add-drugs" element={<AddDrugsStockPage />} />
            <Route path="/dr.tharaka/add-inventory" element={<AddInventoryStockPage />} />
            <Route path="/dr.tharaka/view-inventory-stock" element={<ViewInventoryStocks />} />
            <Route path="/dr.tharaka/view-drugs-stock" element={<ViewDrugsStocks />} />
            <Route path="/dr.tharaka/manage-departments" element={<ManageDepartments />} />
            <Route path="/dr.tharaka/manage-users" element={<ManageUsers />} />
            <Route path="/dr.tharaka/summary-drugs" element={<SummaryDrugsPage />} />
            <Route path="/dr.tharaka/summary-inventory" element={<SummaryInventoryPage />} />
            <Route path="/dr.tharaka/distribute-drugs" element={<DistributeDrugsPage />} />
            <Route path="/dr.tharaka/distribute-inventory" element={<DistributeInventoryPage />} />

            <Route path="/hdm" element={<DMNDashbourd />} />
            <Route path="/hdm/dashbourd" element={<DMNDashbourd />} />
            <Route path="/hdm/create-order" element={<NurseCreateOrder />} />
            <Route path="/hdm/low-stocks" element={<LowStocksTheaters />} />
            <Route path="/hdm/distribute-drugs" element={<DistributeDrugs />} />

        </Routes>
    )
}