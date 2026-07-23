import React, { useState } from 'react';
import Select from 'react-select';
import { FiTrash2, FiPlus } from 'react-icons/fi';

const categoryOptions = [
  { value: 'Tablets', label: 'Tablets' },
  { value: 'Syrups', label: 'Syrups' },
  { value: 'Injections', label: 'Injections' },
  { value: 'Equipment', label: 'Surgical Equipment' },
];

const itemOptions = [
  { value: 'Panadol 500mg', label: 'Panadol 500mg', category: 'Tablets' },
  { value: 'Amoxicillin 250mg', label: 'Amoxicillin 250mg', category: 'Tablets' },
  { value: 'Vitamin C', label: 'Vitamin C', category: 'Tablets' },
  { value: 'Cough Syrup', label: 'Cough Syrup', category: 'Syrups' },
  { value: 'Insulin Injection', label: 'Insulin Injection', category: 'Injections' },
  { value: 'Tetanus Toxoid', label: 'Tetanus Toxoid', category: 'Injections' },
  { value: 'Surgical Gloves', label: 'Surgical Gloves', category: 'Equipment' },
];

export default function StockEntryForm({ title }) {
  const [formData, setFormData] = useState({
    dateReceived: new Date().toISOString().split('T')[0],
    category: '',
    item: '',
    qty: '',
    price: '',
    expiryDate: '',
    bufferLevel: ''
  });

  const [pendingItems, setPendingItems] = useState([]);

  const handleChange = (field, value) => {
    if (field === 'category') {
      setFormData({ ...formData, category: value, item: '' }); // Reset item if category changes
    } else {
      setFormData({ ...formData, [field]: value });
    }
  };

  const handleAddToList = (e) => {
    e.preventDefault();
    if (!formData.category || !formData.item || !formData.qty || !formData.price) return;

    setPendingItems([...pendingItems, { ...formData, id: Date.now() }]);

    // Reset form for rapid entry, but keep the Date Received as it rarely changes per batch
    setFormData(prev => ({ ...prev, category: '', item: '', qty: '', price: '', expiryDate: '', bufferLevel: '' }));
  };

  const handleRemoveFromList = (id) => {
    setPendingItems(pendingItems.filter(item => item.id !== id));
  };

  const handleSubmitAll = () => {
    console.log("Submitting Master Stock:", pendingItems);
    alert(`Successfully added ${pendingItems.length} items to Master Inventory!`);
    setPendingItems([]);
  };

  const selectStyles = {
    control: (base) => ({
      ...base,
      borderRadius: '0.5rem',
      borderColor: '#cbd5e1',
      padding: '2px',
      boxShadow: 'none',
      '&:hover': { borderColor: '#0ea5e9' }
    })
  };

  const filteredItems = itemOptions.filter(opt => !formData.category || opt.category === formData.category);

  const calculateTotalValue = () => {
    return pendingItems.reduce((total, item) => {
      return total + (Number(item.qty) * Number(item.price));
    }, 0);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 mt-6 mb-16">

      {/* Rapid Entry Form */}
      <div className="bg-white rounded-xl shadow-lg border border-slate-100 p-4 sm:p-6">

        {/* Header */}
        <div className="flex flex-col items-center mb-4 border-b border-slate-100 pb-4">
          <img src="/neeroga_logo.jpg" alt="Logo" className="w-12 h-12 rounded-full border border-slate-200 mb-2" />
          <h2 className="text-xl font-bold text-hospital-text uppercase tracking-wide">Neeroga Healthcare</h2>
          <p className="text-hospital-accent font-black text-lg mt-1">{title}</p>
        </div>

        {/* Form */}
        <form onSubmit={handleAddToList} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Date Received</label>
            <input
              type="date" required
              value={formData.dateReceived}
              onChange={(e) => handleChange('dateReceived', e.target.value)}
              className="w-full px-3 py-1.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-hospital-primary outline-none text-slate-700 text-sm"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Category</label>
              <Select
                options={categoryOptions}
                styles={selectStyles}
                value={categoryOptions.find(opt => opt.value === formData.category) || null}
                onChange={(selected) => handleChange('category', selected ? selected.value : '')}
                isClearable isSearchable placeholder="Search category..."
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Item Name</label>
              <Select
                options={filteredItems}
                styles={selectStyles}
                value={itemOptions.find(opt => opt.value === formData.item) || null}
                onChange={(selected) => handleChange('item', selected ? selected.value : '')}
                isClearable isSearchable placeholder="Search item..."
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Quantity</label>
              <input
                type="number" min="1" required
                value={formData.qty}
                onChange={(e) => handleChange('qty', e.target.value)}
                className="w-full px-3 py-1.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-hospital-primary outline-none text-slate-700 text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Unit Price (Rs.)</label>
              <input
                type="number" min="0" step="0.01" required
                value={formData.price}
                onChange={(e) => handleChange('price', e.target.value)}
                className="w-full px-3 py-1.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-hospital-primary outline-none text-slate-700 text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Expiry Date (Optional)</label>
              <input
                type="date"
                value={formData.expiryDate}
                onChange={(e) => handleChange('expiryDate', e.target.value)}
                className="w-full px-3 py-1.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-hospital-primary outline-none text-slate-700 text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Buffer Level</label>
              <input
                type="number" min="0" required
                value={formData.bufferLevel}
                onChange={(e) => handleChange('bufferLevel', e.target.value)}
                className="w-full px-3 py-1.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-hospital-primary outline-none text-slate-700 text-sm"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full mt-2 py-2.5 bg-slate-50 hover:bg-slate-100 text-hospital-primary border-2 border-hospital-primary/30 border-dashed rounded-lg font-bold uppercase tracking-wide transition-all flex items-center justify-center gap-2 text-sm"
          >
            <FiPlus className="w-4 h-4" /> Add to Pending List
          </button>
        </form>
      </div>

      {/* Pending Items "Cart" List */}
      {pendingItems.length > 0 && (
        <div className="bg-white rounded-xl shadow-lg border border-slate-100 p-4 sm:p-6 animate-fade-in">
          <h3 className="text-base font-bold text-hospital-text mb-3 border-b border-slate-100 pb-2">
            Pending Items ({pendingItems.length})
          </h3>

          <div className="overflow-x-auto mb-4 flex-1">
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-50 text-slate-500 font-semibold uppercase text-xs">
                <tr>
                  <th className="px-4 py-3 rounded-tl-lg">Category</th>
                  <th className="px-4 py-3">Item Name</th>
                  <th className="px-4 py-3 text-center">Qty</th>
                  <th className="px-4 py-3 text-right">Unit Price</th>
                  <th className="px-4 py-3 text-right">Total Price</th>
                  <th className="px-4 py-3">Expiry</th>
                  <th className="px-4 py-3 text-center">Buffer Level</th>
                  <th className="px-4 py-3 rounded-tr-lg text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {pendingItems.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3 font-medium text-slate-700">{item.category}</td>
                    <td className="px-4 py-3 font-medium text-hospital-primary">{item.item}</td>
                    <td className="px-4 py-3 text-center font-bold text-slate-800">{item.qty}</td>
                    <td className="px-4 py-3 text-right font-medium text-slate-500">Rs. {Number(item.price).toFixed(2)}</td>
                    <td className="px-4 py-3 text-right font-bold text-hospital-primary">Rs. {(Number(item.qty) * Number(item.price)).toFixed(2)}</td>
                    <td className="px-4 py-3 text-slate-500">{item.expiryDate || '-'}</td>
                    <td className="px-4 py-3 text-center font-medium text-slate-700">{item.bufferLevel}</td>
                    <td className="px-4 py-3 text-right">
                      <button
                        onClick={() => handleRemoveFromList(item.id)}
                        className="text-red-400 hover:text-red-600 p-2 rounded-full hover:bg-red-50 transition-all"
                        title="Remove"
                      >
                        <FiTrash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="bg-slate-50 border-t-2 border-slate-200 font-bold text-slate-800">
                <tr>
                  <td colSpan="4" className="px-4 py-4 text-right uppercase text-xs tracking-widest text-slate-500">Total Batch Value:</td>
                  <td className="px-4 py-4 text-right text-hospital-primary text-base">Rs. {calculateTotalValue().toFixed(2)}</td>
                  <td colSpan="3"></td>
                </tr>
              </tfoot>
            </table>
          </div>

          <button
            onClick={handleSubmitAll}
            className="w-full py-3 bg-hospital-accent hover:bg-teal-700 text-white rounded-lg font-bold uppercase tracking-wide transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 text-sm"
          >
            Update Master Inventory
          </button>
        </div>
      )}

    </div>
  );
}
