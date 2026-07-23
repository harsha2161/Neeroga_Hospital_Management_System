import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiUsers, FiLayers, FiAlertCircle, FiTrendingDown, FiClock, FiCheckCircle, FiPackage } from 'react-icons/fi';
import DrTharakaNavbar from '../../components/layout/DrTharakaNavbar';

export default function DrTharakaDashboard() {
    const navigate = useNavigate();
    const currentDate = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

    // Mock Data for Incoming Orders
    const [incomingOrders] = useState([
        { id: 'ORD-001', supplier: 'PharmaCorp', item: 'Paracetamol 500mg', quantity: 5000, date: '2026-06-28', status: 'Low', type: 'Drugs' },
        { id: 'ORD-002', supplier: 'MediEquip', item: 'Surgical Masks', quantity: 2000, date: '2026-06-29', status: 'Normal', type: 'Inventory' },
        { id: 'ORD-003', supplier: 'HealthPlus', item: 'Amoxicillin 250mg', quantity: 1000, date: '2026-06-28', status: 'Low', type: 'Drugs' },
        { id: 'ORD-004', supplier: 'SteriCare', item: 'Latex Gloves', quantity: 5000, date: '2026-06-30', status: 'Normal', type: 'Inventory' },
    ]);

    // Mock Data for Low Stock Drugs (Master and Theaters)
    const [lowStockDrugs] = useState([
        { id: 'DRG-101', name: 'Aspirin 75mg', location: 'Master Stock', current: 150, min: 500, unit: 'Tablets' },
        { id: 'DRG-205', name: 'Morphine 10mg/ml', location: 'Theater 1', current: 5, min: 20, unit: 'Vials' },
        { id: 'DRG-302', name: 'Ibuprofen 400mg', location: 'Theater 2', current: 50, min: 200, unit: 'Tablets' },
        { id: 'DRG-115', name: 'Propofol 1%', location: 'Theater 1', current: 2, min: 10, unit: 'Vials' },
        { id: 'DRG-404', name: 'Adrenaline 1mg/ml', location: 'Master Stock', current: 25, min: 100, unit: 'Ampoules' },
    ]);

    return (
        <div className="min-h-screen bg-hospital-bg font-sans text-hospital-text pb-12">
            <DrTharakaNavbar />

            <main className="p-4 sm:p-8 max-w-7xl mx-auto space-y-8 animate-fade-in mt-4">

                {/* Header & Quick Actions */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                    <div>
                        <h2 className="text-2xl font-bold text-hospital-primary">Dashboard Overview</h2>
                        <p className="text-hospital-muted text-sm mt-1">{currentDate}</p>
                    </div>
                    <div className="flex flex-wrap items-center gap-3">
                        <Link to="/dr.tharaka/manage-users" className="flex items-center gap-2 px-4 py-2 bg-hospital-primary text-white text-sm font-medium rounded-xl hover:bg-hospital-primary/90 transition-colors shadow-sm">
                            <FiUsers className="w-4 h-4" />
                            Manage Users
                        </Link>
                        <Link to="/dr.tharaka/manage-departments" className="flex items-center gap-2 px-4 py-2 bg-hospital-secondary text-white text-sm font-medium rounded-xl hover:bg-hospital-secondary/90 transition-colors shadow-sm">
                            <FiLayers className="w-4 h-4" />
                            Manage Departments
                        </Link>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Incoming Orders Section */}
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                        <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                                    <FiPackage className="w-5 h-5" />
                                </div>
                                <h3 className="text-lg font-bold text-hospital-primary">Incoming Orders</h3>
                            </div>
                        </div>
                        <div className="p-0 overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-slate-50/50 text-hospital-muted text-xs uppercase tracking-wider">
                                        <th className="p-4 font-semibold">Order ID</th>
                                        <th className="p-4 font-semibold">Item</th>
                                        <th className="p-4 font-semibold">Expected</th>
                                        <th className="p-4 font-semibold text-center">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {incomingOrders.map((order, idx) => (
                                        <tr
                                            key={idx}
                                            onClick={() => {
                                                if (order.type === 'Drugs') {
                                                    navigate('/dr.tharaka/distribute-drugs');
                                                } else if (order.type === 'Inventory') {
                                                    navigate('/dr.tharaka/distribute-inventory');
                                                }
                                            }}
                                            className="hover:bg-slate-100/80 transition-colors cursor-pointer"
                                        >
                                            <td className="p-4">
                                                <span className="text-sm font-medium text-hospital-primary">{order.id}</span>
                                            </td>
                                            <td className="p-4">
                                                <div className="text-sm font-medium text-hospital-text">{order.item}</div>
                                                <div className="text-xs text-hospital-muted">{order.quantity} units from {order.supplier}</div>
                                            </td>
                                            <td className="p-4 text-sm text-hospital-muted flex items-center gap-1.5 mt-2">
                                                <FiClock className="w-3.5 h-3.5" />
                                                {order.date}
                                            </td>
                                            <td className="p-4 text-center">
                                                {order.status === 'Low' ? (
                                                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700 border border-red-200">
                                                        <FiAlertCircle className="w-3 h-3" />
                                                        Low Priority
                                                    </span>
                                                ) : (
                                                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700 border border-green-200">
                                                        <FiCheckCircle className="w-3 h-3" />
                                                        Normal
                                                    </span>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Low Stock Drugs Section */}
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                        <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-amber-100 text-amber-600 rounded-lg">
                                    <FiTrendingDown className="w-5 h-5" />
                                </div>
                                <h3 className="text-lg font-bold text-hospital-primary">Low Stock Alerts</h3>
                            </div>
                            <span className="text-xs font-semibold text-amber-700 bg-amber-100 px-2 py-1 rounded-md">All Locations</span>
                        </div>
                        <div className="p-0 overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-slate-50/50 text-hospital-muted text-xs uppercase tracking-wider">
                                        <th className="p-4 font-semibold">Item Name</th>
                                        <th className="p-4 font-semibold">Location</th>
                                        <th className="p-4 font-semibold text-right">Stock Level</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {lowStockDrugs.map((drug, idx) => {
                                        const percent = (drug.current / drug.min) * 100;
                                        return (
                                            <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                                                <td className="p-4">
                                                    <div className="text-sm font-medium text-hospital-text">{drug.name}</div>
                                                    <div className="text-xs text-hospital-muted">{drug.id}</div>
                                                </td>
                                                <td className="p-4">
                                                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${drug.location === 'Master Stock' ? 'bg-indigo-50 text-indigo-700 border border-indigo-100' : 'bg-fuchsia-50 text-fuchsia-700 border border-fuchsia-100'
                                                        }`}>
                                                        {drug.location}
                                                    </span>
                                                </td>
                                                <td className="p-4 text-right">
                                                    <div className="flex flex-col items-end gap-1">
                                                        <span className="text-sm font-bold text-red-600">
                                                            {drug.current} <span className="text-xs font-normal text-hospital-muted">{drug.unit}</span>
                                                        </span>
                                                        <div className="w-24 bg-slate-100 rounded-full h-1.5 overflow-hidden">
                                                            <div className="bg-red-500 h-1.5 rounded-full" style={{ width: `${Math.min(percent, 100)}%` }}></div>
                                                        </div>
                                                        <span className="text-[10px] text-hospital-muted mt-0.5">Buffer Level: {drug.min}</span>
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

            </main>
        </div>
    );
}
