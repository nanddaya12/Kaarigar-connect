import React, { useState } from 'react';
import { Bot, Mic, Sparkles } from 'lucide-react';
import { aiService, AiDiagnosticResult } from '../../services/aiService';
import { Button } from '../ui/Button';

interface AiDiagnosticWidgetProps {
  onSelectKaarigar: (kaarigarId: string) => void;
}

export const AiDiagnosticWidget: React.FC<AiDiagnosticWidgetProps> = ({ onSelectKaarigar }) => {
  const [prompt, setPrompt] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [result, setResult] = useState<AiDiagnosticResult | null>(null);

  const samples = aiService.getSamplePrompts();

  const handleDiagnose = async (textToUse?: string) => {
    const text = textToUse !== undefined ? textToUse : prompt;
    const res = await aiService.diagnoseProblem(text);
    setResult(res);
  };

  const toggleMic = () => {
    setIsListening(!isListening);
    if (!isListening) {
      setTimeout(() => {
        setIsListening(false);
        setPrompt('AC inverter PCB cooling leak');
        handleDiagnose('AC inverter PCB cooling leak');
      }, 2500);
    }
  };

  return (
    <div className="bg-surface-container-lowest border border-outline-variant/40 rounded-3xl p-8 shadow-xl space-y-6">
      <div className="flex items-center gap-3 border-b border-outline-variant/30 pb-4">
        <div className="w-12 h-12 rounded-2xl bg-primary text-on-primary flex items-center justify-center text-2xl shadow-md">
          <Bot className="w-6 h-6" />
        </div>
        <div>
          <h2 className="font-headline font-bold text-2xl text-on-surface">Kaarigar AI Diagnostic Triage</h2>
          <p className="text-xs text-on-surface-variant">Describe your home repair issue in plain words to generate instant diagnosis & price estimate.</p>
        </div>
      </div>

      {/* Microphone & Waveform Section */}
      <div className="flex flex-col items-center justify-center space-y-3 py-2 bg-surface-container-low p-4 rounded-2xl border border-outline-variant/30">
        <button
          onClick={toggleMic}
          className={`w-16 h-16 rounded-full flex items-center justify-center text-white shadow-lg transition-all ${isListening ? 'bg-red-600 animate-pulse' : 'bg-primary hover:scale-105'}`}
        >
          <Mic className="w-7 h-7" />
        </button>
        <span className="text-xs font-bold text-on-surface">
          {isListening ? 'Listening to voice prompt in Urdu / English...' : 'Tap mic to speak repair issue'}
        </span>
      </div>

      {/* Text Prompt Input */}
      <div className="space-y-3">
        <label className="block text-xs font-bold uppercase tracking-wider text-outline">Or type problem details</label>
        <div className="relative">
          <textarea
            rows={3}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="E.g. Inverter AC blowing warm air and making rattling noise in Latifabad..."
            className="w-full p-4 bg-surface-container-low border border-outline-variant/60 rounded-2xl text-sm focus:outline-none focus:border-primary text-on-surface font-medium"
          />
          <Button
            onClick={() => handleDiagnose()}
            className="absolute bottom-3 right-3 shadow-md"
            size="sm"
          >
            <span>Diagnose Issue</span>
            <Sparkles className="w-4 h-4 ml-1" />
          </Button>
        </div>

        <div className="flex flex-wrap items-center gap-2 pt-2">
          <span className="text-[11px] font-bold text-outline">Try Sample Issues:</span>
          {samples.map((s, idx) => (
            <button
              key={idx}
              onClick={() => {
                setPrompt(s);
                handleDiagnose(s);
              }}
              className="px-2.5 py-1 bg-surface-container-low hover:bg-surface-container text-on-surface-variant text-[11px] font-medium rounded-lg transition-colors"
            >
              "{s}"
            </button>
          ))}
        </div>
      </div>

      {/* Diagnostic Results */}
      {result && (
        <div className="bg-surface-container-low border border-primary/40 rounded-2xl p-6 space-y-4 animate-fade-in">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-lg text-primary">{result.title}</h3>
            <span className="px-3 py-1 bg-primary text-on-primary text-xs font-bold rounded-full">
              Confidence: {result.confidenceScore}%
            </span>
          </div>

          <p className="text-xs text-on-surface-variant">{result.summary}</p>

          <div className="space-y-2">
            <strong className="text-xs text-outline uppercase font-bold">Diagnostic Steps Required:</strong>
            <div className="text-xs space-y-1 text-on-surface">
              {result.diagnosisSteps.map((step, idx) => (
                <p key={idx}>{step}</p>
              ))}
            </div>
          </div>

          <div className="p-4 bg-surface-container-lowest rounded-xl border border-outline-variant/40 flex items-center justify-between">
            <div>
              <span className="text-[10px] text-outline font-bold uppercase">Estimated Total Cost</span>
              <div className="text-xl font-extrabold text-primary font-mono">Rs. {result.priceBreakdown.totalEst}</div>
            </div>
            <Button
              onClick={() => onSelectKaarigar(result.recommendedKaarigarId)}
              variant="primary"
              size="md"
            >
              1-Click Dispatch Kaarigar
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
