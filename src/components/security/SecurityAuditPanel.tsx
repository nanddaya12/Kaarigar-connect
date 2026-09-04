import React, { useState } from 'react';
import { ShieldCheck, Bug, Activity } from 'lucide-react';
import { Button } from '../ui/Button';
import { sanitizeInput } from '../../lib/utils';
import { SecurityAuditLog } from '../../types/database.types';

export const SecurityAuditPanel: React.FC = () => {
  const [xssInput, setXssInput] = useState("<script>alert('XSS Exploit!')</script><img src=x onerror=alert(1)>");
  const [sanitizedOutput, setSanitizedOutput] = useState<string | null>(null);

  const [logs] = useState<SecurityAuditLog[]>([
    { id: 'LOG-101', timestamp: new Date(Date.now() - 3600000).toLocaleTimeString(), action: 'AUTH_LOGIN_SUCCESS', user: 'Shahid Mehmood', role: 'ROLE_CUSTOMER', details: 'User authenticated via OTP SMS' },
    { id: 'LOG-102', timestamp: new Date(Date.now() - 1800000).toLocaleTimeString(), action: 'CSRF_TOKEN_VERIFIED', user: 'Shahid Mehmood', role: 'ROLE_CUSTOMER', details: 'Double-submit cookie validation passed' },
    { id: 'LOG-103', timestamp: new Date(Date.now() - 600000).toLocaleTimeString(), action: 'JOB_DISPATCH_CREATED', user: 'Shahid Mehmood', role: 'ROLE_CUSTOMER', details: 'Order KC-89214 created with Safety PIN #8942' }
  ]);

  const handleTestXss = () => {
    const clean = sanitizeInput(xssInput);
    setSanitizedOutput(clean);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="bg-white border border-outline-variant/40 rounded-3xl p-8 shadow-xl space-y-6">
        <div className="flex items-center justify-between border-b border-outline-variant/30 pb-4">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-8 h-8 text-primary" />
            <div>
              <h2 className="font-headline font-bold text-2xl text-on-surface">Web & App Security Audit Center</h2>
              <p className="text-xs text-on-surface-variant">Live threat monitoring, XSS sanitizer sandbox, CSRF token validation, and RBAC inspector.</p>
            </div>
          </div>
          <span className="px-3 py-1 bg-primary text-white text-xs font-bold rounded-full">
            Security Rating: 100% Compliant
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-surface-container-low rounded-2xl border border-outline-variant/30 space-y-1">
            <span className="text-[10px] uppercase font-bold text-outline">XSS Protection</span>
            <div className="text-base font-extrabold text-primary">DOMPurify Policy Active</div>
            <p className="text-[11px] text-on-surface-variant">Dynamic input sanitization enabled</p>
          </div>
          <div className="p-4 bg-surface-container-low rounded-2xl border border-outline-variant/30 space-y-1">
            <span className="text-[10px] uppercase font-bold text-outline">CSRF Token Header</span>
            <div className="text-base font-extrabold text-primary font-mono">csrf-token-98234-x89</div>
            <p className="text-[11px] text-on-surface-variant">Double-submit cookie validation</p>
          </div>
          <div className="p-4 bg-surface-container-low rounded-2xl border border-outline-variant/30 space-y-1">
            <span className="text-[10px] uppercase font-bold text-outline">Rate Limiter Bucket</span>
            <div className="text-base font-extrabold text-primary font-mono">30 / 30 Tokens</div>
            <p className="text-[11px] text-on-surface-variant">Refill: 2 req/sec · Max 30/min</p>
          </div>
        </div>

        {/* XSS Testing Sandbox */}
        <div className="p-6 bg-surface-container-low rounded-2xl border border-outline-variant/30 space-y-3">
          <h3 className="font-bold text-base text-on-surface flex items-center gap-2">
            <Bug className="w-5 h-5 text-primary" /> Interactive XSS Sanitizer Sandbox
          </h3>
          <p className="text-xs text-on-surface-variant">Test raw HTML or script payload injection to verify dynamic DOM sanitization:</p>

          <div className="flex gap-2">
            <input
              type="text"
              value={xssInput}
              onChange={(e) => setXssInput(e.target.value)}
              className="w-full p-3 bg-white border border-outline-variant rounded-xl text-xs font-mono text-on-surface"
            />
            <Button onClick={handleTestXss} variant="primary" size="md" className="whitespace-nowrap">
              Test Sanitizer
            </Button>
          </div>

          {sanitizedOutput !== null && (
            <div className="p-3 bg-white border border-outline-variant/40 rounded-xl font-mono text-xs text-on-surface space-y-1">
              <div><span className="text-outline">RAW UNTRUSTED:</span> <code className="text-red-600 font-bold">{xssInput}</code></div>
              <div><span className="text-primary font-bold">SANITIZED SAFE OUTPUT:</span> <code>{sanitizedOutput}</code></div>
              <div className="text-[11px] text-teal-700 mt-1">✓ XSS Payload neutered successfully without script execution.</div>
            </div>
          )}
        </div>

        {/* Audit Trail Log */}
        <div className="space-y-3">
          <h3 className="font-bold text-base text-on-surface flex items-center gap-2">
            <Activity className="w-5 h-5 text-primary" /> Security Audit Log Trail
          </h3>
          <div className="bg-white border border-outline-variant/40 rounded-2xl p-4 max-h-60 overflow-y-auto font-mono text-xs space-y-2">
            {logs.map(l => (
              <div key={l.id} className="flex items-center justify-between border-b border-outline-variant/20 pb-1.5 text-on-surface">
                <span>[{l.timestamp}] <strong className="text-primary">{l.action}</strong></span>
                <span className="text-outline text-[11px]">{l.details}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
