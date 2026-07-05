import React from 'react';
import SummaryDashboard from '../../components/dashboard/SummaryDashboard';

const drugsIssued = [
  { id: 'ISS-DRG-001', date: '2026-06-26 10:15 AM', item: 'Insulin Injection', category: 'Injections', department: 'ICU', qty: 10, unitPrice: 1500.00 },
  { id: 'ISS-DRG-002', date: '2026-06-25 02:20 PM', item: 'Cough Syrup', category: 'Syrups', department: 'Emergency', qty: 20, unitPrice: 450.00 },
  { id: 'ISS-DRG-003', date: '2026-06-24 09:10 AM', item: 'Amoxicillin 250mg', category: 'Tablets', department: 'Ward 1', qty: 50, unitPrice: 15.00 },
  { id: 'ISS-DRG-004', date: '2026-06-23 14:00 PM', item: 'Panadol 500mg', category: 'Tablets', department: 'OPD', qty: 500, unitPrice: 5.00 },
];

export default function SummaryDrugsPage() {
  return <SummaryDashboard title="Drugs" issuedItems={drugsIssued} />;
}
