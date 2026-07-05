import React, { useState } from 'react';
import { FiPlus, FiTrash2, FiX } from 'react-icons/fi';
import DrTharakaNavbar from '../../components/layout/DrTharakaNavbar';
import axios from "axios";
import toast from 'react-hot-toast';
import { useEffect } from 'react';

export default function ManageUsers() {

    const token = localStorage.getItem("token");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDelete, setIsDelete] = useState(false);
    const [deleteUserName, setDeleteUserName] = useState("")
    const [users, setUsers] = useState([]);

    const [userName, setUserName] = useState("");
    const [password, SetPassword] = useState("");
    const [role, setRole] = useState("")

    const handleCreateUser = async () => {
        try {
            const token = localStorage.getItem("token");
            await axios.post(import.meta.env.VITE_BACKEND_URL + "/api/v1/users/createuser", {
                userName: userName,
                password: password,
                role: role,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            toast.success("User successfully added!");
            setIsModalOpen(false);
            fetchUsers();
        } catch (err) {
            toast.error("User added Failed");
            console.log(err.response?.data?.message || err.message);
        }
    };

    useEffect(() => {
        fetchUsers()
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get(import.meta.env.VITE_BACKEND_URL + "/api/v1/users/", {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            setUsers(response.data.data || []);
        } catch (err) {
            toast.error("Failed to fetch users!")
            console.log(err.message);
        }
    }

    const handleDelete = async () => {
        try {
            await axios.delete(import.meta.env.VITE_BACKEND_URL + `/api/v1/users/${deleteUserName}`, {
                 headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            toast.success("User deleted successfully")
            setIsDelete(false);
            fetchUsers()
        } catch (err) {
            toast.error("User Delete failed")
            console.log(err.message)
        }
    }

    return (
        <div className="min-h-screen bg-hospital-bg font-sans text-hospital-text pb-12">
            <DrTharakaNavbar />

            <main className="p-4 sm:p-8 max-w-6xl mx-auto space-y-8 animate-fade-in mt-4">
                <div className="bg-hospital-surface rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                    <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                        <div>
                            <h2 className="text-2xl font-bold text-hospital-primary">Manage Users</h2>
                            <p className="text-sm text-hospital-muted mt-1">View, add, and remove system users.</p>
                        </div>
                        <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 px-4 py-2 bg-hospital-primary text-white text-sm font-medium rounded-xl hover:bg-hospital-primary/90 transition-colors shadow-sm">
                            <FiPlus className="w-4 h-4" />
                            Add Account
                        </button>
                    </div>

                    <div className="p-0 overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50/50 text-hospital-muted text-xs uppercase tracking-wider">
                                    <th className="p-4 font-semibold">Name</th>
                                    <th className="p-4 font-semibold">Email</th>
                                    <th className="p-4 font-semibold">Role</th>
                                    <th className="p-4 font-semibold text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {users.map(user => (
                                    <tr key={user.id} className="hover:bg-slate-50/50 transition-colors">
                                        <td className="p-4 font-medium text-hospital-text">{user.userName}</td>
                                        <td className="p-4 text-hospital-muted text-sm">{user.email || 'N/A'}</td>
                                        <td className="p-4">
                                            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700">
                                                {user.role}
                                            </span>
                                        </td>
                                        <td className="p-4 text-right">
                                            <button onClick={() => {setIsDelete(true); setDeleteUserName(user.userName)}} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors" title="Delete User">
                                                <FiTrash2 className="w-4 h-4" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                {users.length === 0 && (
                                    <tr>
                                        <td colSpan="4" className="p-8 text-center text-hospital-muted">No users found.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>

            {/* Add User Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-fade-in">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg border border-slate-100 overflow-hidden">
                        <div className="flex items-center justify-between p-6 border-b border-slate-100">
                            <h3 className="text-xl font-bold text-hospital-primary">Create New Account</h3>
                            <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600 transition-colors">
                                <FiX className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="p-6">
                            <form className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-hospital-text">Name</label>
                                    <input type="text" placeholder="Enter name" value={userName} onChange={(e) => setUserName(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-hospital-primary/20 focus:border-hospital-primary transition-colors" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-hospital-text">Password</label>
                                    <input type="password" placeholder="Enter password" value={password} onChange={(e) => { SetPassword(e.target.value) }} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-hospital-primary/20 focus:border-hospital-primary transition-colors" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-hospital-text">Role/Access Level</label>
                                    <select value={role} onChange={(e) => { setRole(e.target.value) }} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-hospital-primary/20 focus:border-hospital-primary transition-colors">
                                        <option>Select Role</option>
                                        <option value="Doctor">Doctor</option>
                                        <option value="Drugs-Manager">Drugs-Manager</option>
                                        <option value="Inventory-Manager">Inventory-Manager</option>
                                    </select>
                                </div>
                            </form>
                        </div>
                        <div className="p-6 bg-slate-50 border-t border-slate-100 flex justify-end gap-3">
                            <button onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 rounded-xl border border-slate-200 text-hospital-muted font-medium hover:bg-slate-100 transition-colors">
                                Cancel
                            </button>
                            <button onClick={() => { handleCreateUser() }} className="px-5 py-2.5 rounded-xl bg-hospital-primary text-white font-medium hover:bg-hospital-primary/90 transition-colors shadow-sm">
                                Create Account
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {isDelete && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-fade-in">
                   <div className="h-[300px] w-full max-w-[600px] bg-hospital-surface rounded-2xl flex flex-col justify-center items-center gap-12 shadow-2xl border border-hospital-bg p-8 mx-auto">
                        <div className="flex justify-center items-center text-center">
                            <p className="font-bold text-2xl text-hospital-text">
                                Are you sure you want to delete this user?
                            </p>
                        </div>

                        <div className="flex justify-center items-center gap-6">
                            <button onClick={() => {setIsDelete(false)}} className="px-8 py-3 rounded-xl bg-hospital-bg text-hospital-text border border-hospital-muted/30 hover:bg-gray-100 font-semibold transition-colors duration-200">
                                Cancel
                            </button>

                            <button onClick={() => {handleDelete()}} className="px-8 py-3 rounded-xl bg-red-600 text-white hover:bg-red-700 shadow-md font-semibold transition-colors duration-200">
                                Yes, Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
