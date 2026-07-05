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
      
       
        if(!role || !username || !password) {
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
            localStorage.setItem("role", response.data.role)
            if (response.data.role=="Docter") {
                navigate("/dr.tharaka");
            } else if(role=="Drugs-Manager") {
                navigate("/");
            } else if(role=="/")
                navigate("/")
                
        } catch (err) {
            toast.error(err.response?.data?.message || "Login failed");
        }
    }   
    
    

    return (
        <div className="h-screen w-screen overflow-hidden flex items-center justify-center bg-hospital-bg p-4 font-sans">
            <div className="w-full max-w-md max-h-full overflow-hidden bg-hospital-surface/80 backdrop-blur-lg border border-white/50 rounded-2xl sm:rounded-3xl p-6 sm:p-10 shadow-[0_20px_40px_rgba(0,0,0,0.08)] transition-all duration-300">

                <div className="text-center mb-6 sm:mb-8">
                    <div className="inline-block mb-2 sm:mb-4 relative">
                        <img
                            src="/neeroga_logo.jpg"
                            alt="Neeroga Hospital Logo"
                            className="w-16 h-16 sm:w-24 sm:h-24 object-cover rounded-full border-2 sm:border-4 border-white shadow-lg"
                        />
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-hospital-text tracking-tight mb-1 sm:mb-2">Welcome Back</h2>
                    <p className="text-hospital-muted text-xs sm:text-sm leading-relaxed">
                        Neeroga Hospital<br />Inventory Management System
                    </p>
                </div>

                <form onSubmit={handleLogin} className="flex flex-col gap-3 sm:gap-5">
                    <div className="flex flex-col gap-1.5 sm:gap-2">
                        <label htmlFor="role" className="text-xs sm:text-sm font-medium text-hospital-text ml-1">Select Role</label>
                        <div className="relative">
                            <select
                                id="role"
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                                required
                                className="w-full appearance-none px-3 py-2.5 sm:px-4 sm:py-3.5 rounded-lg sm:rounded-xl border border-slate-200 bg-white text-hospital-text 
                                text-sm transition-all focus:outline-none focus:border-hospital-secondary focus:ring-2 sm:focus:ring-4 focus:ring-hospital-secondary/20 cursor-pointer pr-10"
                            >
                                <option value="" disabled>Choose your role...</option>
                                <option value="Dr.Tharaka">Dr. Tharaka</option>
                                <option value="Drug Store officer">Drug Store officer</option>
                                <option value="Inventory Store officer">Inventory Store Officer</option>
                            </select>
                            <div className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 pointer-events-none text-hospital-muted">
                                <FiChevronDown className="w-4 h-4" />
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-1.5 sm:gap-2">
                        <label htmlFor="username" className="text-xs sm:text-sm font-medium text-hospital-text ml-1">Username</label>
                        <input
                            type="text"
                            id="username"
                            placeholder="Enter your username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            className="w-full px-3 py-2.5 sm:px-4 sm:py-3.5 rounded-lg sm:rounded-xl border border-slate-200 bg-white text-hospital-text text-sm 
                            transition-all placeholder:text-hospital-muted/60 focus:outline-none focus:border-hospital-secondary focus:ring-2 sm:focus:ring-4 focus:ring-hospital-secondary/20"
                        />
                    </div>

                    <div className="flex flex-col gap-1.5 sm:gap-2">
                        <label htmlFor="password" className="text-xs sm:text-sm font-medium text-hospital-text ml-1">Password</label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full px-3 py-2.5 sm:px-4 sm:py-3.5 rounded-lg sm:rounded-xl border border-slate-200 bg-white text-hospital-text text-sm transition-all 
                            placeholder:text-hospital-muted/60 focus:outline-none focus:border-hospital-secondary focus:ring-2 sm:focus:ring-4 focus:ring-hospital-secondary/20"
                        />
                    </div>

                    <button
                        type="submit"
                        className="mt-1 sm:mt-2 w-full bg-hospital-primary hover:bg-hospital-secondary text-white text-sm sm:text-base font-semibold py-3 sm:py-4 rounded-lg 
                        sm:rounded-xl transition-all shadow-md sm:shadow-lg shadow-hospital-primary/30 hover:shadow-hospital-secondary/40 hover:-translate-y-0.5 active:translate-y-0"
                    >
                        Sign In
                    </button>
                </form>
            </div>
        </div>
    )
}