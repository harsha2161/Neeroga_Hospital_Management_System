import React from 'react';
import DrTharakaNavbar from '../../components/layout/DrTharakaNavbar';
import DistributingTable from '../../components/table/DistributingTable';

const drugsDistributions = [
  { id: 'DRG-REQ-001', timestamp: '2026-06-26 09:30 AM', section: 'OPD', category: 'Tablets', item: 'Panadol 500mg', qtyRequested: 500, status: 'Pending', actualIssued: 0, storeAvailability: 1500, balanceNeeded: 500 },
  { id: 'DRG-REQ-002', timestamp: '2026-06-26 10:15 AM', section: 'ICU', category: 'Injections', item: 'Insulin Injection', qtyRequested: 10, status: 'Issued', actualIssued: 10, storeAvailability: 15, balanceNeeded: 0 },
  { id: 'DRG-REQ-004', timestamp: '2026-06-25 02:20 PM', section: 'Emergency', category: 'Syrups', item: 'Cough Syrup', qtyRequested: 20, status: 'Issued', actualIssued: 20, storeAvailability: 120, balanceNeeded: 0 },
  { id: 'DRG-REQ-005', timestamp: '2026-06-25 04:10 PM', section: 'Theater', category: 'Tablets', item: 'Amoxicillin 250mg', qtyRequested: 50, status: 'Pending', actualIssued: 30, storeAvailability: 30, balanceNeeded: 20 },
];

export default function DistributeDrugsPage() {
  return (
    <div className="min-h-screen bg-hospital-bg font-sans text-hospital-text pb-12">
      <DrTharakaNavbar />
      <DistributingTable data={drugsDistributions} title="Drugs" />
    </div>
  );
}
