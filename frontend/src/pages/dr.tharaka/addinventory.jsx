import React from 'react';
import DrTharakaNavbar from '../../components/layout/DrTharakaNavbar';
import StockEntryForm from '../../components/forms/StockEntryForm';

export default function AddInventoryStockPage() {
  return (
    <div className="min-h-screen bg-hospital-bg font-sans text-hospital-text pb-12">
      <DrTharakaNavbar />
      <main className="p-4 sm:p-8 max-w-7xl mx-auto">
        <StockEntryForm title="Inventory Store Stock Entry" />
      </main>
    </div>
  );
}
