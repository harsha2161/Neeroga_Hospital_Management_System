import React, { useState } from 'react';
import { FiSearch, FiFilter, FiCheckCircle, FiClock, FiEdit2, FiSend } from 'react-icons/fi';

export default function DistributingTable({ data, title }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [distributions, setDistributions] = useState(data || []);
  const [editRowId, setEditRowId] = useState(null);
  const [editQty, setEditQty] = useState(0);

  const handleStatusChange = (id, newStatus) => {
    setDistributions(prev => prev.map(req => {
      if (req.id === id) {
        let actualIssued = req.actualIssued;
        let balanceNeeded = req.balanceNeeded;
        if (newStatus === 'Issued' && req.status !== 'Issued') {
          actualIssued = req.qtyRequested;
          balanceNeeded = 0;
        } else if (newStatus === 'Pending' && req.status !== 'Pending') {
          actualIssued = 0;
          balanceNeeded = req.qtyRequested;
        }
        return { ...req, status: newStatus, actualIssued, balanceNeeded };
      }
      return req;
    }));
  };

  const handleEditClick = (req) => {
    setEditRowId(req.id);
    setEditQty(req.actualIssued);
  };

  const handleSaveClick = (req) => {
    const parsedQty = parseInt(editQty, 10) || 0;
    setDistributions(prev => prev.map(item => {
      if (item.id === req.id) {
        const newBalance = Math.max(0, item.qtyRequested - parsedQty);
        return {
          ...item,
          actualIssued: parsedQty,
          balanceNeeded: newBalance,
          status: newBalance === 0 ? 'Issued' : 'Pending'
        };
      }
      return item;
    }));
    setEditRowId(null);
  };

  // Filter data based on search
  const filteredData = distributions.filter(req =>
    req.section.toLowerCase().includes(searchTerm.toLowerCase()) ||
    req.item.toLowerCase().includes(searchTerm.toLowerCase()) ||
    req.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className="p-4 sm:p-8 max-w-[1400px] mx-auto animate-fade-in">

      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-hospital-primary tracking-tight">{title} Distribution</h1>
          <p className="text-slate-500 font-medium mt-1">Manage requested items and manual dispatches</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search requests..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-hospital-primary outline-none text-slate-700 bg-white shadow-sm w-64"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-xl shadow-sm hover:bg-slate-50 font-bold text-slate-700 transition-colors">
            <FiFilter /> Filter
          </button>
        </div>
      </div>

      {/* Top Section: Distribution Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden mb-12">
        <div className="px-6 py-4 border-b border-slate-200 bg-slate-50">
          <h2 className="text-lg font-bold text-slate-800">Requested Items</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left whitespace-nowrap">
            <thead className="bg-white text-slate-500 font-bold uppercase text-xs tracking-wider border-b border-slate-200">
              <tr>
                <th className="px-6 py-4">Timestamp</th>
                <th className="px-6 py-4">Requesting Section</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Item Name</th>
                <th className="px-6 py-4 text-center">Qty Requested</th>
                <th className="px-6 py-4 text-center">Status</th>
                <th className="px-6 py-4 text-center">Store Availability</th>
                <th className="px-6 py-4 text-center">Actual Qty Issued</th>
                <th className="px-6 py-4 text-center">Balance Needed</th>
                <th className="px-6 py-4 text-center">Update</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredData.map((req) => (
                <tr key={req.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 text-slate-500 font-medium text-xs">{req.timestamp}</td>
                  <td className="px-6 py-4 font-bold text-slate-700">{req.section}</td>
                  <td className="px-6 py-4 text-slate-500">{req.category}</td>
                  <td className="px-6 py-4 font-bold text-hospital-primary">{req.item}</td>
                  <td className="px-6 py-4 text-center font-black text-slate-800">{req.qtyRequested}</td>

                  {/* Editable Status */}
                  <td className="px-6 py-4 text-center">
                    <select
                      value={req.status}
                      onChange={(e) => handleStatusChange(req.id, e.target.value)}
                      className={`inline-flex items-center outline-none cursor-pointer gap-1.5 pl-3 pr-8 py-1 rounded-full text-xs font-bold border transition-colors appearance-none ${req.status === 'Issued'
                        ? 'bg-green-50 text-green-700 border-green-200 hover:bg-green-100'
                        : 'bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100'
                        }`}
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                        backgroundPosition: `right 0.25rem center`,
                        backgroundRepeat: `no-repeat`,
                        backgroundSize: `1.5em 1.5em`
                      }}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Issued">Issued</option>
                    </select>
                  </td>

                  {/* Store Availability */}
                  <td className="px-6 py-4 text-center font-bold">
                    <span className={req.storeAvailability < req.balanceNeeded ? 'text-red-500' : 'text-slate-600'}>
                      {req.storeAvailability}
                    </span>
                  </td>

                  {/* Actual Issued */}
                  <td className="px-6 py-4 text-center font-bold text-emerald-600">
                    {editRowId === req.id ? (
                      <input
                        type="number"
                        min="0"
                        value={editQty}
                        onChange={(e) => setEditQty(e.target.value)}
                        className="w-20 px-2 py-1 rounded border border-slate-300 focus:ring-2 focus:ring-hospital-primary outline-none text-center shadow-inner bg-slate-50"
                      />
                    ) : (
                      req.actualIssued
                    )}
                  </td>

                  {/* Balance Needed */}
                  <td className="px-6 py-4 text-center font-bold">
                    <span className={req.balanceNeeded > 0 ? 'text-orange-500' : 'text-slate-400'}>
                      {req.balanceNeeded}
                    </span>
                  </td>

                  {/* Update Action */}
                  <td className="px-6 py-4 text-center">
                    {editRowId === req.id ? (
                      <button
                        onClick={() => handleSaveClick(req)}
                        className="px-3 py-1.5 rounded-lg border font-bold text-xs transition-all shadow-sm uppercase tracking-wide flex items-center gap-1.5 mx-auto bg-green-500 text-white border-green-500 hover:bg-green-600 hover:shadow-md"
                      >
                        <FiCheckCircle className="w-3.5 h-3.5" /> Save
                      </button>
                    ) : (
                      <button
                        onClick={() => handleEditClick(req)}
                        className={`px-3 py-1.5 rounded-lg border font-bold text-xs transition-all shadow-sm uppercase tracking-wide flex items-center gap-1.5 mx-auto ${req.status === 'Pending'
                          ? 'bg-hospital-primary text-white border-hospital-primary hover:bg-blue-700 hover:shadow-md'
                          : 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed'
                          }`}
                        disabled={req.status === 'Issued'}
                        title="Update Distribution"
                      >
                        <FiEdit2 className="w-3.5 h-3.5" /> Update
                      </button>
                    )}
                  </td>
                </tr>
              ))}

              {filteredData.length === 0 && (
                <tr>
                  <td colSpan="10" className="px-6 py-12 text-center text-slate-400 font-medium text-base">
                    No distribution requests found matching "{searchTerm}".
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Bottom Section: Manual Dispatch Form */}
      <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 sm:p-8">
        <h2 className="text-xl font-black text-hospital-text mb-6 uppercase tracking-wide border-b border-slate-100 pb-4">
          Manual {title} Dispatch
        </h2>

        <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); alert('Manual dispatch sent successfully!'); }}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            {/* Target Section */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Target Section / Department</label>
              <select className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-hospital-primary outline-none text-slate-700 bg-slate-50 focus:bg-white transition-all text-sm font-medium">
                <option value="">Select Target...</option>
                <option value="OPD">OPD</option>
                <option value="Theater">Theater</option>
                <option value="ICU">ICU</option>
                <option value="Ward 1">Ward 1</option>
                <option value="Emergency">Emergency</option>
              </select>
            </div>

            {/* Item Category */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Category</label>
              <select className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-hospital-primary outline-none text-slate-700 bg-slate-50 focus:bg-white transition-all text-sm font-medium">
                <option value="">Select Category...</option>
                <option value="Tablets">Tablets</option>
                <option value="Syrups">Syrups</option>
                <option value="Injections">Injections</option>
                <option value="Equipment">Equipment</option>
              </select>
            </div>

            {/* Item Name */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Item Name</label>
              <input
                type="text"
                placeholder="Search or enter item name..."
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-hospital-primary outline-none text-slate-700 bg-slate-50 focus:bg-white transition-all text-sm font-medium"
              />
            </div>

            {/* Quantity */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Quantity to Send</label>
              <input
                type="number"
                min="1"
                placeholder="Enter quantity"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-hospital-primary outline-none text-slate-700 bg-slate-50 focus:bg-white transition-all text-sm font-medium"
              />
            </div>

            {/* Date */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Date of Dispatch</label>
              <input
                type="date"
                defaultValue={new Date().toISOString().split('T')[0]}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-hospital-primary outline-none text-slate-700 bg-slate-50 focus:bg-white transition-all text-sm font-medium"
              />
            </div>

          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Additional Notes (Optional)</label>
            <textarea
              rows="3"
              placeholder="Any special instructions or reasons for manual dispatch..."
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-hospital-primary outline-none text-slate-700 bg-slate-50 focus:bg-white transition-all text-sm font-medium"
            ></textarea>
          </div>

          <div className="flex justify-end pt-4 border-t border-slate-100">
            <button
              type="submit"
              className="flex items-center gap-2 px-8 py-3 bg-hospital-accent text-white rounded-xl shadow-md hover:bg-teal-700 hover:shadow-lg font-bold transition-all uppercase tracking-wide text-sm"
            >
              <FiSend className="w-4 h-4" /> Dispatch {title}
            </button>
          </div>
        </form>
      </div>

    </main>
  );
}