import React from 'react';
import { Search, Calendar, ShieldCheck, MapPin, PhoneCall, Star, CheckCircle2, ArrowRight, Zap, Award, UserCheck } from 'lucide-react';
import { Button } from '../../components/ui/Button';

interface HowItWorksPageProps {
  onNavigate: (view: string) => void;
}

export const HowItWorksPage: React.FC<HowItWorksPageProps> = ({ onNavigate }) => {
  const steps = [
    {
      step: '01',
      title: 'Search & Describe Your Issue',
      description: 'Enter what service you need (e.g. AC cooling leak, plumber fitting, car mechanic) or use Kaarigar AI for smart diagnostics.',
      icon: Search,
      badge: 'Step 1'
    },
    {
      step: '02',
      title: 'Select a Verified Craftsman',
      description: 'Compare transparent starting prices, customer ratings, distance in km, and Sindh Police CNIC verification badges.',
      icon: UserCheck,
      badge: 'Step 2'
    },
    {
      step: '03',
      title: 'Track Arrival & Doorstep Security',
      description: 'Receive a 4-digit doorstep security PIN (#8942) and track the provider’s live arrival in Latifabad, Qasimabad, or Saddar.',
      icon: ShieldCheck,
      badge: 'Step 3'
    },
    {
      step: '04',
      title: 'Job Completion & Payment',
      description: 'Inspect the completed work, pay via COD, JazzCash, or EasyPaisa, and leave an authentic review for the guild directory.',
      icon: CheckCircle2,
      badge: 'Step 4'
    }
  ];

  const guarantees = [
    {
      title: '100% CNIC & NADRA Verified',
      desc: 'Every provider undergoes physical background verification with local Sindh Craftsmen Guilds.',
      icon: Award
    },
    {
      title: 'Doorstep Security PIN',
      desc: 'Never open your door without verifying the 4-digit dispatch PIN provided in your app order tracker.',
      icon: ShieldCheck
    },
    {
      title: 'Fixed Transparent Pricing',
      desc: 'Inspection rates starting from Rs. 500 with no hidden surcharges or surprise costs.',
      icon: Zap
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-12 animate-in fade-in duration-200">
      {/* HERO SECTION */}
      <div className="bg-gradient-to-br from-[#004331] via-[#0d5c46] to-[#00281d] rounded-3xl p-8 sm:p-12 text-white shadow-2xl relative overflow-hidden text-center space-y-6 border border-emerald-800">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30 text-xs font-extrabold uppercase tracking-wider">
          <Zap className="w-3.5 h-3.5" /> How KaarigarConnect Works
        </div>

        <h1 className="font-headline font-extrabold text-3xl sm:text-5xl max-w-3xl mx-auto leading-tight text-white">
          Trusted Local Help for Hyderabad in <span className="text-amber-400">4 Simple Steps</span>
        </h1>

        <p className="text-sm sm:text-base text-emerald-100 max-w-2xl mx-auto font-medium leading-relaxed">
          From emergency AC repairs in Latifabad to plumbing in Qasimabad, KaarigarConnect links you directly with NADRA-verified skilled craftsmen.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <Button variant="primary" size="lg" onClick={() => onNavigate('explore')}>
            Find a Professional <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
          <a
            href="tel:0222784910"
            className="px-5 py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-extrabold text-xs flex items-center gap-2 border border-white/20 transition-colors"
          >
            <PhoneCall className="w-4 h-4 text-amber-400" /> Guild Helpline: 022-2784910
          </a>
        </div>
      </div>

      {/* 4 STEPS GRID */}
      <div className="space-y-6">
        <div className="text-center space-y-1">
          <h2 className="font-headline font-extrabold text-2xl text-slate-900">The Seamless Dispatch Journey</h2>
          <p className="text-xs text-slate-500 font-medium">Simple, secure, and hyper-local for every household in Sindh</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((s) => {
            const Icon = s.icon;
            return (
              <div
                key={s.step}
                className="bg-white p-6 rounded-3xl border border-slate-200 shadow-lg space-y-4 hover:border-emerald-500 transition-all group"
              >
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#004331] group-hover:bg-[#004331] group-hover:text-amber-400 transition-colors flex items-center justify-center font-extrabold shadow-sm">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="font-mono font-extrabold text-2xl text-slate-300 group-hover:text-amber-500 transition-colors">
                    {s.step}
                  </span>
                </div>

                <div>
                  <span className="text-[10px] font-extrabold text-[#004331] uppercase tracking-wider bg-emerald-50 px-2 py-0.5 rounded-full">
                    {s.badge}
                  </span>
                  <h3 className="font-headline font-extrabold text-base text-slate-900 mt-2">{s.title}</h3>
                  <p className="text-xs text-slate-600 font-medium mt-1.5 leading-relaxed">{s.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* TRUST & GUARANTEES */}
      <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-10 border border-slate-800 space-y-8 shadow-xl">
        <div className="text-center space-y-1">
          <h2 className="font-headline font-extrabold text-2xl text-white">Why Residents Trust KaarigarConnect</h2>
          <p className="text-xs text-emerald-400 font-bold uppercase tracking-wider">Built for Safety & Quality Assurance in Hyderabad</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {guarantees.map((g) => {
            const Icon = g.icon;
            return (
              <div key={g.title} className="bg-slate-800/80 p-6 rounded-2xl border border-slate-700 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-900 text-amber-400 flex items-center justify-center font-bold">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-sm text-white">{g.title}</h3>
                <p className="text-xs text-slate-300 font-medium leading-relaxed">{g.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
