import React, { useState } from 'react';
import { FiSend, FiPlus, FiTrash2, FiAlertCircle, FiCheckCircle } from 'react-icons/fi';
import NurseNav from '../../../components/layout/HNnavbar';

export default function NurseCreateOrder() {
  const [orderItems, setOrderItems] = useState([
    { id: 1, category: '', itemName: '', quantity: 1, urgency: 'Normal' }
  ]);
  const [remarks, setRemarks] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const inventoryMock = {
    'Tablets': ['Panadol 500mg', 'Amoxicillin 250mg', 'Vitamin C'],
    'Injections': ['Insulin Injection', 'Propofol Injection', 'Fentanyl Ampoules'],
    'Equipment': ['Surgical Gloves', 'Syringes 5ml', 'Cotton Rolls'],
    'Syrups': ['Cough Syrup', 'Saline 500ml']
  };
  const categories = Object.keys(inventoryMock);

  const handleAddItem = () => {
    setOrderItems([...orderItems, { id: Date.now(), category: '', itemName: '', quantity: 1, urgency: 'Normal' }]);
  };

  const handleRemoveItem = (id) => {
    if (orderItems.length > 1) {
      setOrderItems(orderItems.filter(item => item.id !== id));
    }
  };

  const handleItemChange = (id, field, value) => {
    setOrderItems(orderItems.map(item => {
      if (item.id === id) {
        if (field === 'category') {
          return { ...item, category: value, itemName: '' };
        }
        return { ...item, [field]: value };
      }
      return item;
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);

      // Reset form after 3 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
        setOrderItems([{ id: Date.now(), category: '', itemName: '', quantity: 1, urgency: 'Normal' }]);
        setRemarks('');
      }, 3000);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 pb-12">
      <NurseNav />

      <main className="max-w-4xl mx-auto mt-8 px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Request Drugs & Equipment</h2>
            <p className="text-sm text-slate-500 mt-1">Create a new order for your theater/department</p>
          </div>
        </div>

        {submitSuccess && (
          <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl flex items-center gap-3 animate-fade-in">
            <FiCheckCircle className="w-5 h-5 text-green-500" />
            <p className="font-medium">Order submitted successfully! The central pharmacy has been notified.</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">

          {/* Items Section */}
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-slate-800">Order Items</h3>
              <button
                type="button"
                onClick={handleAddItem}
                className="flex items-center gap-1.5 text-sm font-medium text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg transition-colors"
              >
                <FiPlus className="w-4 h-4" />
                Add Item
              </button>
            </div>

            <div className="space-y-4">
              {orderItems.map((item, index) => (
                <div key={item.id} className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-start bg-slate-50/50 p-4 rounded-xl border border-slate-100 relative group">

                  <div className="sm:col-span-3">
                    <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Category</label>
                    <select
                      required
                      value={item.category}
                      onChange={(e) => handleItemChange(item.id, 'category', e.target.value)}
                      className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-shadow bg-white"
                    >
                      <option value="" disabled>Select category...</option>
                      {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>

                  <div className="sm:col-span-4">
                    <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Item Name</label>
                    <select
                      required
                      value={item.itemName}
                      onChange={(e) => handleItemChange(item.id, 'itemName', e.target.value)}
                      disabled={!item.category}
                      className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-shadow bg-white disabled:bg-slate-50 disabled:text-slate-400"
                    >
                      <option value="" disabled>Select an item...</option>
                      {item.category && inventoryMock[item.category]?.map(name => (
                        <option key={name} value={name}>{name}</option>
                      ))}
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Quantity</label>
                    <input
                      type="number"
                      min="1"
                      required
                      value={item.quantity}
                      onChange={(e) => handleItemChange(item.id, 'quantity', parseInt(e.target.value))}
                      className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-shadow"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Urgency</label>
                    <select
                      value={item.urgency}
                      onChange={(e) => handleItemChange(item.id, 'urgency', e.target.value)}
                      className={`w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 transition-shadow font-medium
                        ${item.urgency === 'Critical' ? 'border-red-300 bg-red-50 text-red-700 focus:ring-red-500/50' :
                          item.urgency === 'Urgent' ? 'border-amber-300 bg-amber-50 text-amber-700 focus:ring-amber-500/50' :
                            'border-slate-300 bg-white text-slate-700 focus:ring-blue-500/50'}`}
                    >
                      <option value="Normal">Normal</option>
                      <option value="Urgent">Urgent</option>
                      <option value="Critical">Critical</option>
                    </select>
                  </div>

                  <div className="sm:col-span-1 flex justify-end sm:mt-6">
                    <button
                      type="button"
                      onClick={() => handleRemoveItem(item.id)}
                      disabled={orderItems.length === 1}
                      className={`p-2 rounded-lg transition-colors ${orderItems.length === 1 ? 'text-slate-300 cursor-not-allowed' : 'text-slate-400 hover:text-red-500 hover:bg-red-50'}`}
                    >
                      <FiTrash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {orderItems.some(i => i.urgency === 'Critical') && (
              <div className="mt-4 flex items-start gap-2 text-red-600 bg-red-50 p-3 rounded-lg border border-red-100 text-sm">
                <FiAlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <p>You have selected one or more items as <strong>Critical</strong>. These requests will trigger an immediate alert to the central pharmacy.</p>
              </div>
            )}
          </div>

          {/* Footer Section */}
          <div className="p-6 border-t border-slate-100 bg-slate-50/50">
            <div className="mb-6">
              <label className="block text-sm font-semibold text-slate-700 mb-2">Additional Remarks (Optional)</label>
              <textarea
                rows="3"
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
                placeholder="Any special instructions or reasons for request..."
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-shadow resize-none"
              ></textarea>
            </div>

            <div className="flex justify-end gap-3">
              <button
                type="button"
                className="px-5 py-2.5 rounded-xl font-medium text-slate-600 hover:bg-slate-200 transition-colors"
                onClick={() => {
                  setOrderItems([{ id: Date.now(), category: '', itemName: '', quantity: 1, urgency: 'Normal' }]);
                  setRemarks('');
                }}
              >
                Clear Form
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl font-medium transition-colors shadow-sm focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-70"
              >
                {isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <FiSend className="w-4 h-4" />
                )}
                Submit Request
              </button>
            </div>
          </div>

        </form>
      </main>
    </div>
  );
}
