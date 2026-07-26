import React, { useState } from 'react';
import { FiAlertTriangle, FiSearch, FiPackage } from 'react-icons/fi';
import NurseNav from '../../../components/layout/HNnavbar';

// Mock Data for low stocks grouped by theater
const lowStocksData = {
  "Operating Theater 1": [
    { id: 'ITM101', name: 'Surgical Masks', category: 'Equipment', currentStock: 50, reorderLevel: 200, status: 'Critical' },
    { id: 'ITM102', name: 'Propofol Injection', category: 'Drugs', currentStock: 12, reorderLevel: 50, status: 'Low' },
  ],
  "Operating Theater 2": [
    { id: 'ITM103', name: 'Gauze Pads (Sterile)', category: 'Equipment', currentStock: 25, reorderLevel: 100, status: 'Critical' },
    { id: 'ITM104', name: 'Fentanyl Ampoules', category: 'Drugs', currentStock: 8, reorderLevel: 30, status: 'Critical' },
    { id: 'ITM105', name: 'Surgical Sutures', category: 'Equipment', currentStock: 45, reorderLevel: 150, status: 'Low' },
  ],
  "ICU": [
    { id: 'ITM106', name: 'Epinephrine Injection', category: 'Drugs', currentStock: 5, reorderLevel: 40, status: 'Critical' },
    { id: 'ITM107', name: 'IV Fluids (Normal Saline)', category: 'Drugs', currentStock: 30, reorderLevel: 150, status: 'Low' },
  ],
  "Emergency Ward": [
    { id: 'ITM108', name: 'Bandages', category: 'Equipment', currentStock: 60, reorderLevel: 200, status: 'Low' },
  ],
  "General Ward A": [] // Empty array for empty state testing
};

export default function LowStocksTheaters() {
  const [searchTerm, setSearchTerm] = useState('');

  // Filter theaters based on search
  const filteredTheaters = Object.keys(lowStocksData).filter(theater =>
    theater.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 pb-12">
      <NurseNav />

      <main className="max-w-7xl mx-auto mt-8 px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <FiAlertTriangle className="text-amber-500 w-6 h-6" />
              Low Stock Alerts
            </h2>
            <p className="text-sm text-slate-500 mt-1">Monitor critical and low stock levels across all departments.</p>
          </div>
          
          <div className="relative w-full md:w-80">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="text-slate-400" />
            </div>
            <input
              type="text"
              placeholder="Search theaters..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 text-sm shadow-sm transition-all bg-white"
            />
          </div>
        </div>

        {/* Dashboard Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredTheaters.map((theaterName) => {
            const items = lowStocksData[theaterName];
            const hasItems = items.length > 0;
            const criticalCount = items.filter(i => i.status === 'Critical').length;
            
            return (
              <div key={theaterName} className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col h-full hover:shadow-md transition-shadow">
                
                {/* Card Header */}
                <div className={`px-5 py-4 border-b ${criticalCount > 0 ? 'bg-red-50/50 border-red-100' : 'bg-slate-50/50 border-slate-100'} flex items-center justify-between`}>
                  <h3 className="text-lg font-bold text-slate-800">{theaterName}</h3>
                  <div className="flex gap-2">
                    {criticalCount > 0 && (
                      <span className="bg-red-100 text-red-700 text-xs font-bold px-2.5 py-1 rounded-full shadow-sm flex items-center gap-1">
                        <FiAlertTriangle className="w-3 h-3" />
                        {criticalCount} Critical
                      </span>
                    )}
                    <span className="bg-amber-100 text-amber-700 text-xs font-bold px-2.5 py-1 rounded-full shadow-sm flex items-center gap-1">
                      {items.length} Total
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-5 flex-grow">
                  {!hasItems ? (
                    <div className="h-32 flex flex-col items-center justify-center text-slate-400">
                      <FiPackage className="w-8 h-8 mb-2 opacity-50" />
                      <p className="text-sm font-medium">Stock levels are optimal.</p>
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-sm whitespace-nowrap">
                        <thead>
                          <tr className="text-slate-500 border-b border-slate-100">
                            <th className="pb-3 font-semibold w-1/2">Item Name</th>
                            <th className="pb-3 font-semibold text-right">Current</th>
                            <th className="pb-3 font-semibold text-right">Reorder Lvl</th>
                            <th className="pb-3 font-semibold text-center pl-4">Status</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                          {items.map((item) => (
                            <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                              <td className="py-3 text-slate-800">
                                <p className="font-medium truncate max-w-[180px]" title={item.name}>{item.name}</p>
                                <p className="text-xs text-slate-400">{item.id} • {item.category}</p>
                              </td>
                              <td className="py-3 text-right font-medium text-slate-700">
                                {item.currentStock}
                              </td>
                              <td className="py-3 text-right text-slate-500">
                                {item.reorderLevel}
                              </td>
                              <td className="py-3 pl-4 text-center">
                                <span className={`inline-flex items-center justify-center px-2 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider
                                  ${item.status === 'Critical' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'}
                                `}>
                                  {item.status}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
                
                {/* Card Footer */}
                {hasItems && (
                  <div className="bg-slate-50 border-t border-slate-100 p-3 flex justify-end">
                    <button className="text-sm text-blue-600 font-medium hover:text-blue-700 transition-colors flex items-center gap-1">
                      Action required <span aria-hidden="true">&rarr;</span>
                    </button>
                  </div>
                )}
                
              </div>
            );
          })}
        </div>

        {filteredTheaters.length === 0 && (
           <div className="text-center py-20">
             <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 mb-4">
               <FiSearch className="w-6 h-6 text-slate-400" />
             </div>
             <h3 className="text-lg font-medium text-slate-900 mb-1">No theaters found</h3>
             <p className="text-slate-500">We couldn't find any theaters matching "{searchTerm}"</p>
           </div>
        )}

      </main>
    </div>
  );
}
