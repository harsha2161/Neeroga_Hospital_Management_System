import React, { useState } from 'react';
import { FiAlertCircle, FiClock, FiCheckCircle, FiTrash2 } from 'react-icons/fi';
import NurseNav from "../../../components/layout/HNnavbar";

// Mock Data for Low Stocks
const lowStocksData = [
  { id: 'DRG001', name: 'Amoxicillin 250mg', category: 'Tablets', currentQty: 30, reorderLevel: 100, status: 'Critical' },
  { id: 'DRG002', name: 'Insulin Injection', category: 'Injections', currentQty: 15, reorderLevel: 50, status: 'Critical' },
  { id: 'DRG003', name: 'Cough Syrup', category: 'Syrups', currentQty: 120, reorderLevel: 150, status: 'Low' },
  { id: 'DRG004', name: 'Surgical Gloves', category: 'Equipment', currentQty: 45, reorderLevel: 200, status: 'Critical' },
];

// Mock Data for Pending Requests (Requested from Head Doctor, but not received)
const initialPendingRequestsData = [
  { requestId: 'REQ-1042', requestedDate: '2026-07-05', itemName: 'Paracetamol 500mg', requestedQty: 1000, urgency: 'Normal', status: 'Pending' },
  { requestId: 'REQ-1045', requestedDate: '2026-07-06', itemName: 'Propofol Injection', requestedQty: 50, urgency: 'Critical', status: 'Pending' },
  { requestId: 'REQ-1048', requestedDate: '2026-07-06', itemName: 'Fentanyl Ampoules', requestedQty: 30, urgency: 'Critical', status: 'Pending' },
];

