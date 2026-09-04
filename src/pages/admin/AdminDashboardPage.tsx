import React, { useState } from 'react';
import { ShieldCheck, UserCheck, CheckCircle2, XCircle, FileText } from 'lucide-react';
import { Button } from '../../components/ui/Button';

export const AdminDashboardPage: React.FC = () => {
  const [providers, setProviders] = useState([
    { id: '1', name: 'Imran Ali', profession: 'Senior Electrician', status: 'verified', badge: 'SD-8821', cnic: '41304-******-1' },
    { id: '2', name: 'Master Tariq', profession: 'HVAC Specialist', status: 'verified', badge: 'SD-9102', cnic: '41304-******-3' },
    { id: '3', name: 'Asif Carpenter', profession: 'Cabinet Specialist', status: 'pending', badge: 'SD-9941', cnic: '41304-******-9' }
  ]);

  const handleVerify = (id: string) => {
    setProviders(providers.map(p => p.id === id ? { ...p, status: 'verified' } : p));
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 py-6">
      <div className="bg-white border border-outline-variant/40 rounded-3xl p-8 shadow-xl space-y-6">
        <div className="flex items-center justify-between border-b border-outline-variant/30 pb-4">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-8 h-8 text-primary" />
            <div>
              <h2 className="font-headline font-bold text-2xl text-on-surface">Admin Verification & Oversight Console</h2>
              <p className="text-xs text-on-surface-variant">NADRA CNIC verification, Sindh Guild badge assignment, and provider auditing.</p>
            </div>
          </div>
          <span className="px-3 py-1 bg-primary text-white text-xs font-bold rounded-full">
            Guild Division: Hyderabad Sindh
          </span>
        </div>

        <div className="space-y-4">
          <h3 className="font-bold text-base text-on-surface">Verification Queue</h3>
          <div className="space-y-3">
            {providers.map(p => (
              <div key={p.id} className="p-4 bg-surface-container-low border border-outline-variant/40 rounded-2xl flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-on-surface">{p.name}</span>
                    <span className={`px-2 py-0.5 text-[10px] font-bold rounded ${p.status === 'verified' ? 'bg-primary/10 text-primary' : 'bg-amber-100 text-amber-800'}`}>
                      {p.status.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-xs text-on-surface-variant">{p.profession} · CNIC: {p.cnic}</p>
                </div>

                <div className="flex items-center gap-2">
                  {p.status === 'pending' ? (
                    <Button variant="primary" size="sm" onClick={() => handleVerify(p.id)}>
                      <CheckCircle2 className="w-4 h-4 mr-1" /> Approve Badge
                    </Button>
                  ) : (
                    <span className="text-xs text-primary font-bold">✓ Guild Badge {p.badge} Active</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
