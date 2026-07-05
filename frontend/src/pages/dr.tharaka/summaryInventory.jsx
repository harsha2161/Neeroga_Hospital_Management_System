import React from 'react';
import SummaryDashboard from '../../components/dashboard/SummaryDashboard';

const inventoryIssued = [
  { id: 'ISS-INV-001', date: '2026-06-26 10:15 AM', item: 'Syringes 5ml', category: 'Equipment', department: 'ICU', qty: 100, unitPrice: 25.00 },
  { id: 'ISS-INV-002', date: '2026-06-23 11:30 AM', item: 'Surgical Masks (Box)', category: 'General', department: 'OPD', qty: 10, unitPrice: 1200.00 },
  { id: 'ISS-INV-003', date: '2026-06-21 09:00 AM', item: 'Surgical Gloves', category: 'Equipment', department: 'Theater', qty: 50, unitPrice: 45.00 },
];

export default function SummaryInventoryPage() {
  return <SummaryDashboard title="Inventory" issuedItems={inventoryIssued} />;
}
