import React, { useState } from 'react';
import { FiSearch, FiFilter, FiDownload, FiAlertCircle } from 'react-icons/fi';
import DrTharakaNavbar from '../../components/layout/DrTharakaNavbar';

export default function StockViewTable({ data, name, title }) {
  const [searchTerm, setSearchTerm] = useState('');

  const masterStock = data;
  const displayName = name || title;

  // 1. Filter by search term
  let filteredData = masterStock.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 2. Sort: Less than 50 qty first
  filteredData.sort((a, b) => {
    const aIsLow = a.qty < 50;
    const bIsLow = b.qty < 50;

    if (aIsLow && !bIsLow) return -1;
    if (!aIsLow && bIsLow) return 1;
    return 0; // Keep original order otherwise
  });

  return (
    <div className="min-h-screen bg-hospital-bg font-sans text-hospital-text pb-12">


      <main className="p-4 sm:p-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4 print:hidden">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-hospital-primary tracking-tight">Master {displayName}</h1>
            <p className="text-slate-500 font-medium mt-1">View and manage all hospital stocks</p>
          </div>


        </div>

        {/* Search Bar */}
        <div className="bg-white rounded-t-2xl border border-slate-200 p-5 flex items-center justify-between print:hidden">
          <div className="relative w-full max-w-lg">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by Item ID, Name, or Category..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 focus:border-hospital-primary focus:ring-2 focus:ring-hospital-primary/20 outline-none text-slate-700 bg-slate-50 focus:bg-white transition-all text-sm font-medium"
            />
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => window.print()}
              className="flex items-center gap-2 px-4 py-2.5 bg-hospital-accent text-white rounded-xl shadow-sm hover:bg-teal-700 font-bold transition-colors text-sm"
            >
              <FiDownload /> Export Data
            </button>
          </div>

        </div>

        {/* Table */}
        <div className="bg-white border-x border-b border-slate-200 rounded-b-2xl shadow-sm overflow-hidden print:border-none print:shadow-none print:rounded-none">
          <h2 className="hidden print:block text-2xl font-black text-slate-800 mb-6 uppercase tracking-wider text-center border-b-2 border-slate-800 pb-2">Neeroga Healthcare - Master Inventory Report</h2>
          <div className="overflow-x-auto print:overflow-visible">
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-xs tracking-wider border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4">Item ID</th>
                  <th className="px-6 py-4">Item Name</th>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4 text-center">Stock Qty</th>
                  <th className="px-6 py-4 text-right">Unit Price</th>
                  <th className="px-6 py-4">Expiry Date</th>
                  <th className="px-6 py-4 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredData.map((item) => {
                  const isLowStock = item.qty < 50;
                  return (
                    <tr key={item.id} className={`hover:bg-slate-50 transition-colors ${isLowStock ? 'bg-red-50/20' : ''}`}>
                      <td className="px-6 py-4 font-bold text-slate-600">{item.id}</td>
                      <td className="px-6 py-4 font-bold text-hospital-primary">{item.name}</td>
                      <td className="px-6 py-4 font-semibold text-slate-500">{item.category}</td>
                      <td className="px-6 py-4 text-center">
                        <span className={`font-black text-base px-3 py-1 rounded-lg ${isLowStock ? 'bg-red-100 text-red-600' : 'text-slate-700'}`}>
                          {item.qty}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right font-bold text-slate-500">Rs. {item.price.toFixed(2)}</td>
                      <td className="px-6 py-4 text-slate-500 font-medium">{item.expiry}</td>
                      <td className="px-6 py-4 text-center">
                        {isLowStock ? (
                          <span className="inline-flex items-center justify-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-red-100 text-red-700 border border-red-200 w-28">
                            <FiAlertCircle className="w-3.5 h-3.5" /> Low Stock
                          </span>
                        ) : (
                          <span className="inline-flex items-center justify-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-green-50 text-green-600 border border-green-200 w-28">
                            Good
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
                {filteredData.length === 0 && (
                  <tr>
                    <td colSpan="7" className="px-6 py-12 text-center text-slate-400 font-medium text-base">
                      No items found matching "{searchTerm}".
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </main>
    </div>
  );
}
