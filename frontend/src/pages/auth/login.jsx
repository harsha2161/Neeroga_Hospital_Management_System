import React, { useState, useEffect } from 'react';
import { FiChevronDown } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Login() {
    const [role, setRole] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    async function handleLogin(e) {
        e.preventDefault()


        if (!role || !username || !password) {
            toast.error("Please fill in all fields");
            return
        }
        try {


            const response = await axios.post(import.meta.env.VITE_BACKEND_URL + "/api/v1/users/loginuser", {
                username: username,
                password: password,
            })

            toast.success("Login Successful");
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("role", response.data.role);
            if (response.data.role == "Docter") {
                navigate("/dr.tharaka");
            } else if (role == "Drugs-Manager") {
                navigate("/");
            } else if (role == "/")
                navigate("/")

        } catch (err) {
            toast.error(err.response?.data?.message || "Login failed");
        }
    }



    return (
        <div className="h-screen w-screen overflow-hidden flex items-center justify-center bg-hospital-bg p-4 font-sans relative">

            <div className="w-full max-w-4xl max-h-full overflow-y-auto bg-hospital-surface/80 backdrop-blur-2xl border border-white/50 rounded-3xl p-8 sm:p-12 shadow-[0_8px_32px_0_rgba(0,0,0,0.1)] transition-all duration-500 relative z-10 custom-scrollbar flex flex-col md:flex-row items-center gap-8 md:gap-12">

                <div className="w-full md:w-5/12 flex flex-col items-center justify-center text-center group cursor-pointer border-b md:border-b-0 md:border-r border-slate-200 pb-8 md:pb-0 md:pr-12">
                    <div className="inline-block mb-4 sm:mb-6 relative transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
                        <div className="absolute inset-0 bg-white/30 rounded-full blur-xl group-hover:bg-white/50 transition-colors duration-500"></div>
                        <img
                            src="/neeroga_logo.jpg"
                            alt="Neeroga Hospital Logo"
                            className="w-24 h-24 sm:w-36 sm:h-36 object-cover rounded-full border-4 border-white shadow-lg relative z-10"
                        />
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-hospital-text tracking-tight mb-2 drop-shadow-sm">Welcome Back</h2>
                    <p className="text-hospital-muted text-sm sm:text-base font-medium tracking-wide mt-1">
                        Neeroga Hospital<br />Inventory Management System
                    </p>
                </div>

                <form onSubmit={handleLogin} className="w-full md:w-7/12 flex flex-col gap-6 sm:gap-8">
                    <div className="flex flex-col gap-3">
                        <label className="text-xs sm:text-sm font-semibold text-hospital-text uppercase tracking-wider ml-1">Select Role</label>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            <button
                                type="button"
                                onClick={() => { setRole('Admin'); setUsername('Admin'); }}
                                className={`py-3 px-2 rounded-xl text-sm font-bold transition-all duration-300 active:scale-95 flex items-center justify-center border ${role === 'Admin'
                                        ? 'bg-hospital-primary text-white border-hospital-primary shadow-lg scale-105 -translate-y-1'
                                        : 'bg-white text-hospital-text border-slate-200 hover:bg-slate-50 hover:shadow-md hover:-translate-y-0.5'
                                    }`}
                            >
                                Admin
                            </button>
                            <button
                                type="button"
                                onClick={() => { setRole('Drugs'); setUsername(''); }}
                                className={`py-3 px-2 rounded-xl text-sm font-bold transition-all duration-300 active:scale-95 flex items-center justify-center border ${role === 'Drugs'
                                        ? 'bg-hospital-primary text-white border-hospital-primary shadow-lg scale-105 -translate-y-1'
                                        : 'bg-white text-hospital-text border-slate-200 hover:bg-slate-50 hover:shadow-md hover:-translate-y-0.5'
                                    }`}
                            >
                                Drugs
                            </button>
                            <button
                                type="button"
                                onClick={() => { setRole('Inventory'); setUsername(''); }}
                                className={`py-3 px-2 rounded-xl text-sm font-bold transition-all duration-300 active:scale-95 flex items-center justify-center border ${role === 'Inventory'
                                        ? 'bg-hospital-primary text-white border-hospital-primary shadow-lg scale-105 -translate-y-1'
                                        : 'bg-white text-hospital-text border-slate-200 hover:bg-slate-50 hover:shadow-md hover:-translate-y-0.5'
                                    }`}
                            >
                                Inventory
                            </button>
                        </div>
                    </div>

                    <div className={`grid transition-all duration-500 ease-in-out ${role && role !== 'Admin' ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                        <div className="overflow-hidden">
                            <div className="flex flex-col gap-3 pt-2 pb-1">
                                <label className="text-xs sm:text-sm font-semibold text-hospital-text uppercase tracking-wider ml-1">Select Username</label>
                                <div className="flex flex-wrap gap-2 sm:gap-3">
                                    {role === 'Drugs' && (
                                        <>
                                            {['Officer', 'OPD', 'Theater', 'Channel Room'].map((u, i) => (
                                                <button
                                                    key={u}
                                                    type="button"
                                                    style={{ animationDelay: `${i * 50}ms` }}
                                                    onClick={() => setUsername(u)}
                                                    className={`flex-1 min-w-[100px] sm:min-w-[120px] py-2.5 px-3 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 active:scale-95 border animate-fade-in text-center ${username === u
                                                            ? 'bg-hospital-primary text-white border-hospital-primary shadow-md scale-105'
                                                            : 'bg-white text-hospital-text border-slate-200 hover:bg-slate-50 hover:border-slate-300'
                                                        }`}
                                                >
                                                    {u}
                                                </button>
                                            ))}
                                        </>
                                    )}
                                    {role === 'Inventory' && (
                                        <>
                                            {['Officer', 'Channel Rooms', 'Theater', 'Recp', 'Kitchen'].map((u, i) => (
                                                <button
                                                    key={u}
                                                    type="button"
                                                    style={{ animationDelay: `${i * 50}ms` }}
                                                    onClick={() => setUsername(u)}
                                                    className={`flex-1 min-w-[100px] sm:min-w-[120px] py-2.5 px-3 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 active:scale-95 border animate-fade-in text-center ${username === u
                                                            ? 'bg-hospital-primary text-white border-hospital-primary shadow-md scale-105'
                                                            : 'bg-white text-hospital-text border-slate-200 hover:bg-slate-50 hover:border-slate-300'
                                                        }`}
                                                >
                                                    {u}
                                                </button>
                                            ))}
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-3">
                        <label htmlFor="password" className="text-xs sm:text-sm font-semibold text-hospital-text uppercase tracking-wider ml-1">Password</label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-white text-hospital-text text-base transition-all duration-300 
                            placeholder:text-hospital-muted/60 focus:outline-none focus:border-hospital-secondary focus:ring-4 focus:ring-hospital-secondary/20 shadow-sm"
                        />
                    </div>

                    <button
                        type="submit"
                        className="mt-4 w-full bg-hospital-primary hover:bg-hospital-secondary text-white text-base sm:text-lg font-bold py-4 rounded-xl transition-all duration-300 shadow-md shadow-hospital-primary/30 hover:shadow-lg hover:shadow-hospital-secondary/40 hover:-translate-y-1 active:translate-y-0 active:scale-[0.98] flex items-center justify-center gap-2 group"
                    >
                        <span>Sign In</span>
                        <svg className="w-5 h-5 transform transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                    </button>
                </form>
            </div>
        </div>
    )
}