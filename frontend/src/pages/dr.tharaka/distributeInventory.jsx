import React from 'react';
import DrTharakaNavbar from '../../components/layout/DrTharakaNavbar';
import DistributingTable from '../../components/table/DistributingTable';

const inventoryDistributions = [
  { id: 'INV-REQ-001', timestamp: '2026-06-26 09:30 AM', section: 'OPD', category: 'General', item: 'Surgical Masks (Box)', qtyRequested: 50, status: 'Pending', actualIssued: 0, storeAvailability: 200, balanceNeeded: 50 },
  { id: 'INV-REQ-002', timestamp: '2026-06-26 10:15 AM', section: 'ICU', category: 'Equipment', item: 'Syringes 5ml', qtyRequested: 100, status: 'Issued', actualIssued: 100, storeAvailability: 500, balanceNeeded: 0 },
  { id: 'INV-REQ-003', timestamp: '2026-06-26 11:45 AM', section: 'Theater', category: 'Equipment', item: 'Surgical Gloves', qtyRequested: 200, status: 'Pending', actualIssued: 0, storeAvailability: 150, balanceNeeded: 200 },
];

export default function DistributeInventoryPage() {
  return (
    <div className="min-h-screen bg-hospital-bg font-sans text-hospital-text pb-12">
      <DrTharakaNavbar />
      <DistributingTable data={inventoryDistributions} title="Inventory" />
    </div>
  );
}
