import React, { useState } from 'react';
import { FiChevronDown, FiBell, FiMenu, FiX } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';

export default function DrTharakaNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  function logOutHendel(){
    localStorage.removeItem("token")
    navigate("/login")
  }

  return (
    <nav className="bg-hospital-surface shadow-md px-4 sm:px-6 py-4 flex items-center justify-between sticky top-0 z-50 print:hidden">
      <div className="flex items-center gap-3 sm:gap-4">
        <img src="/neeroga_logo.jpg" alt="Logo" className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-hospital-secondary/30 object-cover" />
        <h1 className="text-lg sm:text-xl font-bold text-hospital-primary">Dr. Tharaka Dashboard</h1>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden lg:flex items-center gap-6">
        <Link to="/dr.tharaka" className="font-semibold hover:text-hospital-secondary transition-colors text-hospital-primary">
          Dashboard
        </Link>

        {/* Drugs Store Dropdown */}
        <div className="relative group">
          <button className="font-semibold hover:text-hospital-secondary transition-colors flex items-center gap-1">
            Drugs Store
            <FiChevronDown className="w-3 h-3 text-hospital-muted group-hover:text-hospital-secondary transition-colors" />
          </button>
          <div className="absolute top-full left-0 mt-4 w-52 bg-white rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 border border-slate-100 overflow-hidden z-50">
            <div className="py-2">
              <Link to="/dr.tharaka/add-drugs" className="block px-5 py-2.5 text-sm font-medium hover:bg-hospital-bg hover:text-hospital-primary transition-colors">Add Stocks</Link>
              <Link to="/dr.tharaka/view-drugs-stock" className="block px-5 py-2.5 text-sm font-medium hover:bg-hospital-bg hover:text-hospital-primary transition-colors">View Stocks</Link>
              <Link to="/dr.tharaka/distribute-drugs" className="block px-5 py-2.5 text-sm font-medium hover:bg-hospital-bg hover:text-hospital-primary transition-colors">Distribute Stock</Link>
              <div className="h-px bg-slate-100 my-1 mx-3"></div>
              <Link to="/dr.tharaka/summary-drugs" className="block px-5 py-2.5 text-sm font-medium text-hospital-secondary hover:bg-hospital-bg transition-colors">Summary</Link>
            </div>
          </div>
        </div>

        {/* Inventory Store Dropdown */}
        <div className="relative group">
          <button className="font-semibold hover:text-hospital-secondary transition-colors flex items-center gap-1">
            Inventory Store
            <FiChevronDown className="w-3 h-3 text-hospital-muted group-hover:text-hospital-secondary transition-colors" />
          </button>
          <div className="absolute top-full right-0 mt-4 w-52 bg-white rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 border border-slate-100 overflow-hidden z-50">
            <div className="py-2">
              <Link to="/dr.tharaka/add-inventory" className="block px-5 py-2.5 text-sm font-medium hover:bg-hospital-bg hover:text-hospital-primary transition-colors">Add Stocks</Link>
              <Link to="/dr.tharaka/view-inventory-stock" className="block px-5 py-2.5 text-sm font-medium hover:bg-hospital-bg hover:text-hospital-primary transition-colors">View Stocks</Link>
              <Link to="/dr.tharaka/distribute-inventory" className="block px-5 py-2.5 text-sm font-medium hover:bg-hospital-bg hover:text-hospital-primary transition-colors">Distribute Stock</Link>
              <div className="h-px bg-slate-100 my-1 mx-3"></div>
              <Link to="/dr.tharaka/summary-inventory" className="block px-5 py-2.5 text-sm font-medium text-hospital-secondary hover:bg-hospital-bg transition-colors">Summary</Link>
            </div>
          </div>
        </div>

        {/* Notifications */}
        <button className="relative text-hospital-muted hover:text-hospital-primary transition-colors ml-2 p-1.5 rounded-full hover:bg-slate-50 focus:outline-none" title="Notifications">
          <FiBell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
          </span>
        </button>

        {/* Logout Button */}
        <div className="ml-4 pl-4 border-l border-slate-200">
          <button onClick={logOutHendel}>
            <p className="text-sm font-semibold text-red-500 hover:text-red-600 transition-colors flex items-center gap-2">
              Logout
            </p>
          </button>
          
        </div>
      </div>

      {/* Mobile Hamburger Button */}
      <button
        className="lg:hidden text-hospital-primary p-1 focus:outline-none"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      >
        {mobileMenuOpen ? <FiX className="w-7 h-7" /> : <FiMenu className="w-7 h-7" />}
      </button>

      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-white border-t border-slate-100 shadow-xl py-4 px-6 flex flex-col gap-4 lg:hidden z-50">
          <div className="flex items-center justify-between pb-4 mb-2 border-b border-slate-100">
            <span className="font-semibold text-hospital-primary flex items-center gap-2">
              <FiBell className="w-5 h-5" />
              Notifications
            </span>
            <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">3 New</span>
          </div>

          <Link to="/dr.tharaka" className="font-semibold text-hospital-primary py-2">Dashboard</Link>

          <div className="flex flex-col gap-2">
            <span className="font-semibold text-hospital-primary py-1">Drugs Store</span>
            <div className="pl-4 flex flex-col gap-3 text-sm font-medium text-hospital-text">
              <Link to="/dr.tharaka/add-drugs" className="hover:text-hospital-primary">Add Stocks</Link>
              <Link to="/dr.tharaka/view-drugs-stock" className="hover:text-hospital-primary">View Stocks</Link>
              <Link to="/dr.tharaka/distribute-drugs" className="hover:text-hospital-primary">Distribute Stock</Link>
              <Link to="/dr.tharaka/summary-drugs" className="text-hospital-secondary">Summary</Link>
            </div>
          </div>

          <div className="flex flex-col gap-2 mt-2">
            <span className="font-semibold text-hospital-primary py-1">Inventory Store</span>
            <div className="pl-4 flex flex-col gap-3 text-sm font-medium text-hospital-text">
              <Link to="/dr.tharaka/add-inventory" className="hover:text-hospital-primary">Add Stocks</Link>
              <Link to="/dr.tharaka/view-inventory-stock" className="hover:text-hospital-primary">View Stocks</Link>
              <Link to="/dr.tharaka/distribute-inventory" className="hover:text-hospital-primary">Distribute Stock</Link>
              <Link to="/dr.tharaka/summary-inventory" className="text-hospital-secondary">Summary</Link>
            </div>
          </div>

          <div className="border-t border-slate-100 pt-4 mt-2">
            <button onClick={logOutHendel}>
            <p className="text-sm font-semibold text-red-500 hover:text-red-600 transition-colors flex items-center gap-2">
              Logout
            </p>
          </button>
          </div>
        </div>
      )}
    </nav>
  );
}
