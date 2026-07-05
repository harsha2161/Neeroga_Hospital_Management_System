import React from 'react';
import { FiTrendingUp, FiActivity, FiPackage, FiDollarSign, FiPrinter } from 'react-icons/fi';
import DrTharakaNavbar from '../../components/layout/DrTharakaNavbar';

// Combined Mock Data for all Issued Items (Drugs + Inventory)
const issuedItems = [
  { id: 'ISS-001', date: '2026-06-26 10:15 AM', type: 'Drug', item: 'Insulin Injection', category: 'Injections', department: 'ICU', qty: 10, unitPrice: 1500.00 },
  { id: 'ISS-002', date: '2026-06-25 02:20 PM', type: 'Drug', item: 'Cough Syrup', category: 'Syrups', department: 'Emergency', qty: 20, unitPrice: 450.00 },
  { id: 'ISS-003', date: '2026-06-26 10:15 AM', type: 'Inventory', item: 'Syringes 5ml', category: 'Equipment', department: 'ICU', qty: 100, unitPrice: 25.00 },
  { id: 'ISS-004', date: '2026-06-24 09:10 AM', type: 'Drug', item: 'Amoxicillin 250mg', category: 'Tablets', department: 'Ward 1', qty: 50, unitPrice: 15.00 },
  { id: 'ISS-005', date: '2026-06-23 11:30 AM', type: 'Inventory', item: 'Surgical Masks (Box)', category: 'General', department: 'OPD', qty: 10, unitPrice: 1200.00 },
];

const totalIssuedQty = issuedItems.reduce((acc, curr) => acc + curr.qty, 0);
const totalPriceValue = issuedItems.reduce((acc, curr) => acc + (curr.qty * curr.unitPrice), 0);

const formatCurrency = (amount) => {
  return 'Rs. ' + amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
};

export default function StoreSummaryPage() {
  return (
    <div className="min-h-screen bg-hospital-bg font-sans text-hospital-text pb-12">
      <DrTharakaNavbar />

      <main className="p-4 sm:p-8 max-w-[1400px] mx-auto animate-fade-in">

        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-hospital-primary tracking-tight">Drugs & Inventory Summary</h1>
            <p className="text-slate-500 font-medium mt-1">Overview of all issued stocks and financial values</p>
          </div>
          <button
            onClick={() => window.print()}
            className="print:hidden flex items-center gap-2 px-6 py-3 bg-slate-800 text-white rounded-xl shadow-lg hover:bg-slate-900 font-bold transition-all transform hover:scale-105"
          >
            <FiPrinter /> Print Issued Report
          </button>
        </div>

        {/* Top KPI Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">

          {/* Card 1: Total Value Issued */}
          <div className="bg-gradient-to-br from-hospital-primary to-blue-700 rounded-2xl p-6 md:p-8 text-white shadow-xl relative overflow-hidden group">
            <div className="absolute -right-6 -top-6 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500"></div>
            <div className="flex justify-between items-start mb-4 relative z-10">
              <div>
                <p className="text-blue-100 font-bold text-sm uppercase tracking-wider mb-2">Total Value of Issued Items</p>
                <h3 className="text-4xl md:text-5xl font-black">{formatCurrency(totalPriceValue)}</h3>
              </div>
              <div className="p-4 bg-white/20 rounded-2xl">
                <FiDollarSign className="w-8 h-8" />
              </div>
            </div>
          </div>

          {/* Card 2: Total Quantity Issued */}
          <div className="bg-gradient-to-br from-hospital-accent to-teal-700 rounded-2xl p-6 md:p-8 text-white shadow-xl relative overflow-hidden group">
            <div className="absolute -right-6 -top-6 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500"></div>
            <div className="flex justify-between items-start mb-4 relative z-10">
              <div>
                <p className="text-teal-100 font-bold text-sm uppercase tracking-wider mb-2">Total Issued Quantity</p>
                <h3 className="text-4xl md:text-5xl font-black">{totalIssuedQty.toLocaleString()} Items</h3>
              </div>
              <div className="p-4 bg-white/20 rounded-2xl">
                <FiTrendingUp className="w-8 h-8" />
              </div>
            </div>
          </div>
        </div>

        {/* Issued Items Table */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden print:shadow-none print:border-none">
          <div className="px-6 py-5 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
            <h2 className="text-xl font-black text-slate-800 flex items-center gap-2">
              <FiActivity className="text-hospital-accent print:hidden" />
              Detailed Report: All Issued Drugs & Inventory
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left whitespace-nowrap">
              <thead className="bg-white text-slate-500 font-bold uppercase text-xs tracking-wider border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4">ID / Date</th>
                  <th className="px-6 py-4">Type</th>
                  <th className="px-6 py-4">Item Details</th>
                  <th className="px-6 py-4">Department</th>
                  <th className="px-6 py-4 text-center">Qty Issued</th>
                  <th className="px-6 py-4 text-right">Unit Price</th>
                  <th className="px-6 py-4 text-right">Total Value</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {issuedItems.map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-bold text-slate-700">{item.id}</div>
                      <div className="text-xs text-slate-400 font-medium">{item.date}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${item.type === 'Drug' ? 'bg-blue-50 text-blue-600 border border-blue-200' : 'bg-purple-50 text-purple-600 border border-purple-200'
                        }`}>
                        {item.type}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-bold text-hospital-primary">{item.item}</div>
                      <div className="text-xs text-slate-500">{item.category}</div>
                    </td>
                    <td className="px-6 py-4 font-bold text-slate-700">{item.department}</td>
                    <td className="px-6 py-4 text-center font-black text-emerald-600 bg-emerald-50/50">
                      {item.qty}
                    </td>
                    <td className="px-6 py-4 text-right font-medium text-slate-500">
                      {formatCurrency(item.unitPrice)}
                    </td>
                    <td className="px-6 py-4 text-right font-black text-slate-800">
                      {formatCurrency(item.qty * item.unitPrice)}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="bg-slate-50 border-t-2 border-slate-200">
                <tr>
                  <td colSpan="4" className="px-6 py-4 text-right font-bold text-slate-600 uppercase tracking-wider text-xs">
                    Grand Totals:
                  </td>
                  <td className="px-6 py-4 text-center font-black text-emerald-700 text-base">
                    {totalIssuedQty}
                  </td>
                  <td></td>
                  <td className="px-6 py-4 text-right font-black text-hospital-primary text-base">
                    {formatCurrency(totalPriceValue)}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

      </main>
    </div>
  );
}
