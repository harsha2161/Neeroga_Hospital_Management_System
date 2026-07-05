import React, { useState, useMemo } from 'react';
import { FiActivity, FiDollarSign, FiPrinter, FiLayers, FiFilter, FiPackage } from 'react-icons/fi';
import DrTharakaNavbar from '../layout/DrTharakaNavbar';

const formatCurrency = (amount) => {
  return 'Rs. ' + amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
};

export default function SummaryDashboard({ title, issuedItems }) {
  const [filterDept, setFilterDept] = useState('');
  const [filterCat, setFilterCat] = useState('');

  const uniqueDepartments = useMemo(() => [...new Set(issuedItems.map(i => i.department))], [issuedItems]);
  const uniqueCategories = useMemo(() => [...new Set(issuedItems.map(i => i.category))], [issuedItems]);

  const filteredItems = useMemo(() => {
    return issuedItems.filter(item => {
      const matchDept = filterDept === '' || item.department === filterDept;
      const matchCat = filterCat === '' || item.category === filterCat;
      return matchDept && matchCat;
    });
  }, [issuedItems, filterDept, filterCat]);

  const totalFilteredQty = filteredItems.reduce((acc, curr) => acc + curr.qty, 0);
  const totalFilteredValue = filteredItems.reduce((acc, curr) => acc + (curr.qty * curr.unitPrice), 0);
  const uniqueItemCount = useMemo(() => new Set(filteredItems.map(i => i.item)).size, [filteredItems]);
  const recordCount = filteredItems.length;

  // High-level overall KPI totals (unfiltered)
  const totalIssuedQty = issuedItems.reduce((acc, curr) => acc + curr.qty, 0);
  const totalPriceValue = issuedItems.reduce((acc, curr) => acc + (curr.qty * curr.unitPrice), 0);

  return (
    <div className="min-h-screen bg-hospital-bg font-sans text-hospital-text pb-12">
      <DrTharakaNavbar />

      <main className="p-4 sm:p-8 max-w-[1400px] mx-auto animate-fade-in">

        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-hospital-primary tracking-tight">{title} Summary</h1>
            <p className="text-slate-500 font-medium mt-1">Overview of all issued {title.toLowerCase()} and financial values</p>
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
                <p className="text-blue-100 font-bold text-sm uppercase tracking-wider mb-2">
                  {filterDept ? `Total Issued Value (${filterDept})` : 'Total Value of Issued Items'}
                </p>
                <h3 className="text-4xl md:text-5xl font-black">{formatCurrency(totalFilteredValue)}</h3>
              </div>
              <div className="p-4 bg-white/20 rounded-2xl">
                <FiDollarSign className="w-8 h-8" />
              </div>
            </div>
          </div>

          {/* Card 2: Distributions Processed */}
          <div className="bg-gradient-to-br from-hospital-accent to-teal-700 rounded-2xl p-6 md:p-8 text-white shadow-xl relative overflow-hidden group">
            <div className="absolute -right-6 -top-6 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500"></div>
            <div className="flex justify-between items-start mb-4 relative z-10">
              <div>
                <p className="text-teal-100 font-bold text-sm uppercase tracking-wider mb-2">Distributions Processed</p>
                <div className="flex items-baseline gap-2">
                  <h3 className="text-4xl md:text-5xl font-black">{recordCount}</h3>
                  <span className="text-lg text-teal-100 font-bold tracking-wide">Records</span>
                </div>
                <p className="mt-2 text-sm text-teal-50 font-medium">Covering <span className="font-bold text-white">{uniqueItemCount}</span> unique item{uniqueItemCount !== 1 ? 's' : ''}</p>
              </div>
              <div className="p-4 bg-white/20 rounded-2xl">
                <FiPackage className="w-8 h-8" />
              </div>
            </div>
          </div>
        </div>

        {/* Issued Items Table */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden print:shadow-none print:border-none mt-8">
          <div className="px-6 py-5 border-b border-slate-200 bg-slate-50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h2 className="text-xl font-black text-slate-800 flex items-center gap-2">
              <FiActivity className="text-hospital-accent print:hidden" />
              Detailed Report: All Issued {title}
            </h2>

            {/* Filters */}
            <div className="flex items-center gap-3 print:hidden">
              <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg border border-slate-300 shadow-sm">
                <FiFilter className="text-slate-400" />
                <select
                  className="bg-transparent text-sm font-bold text-slate-700 outline-none appearance-none cursor-pointer pr-4"
                  value={filterDept}
                  onChange={(e) => setFilterDept(e.target.value)}
                >
                  <option value="">All Departments</option>
                  {uniqueDepartments.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>
              <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg border border-slate-300 shadow-sm">
                <FiFilter className="text-slate-400" />
                <select
                  className="bg-transparent text-sm font-bold text-slate-700 outline-none appearance-none cursor-pointer pr-4"
                  value={filterCat}
                  onChange={(e) => setFilterCat(e.target.value)}
                >
                  <option value="">All Categories</option>
                  {uniqueCategories.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left whitespace-nowrap">
              <thead className="bg-white text-slate-500 font-bold uppercase text-xs tracking-wider border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4">ID / Date</th>
                  <th className="px-6 py-4">Item Details</th>
                  <th className="px-6 py-4">Department</th>
                  <th className="px-6 py-4 text-center">Qty Issued</th>
                  <th className="px-6 py-4 text-right">Unit Price</th>
                  <th className="px-6 py-4 text-right">Total Value</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredItems.map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-bold text-slate-700">{item.id}</div>
                      <div className="text-xs text-slate-400 font-medium">{item.date}</div>
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

                {filteredItems.length === 0 && (
                  <tr>
                    <td colSpan="6" className="px-6 py-8 text-center text-slate-400 font-medium">
                      No issued items match the selected filters.
                    </td>
                  </tr>
                )}
              </tbody>
              <tfoot className="bg-slate-50 border-t-2 border-slate-200">
                <tr>
                  <td colSpan="3" className="px-6 py-4 text-right font-bold text-slate-600 uppercase tracking-wider text-xs">
                    Grand Totals:
                  </td>
                  <td className="px-6 py-4 text-center font-black text-emerald-700 text-base">
                    {totalFilteredQty}
                  </td>
                  <td></td>
                  <td className="px-6 py-4 text-right font-black text-hospital-primary text-base">
                    {formatCurrency(totalFilteredValue)}
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
