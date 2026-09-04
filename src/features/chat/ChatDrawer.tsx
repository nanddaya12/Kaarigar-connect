import React, { useState, useEffect } from 'react';
import { X, Send, Image, MessageSquare } from 'lucide-react';
import { chatService } from '../../services/chatService';
import { ChatMessage } from '../../types/database.types';
import { Button } from '../../components/ui/Button';

interface ChatDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ChatDrawer: React.FC<ChatDrawerProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    if (isOpen) {
      chatService.getMessages('conv-101').then(setMessages);
    }
  }, [isOpen]);

  const handleSend = async () => {
    if (!input.trim()) return;
    const newMsg = await chatService.sendMessage('conv-101', 'cust-101', 'Shahid Mehmood', input);
    setMessages([...messages, newMsg]);
    setInput('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-white shadow-2xl border-l border-outline-variant/40 flex flex-col justify-between animate-fade-in">
      {/* Drawer Header */}
      <div className="p-4 border-b border-outline-variant/30 flex items-center justify-between bg-surface-container-low">
        <div className="flex items-center gap-3">
          <MessageSquare className="w-5 h-5 text-primary" />
          <div>
            <h3 className="font-bold text-sm text-on-surface">Imran Ali (Senior Electrician)</h3>
            <p className="text-[10px] text-primary font-semibold">● Online · Direct Chat</p>
          </div>
        </div>
        <button onClick={onClose} className="p-1 rounded-full hover:bg-surface-container text-outline">
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Messages Body */}
      <div className="p-4 flex-grow overflow-y-auto space-y-3 font-body text-xs">
        {messages.map(msg => {
          const isCustomer = msg.sender_id === 'cust-101';
          return (
            <div key={msg.id} className={`flex flex-col ${isCustomer ? 'items-end' : 'items-start'}`}>
              <span className="text-[10px] text-outline mb-0.5">{msg.sender_name}</span>
              <div className={`p-3 rounded-2xl max-w-[80%] shadow-xs ${isCustomer ? 'bg-primary text-white rounded-br-none' : 'bg-surface-container-low text-on-surface rounded-bl-none border'}`}>
                {msg.message}
              </div>
              <span className="text-[9px] text-outline mt-0.5">
                {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          );
        })}
      </div>

      {/* Input Bar */}
      <div className="p-3 border-t border-outline-variant/30 bg-surface-container-lowest flex items-center gap-2">
        <button className="p-2 text-outline hover:text-primary rounded-lg transition-colors">
          <Image className="w-5 h-5" />
        </button>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Type message to technician..."
          className="w-full p-2.5 bg-surface-container-low border border-outline-variant/40 rounded-xl text-xs text-on-surface focus:outline-none focus:border-primary"
        />
        <Button variant="primary" size="sm" onClick={handleSend}>
          <Send className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};
