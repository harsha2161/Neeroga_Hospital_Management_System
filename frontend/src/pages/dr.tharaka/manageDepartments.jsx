import React, { useState } from 'react';
import { FiPlus, FiTrash2, FiX } from 'react-icons/fi';
import DrTharakaNavbar from '../../components/layout/DrTharakaNavbar';

export default function ManageDepartments() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [departments, setDepartments] = useState([
        { id: 1, name: 'Cardiology', head: 'Dr. Carter', description: 'Heart and cardiovascular diseases' },
        { id: 2, name: 'Neurology', head: 'Dr. House', description: 'Nervous system disorders' },
        { id: 3, name: 'Pediatrics', head: 'Dr. Grey', description: 'Medical care of infants and children' },
    ]);

    const handleDelete = (id) => {
        setDepartments(departments.filter(dept => dept.id !== id));
    };

    return (
        <div className="min-h-screen bg-hospital-bg font-sans text-hospital-text pb-12">
            <DrTharakaNavbar />

            <main className="p-4 sm:p-8 max-w-6xl mx-auto space-y-8 animate-fade-in mt-4">
                <div className="bg-hospital-surface rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                    <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                        <div>
                            <h2 className="text-2xl font-bold text-hospital-primary">Manage Departments</h2>
                            <p className="text-sm text-hospital-muted mt-1">View, add, and remove hospital departments.</p>
                        </div>
                        <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 px-4 py-2 bg-hospital-secondary text-white text-sm font-medium rounded-xl hover:bg-hospital-secondary/90 transition-colors shadow-sm">
                            <FiPlus className="w-4 h-4" />
                            Add Department
                        </button>
                    </div>

                    <div className="p-0 overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50/50 text-hospital-muted text-xs uppercase tracking-wider">
                                    <th className="p-4 font-semibold">Department Name</th>
                                    <th className="p-4 font-semibold">Head of Department</th>
                                    <th className="p-4 font-semibold">Description</th>
                                    <th className="p-4 font-semibold text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {departments.map(dept => (
                                    <tr key={dept.id} className="hover:bg-slate-50/50 transition-colors">
                                        <td className="p-4 font-medium text-hospital-text">{dept.name}</td>
                                        <td className="p-4 text-hospital-muted text-sm">{dept.head}</td>
                                        <td className="p-4 text-hospital-muted text-sm">{dept.description}</td>
                                        <td className="p-4 text-right">
                                            <button onClick={() => handleDelete(dept.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors" title="Delete Department">
                                                <FiTrash2 className="w-4 h-4" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                {departments.length === 0 && (
                                    <tr>
                                        <td colSpan="4" className="p-8 text-center text-hospital-muted">No departments found.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>

            {/* Add Department Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-fade-in">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg border border-slate-100 overflow-hidden">
                        <div className="flex items-center justify-between p-6 border-b border-slate-100">
                            <h3 className="text-xl font-bold text-hospital-primary">Create New Department</h3>
                            <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600 transition-colors">
                                <FiX className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="p-6">
                            <form className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-hospital-text">Department Name</label>
                                    <input type="text" placeholder="Enter department name" className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-hospital-primary/20 focus:border-hospital-primary transition-colors" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-hospital-text">Department Head</label>
                                    <input type="text" placeholder="Enter department head name" className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-hospital-primary/20 focus:border-hospital-primary transition-colors" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-hospital-text">Description</label>
                                    <textarea placeholder="Enter department description" rows="3" className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-hospital-primary/20 focus:border-hospital-primary transition-colors"></textarea>
                                </div>
                            </form>
                        </div>
                        <div className="p-6 bg-slate-50 border-t border-slate-100 flex justify-end gap-3">
                            <button onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 rounded-xl border border-slate-200 text-hospital-muted font-medium hover:bg-slate-100 transition-colors">
                                Cancel
                            </button>
                            <button onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 rounded-xl bg-hospital-secondary text-white font-medium hover:bg-hospital-secondary/90 transition-colors shadow-sm">
                                Create Department
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
