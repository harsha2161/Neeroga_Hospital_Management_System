import React, { useState } from 'react';
import { FiSearch, FiFilter, FiDownload, FiAlertCircle } from 'react-icons/fi';
import DrTharakaNavbar from '../../components/layout/DrTharakaNavbar';
import StockViewTable from '../../components/table/StockViewTable';

// Mock Master Inventory Data
const masterStock = [
  { id: 'ITM001', category: 'Tablets', name: 'Panadol 500mg', qty: 1500, price: 5.00, expiry: '2027-10-15' },
  { id: 'ITM002', category: 'Tablets', name: 'Amoxicillin 250mg', qty: 30, price: 15.00, expiry: '2026-11-20' },
  { id: 'ITM003', category: 'Syrups', name: 'Cough Syrup', qty: 120, price: 350.00, expiry: '2026-08-05' },
  { id: 'ITM004', category: 'Injections', name: 'Insulin Injection', qty: 15, price: 1200.00, expiry: '2026-09-12' },
  { id: 'ITM005', category: 'Equipment', name: 'Surgical Gloves', qty: 45, price: 45.00, expiry: '-' },
  { id: 'ITM006', category: 'Tablets', name: 'Vitamin C', qty: 300, price: 10.00, expiry: '2028-01-01' },
  { id: 'ITM007', category: 'Injections', name: 'Tetanus Toxoid', qty: 85, price: 450.00, expiry: '2027-03-10' },
  { id: 'ITM008', category: 'Equipment', name: 'Syringes 5ml', qty: 25, price: 15.00, expiry: '-' },
  { id: 'ITM009', category: 'Syrups', name: 'Paracetamol Syrup', qty: 80, price: 250.00, expiry: '2026-05-10' },
];


export default function ViewDrugsStocks() {

  return (
    <div className="min-h-screen bg-hospital-bg font-sans text-hospital-text pb-12">
      <DrTharakaNavbar />

      <StockViewTable data={masterStock} name={"Drugs stocks"} />



    </div>
  );
}