const DMNDashbourd = () => {
    const [pendingRequests, setPendingRequests] = useState(initialPendingRequestsData);

    const handleRemoveRequest = (requestId) => {
        setPendingRequests(pendingRequests.filter(req => req.requestId !== requestId));
    };

    const handleToggleStatus = (requestId) => {
        setPendingRequests(pendingRequests.map(req => 
            req.requestId === requestId 
                ? { ...req, status: req.status === 'Pending' ? 'Received' : 'Pending' } 
                : req
        ));
    };

    const displayedRequests = pendingRequests.filter(req => req.status === 'Pending');

    return(
        <div className="min-h-screen bg-slate-50 font-sans text-slate-800 pb-12">
             <NurseNav />

             <main className="max-w-7xl mx-auto mt-8 px-4 sm:px-6 lg:px-8 space-y-8">
                 {/* Page Header */}
                 <div>
                    <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Drugs Manager Dashboard</h2>
                    <p className="text-sm text-slate-500 mt-1">Overview of low stocks and pending requests.</p>
                 </div>

                 {/* Low Stocks Section */}
                 <section className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                    <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
                        <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                            <FiAlertCircle className="text-red-500 w-5 h-5" />
                            Low Stocks Alerts
                        </h3>
                        <span className="bg-red-100 text-red-700 text-xs font-bold px-2.5 py-1 rounded-full shadow-sm">
                            {lowStocksData.length} Items Low
                        </span>
                    </div>
                    <div className="p-6 overflow-x-auto">
                        <table className="w-full text-left text-sm whitespace-nowrap">
                            <thead>
                                <tr className="text-slate-500 border-b border-slate-100">
                                    <th className="pb-3 font-semibold">Item ID</th>
                                    <th className="pb-3 font-semibold">Item Name</th>
                                    <th className="pb-3 font-semibold">Category</th>
                                    <th className="pb-3 font-semibold text-right">Current Qty</th>
                                    <th className="pb-3 font-semibold text-right">Reorder Level</th>
                                    <th className="pb-3 font-semibold text-center pl-4">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {lowStocksData.map((item) => (
                                    <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                                        <td className="py-3 font-medium text-slate-700">{item.id}</td>
                                        <td className="py-3 font-semibold text-slate-900">{item.name}</td>
                                        <td className="py-3 text-slate-600">{item.category}</td>
                                        <td className="py-3 text-right font-medium text-slate-900">{item.currentQty}</td>
                                        <td className="py-3 text-right text-slate-500">{item.reorderLevel}</td>
                                        <td className="py-3 pl-4 text-center">
                                            <span className={`inline-flex items-center justify-center px-2.5 py-1 rounded-full text-xs font-bold
                                                ${item.status === 'Critical' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'}`}>
                                                {item.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                 </section>

                 {/* Pending Requests Section */}
                 <section className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                    <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
                        <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                            <FiClock className="text-blue-500 w-5 h-5" />
                            Pending Requests (Head Doctor)
                        </h3>
                        <span className="bg-blue-100 text-blue-700 text-xs font-bold px-2.5 py-1 rounded-full shadow-sm">
                            {displayedRequests.length} Pending
                        </span>
                    </div>
                    <div className="p-6 overflow-x-auto">
                        <table className="w-full text-left text-sm whitespace-nowrap">
                            <thead>
                                <tr className="text-slate-500 border-b border-slate-100">
                                    <th className="pb-3 font-semibold">Request ID</th>
                                    <th className="pb-3 font-semibold">Date</th>
                                    <th className="pb-3 font-semibold">Item Name</th>
                                    <th className="pb-3 font-semibold text-right">Requested Qty</th>
                                    <th className="pb-3 font-semibold text-center pl-4">Urgency</th>
                                    <th className="pb-3 font-semibold text-center">Status</th>
                                    <th className="pb-3 font-semibold text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {displayedRequests.map((req) => (
                                    <tr key={req.requestId} className="hover:bg-slate-50/50 transition-colors">
                                        <td className="py-3 font-medium text-slate-700">{req.requestId}</td>
                                        <td className="py-3 text-slate-600">{req.requestedDate}</td>
                                        <td className="py-3 font-semibold text-slate-900">{req.itemName}</td>
                                        <td className="py-3 text-right font-medium text-slate-900">{req.requestedQty}</td>
                                        <td className="py-3 pl-4 text-center">
                                            <span className={`inline-flex items-center justify-center px-2.5 py-1 rounded-md text-xs font-bold border
                                                ${req.urgency === 'Critical' ? 'border-red-200 bg-red-50 text-red-700' : 
                                                  req.urgency === 'Urgent' ? 'border-amber-200 bg-amber-50 text-amber-700' :
                                                  'border-slate-200 bg-slate-100 text-slate-700'}`}>
                                                {req.urgency}
                                            </span>
                                        </td>
                                        <td className="py-3 text-center">
                                            {req.status === 'Pending' ? (
                                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></div>
                                                    Pending
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700 border border-green-100">
                                                    <FiCheckCircle className="w-3.5 h-3.5" />
                                                    Received
                                                </span>
                                            )}
                                        </td>
                                        <td className="py-3 text-center">
                                            <div className="flex items-center justify-center gap-2">
                                                {req.status === 'Pending' && (
                                                    <button 
                                                        onClick={() => handleToggleStatus(req.requestId)}
                                                        className="px-2 py-1.5 rounded-lg transition-colors text-xs font-semibold border text-green-600 border-green-200 hover:bg-green-50"
                                                        title="Mark as Received"
                                                    >
                                                        Receive
                                                    </button>
                                                )}
                                                <button 
                                                    onClick={() => handleRemoveRequest(req.requestId)}
                                                    className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                    title="Remove Request"
                                                >
                                                    <FiTrash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {displayedRequests.length === 0 && (
                            <div className="text-center py-8 text-slate-500 flex flex-col items-center">
                                <FiCheckCircle className="w-8 h-8 text-green-400 mb-2" />
                                <p>All requests have been received!</p>
                            </div>
                        )}
                    </div>
                 </section>
             </main>
        </div>
    )
}

export default DMNDashbourd;