// src/components/dashboard/AiAssistantWidget.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Send, ArrowRight } from 'lucide-react';
import { aiSuggestedPrompts, mockAiResponses } from '../../utils/mockData';

export default function AiAssistantWidget() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = (questionText) => {
    const q = (questionText || input).trim();
    if (!q) return;

    const userMsg = { id: Date.now(), sender: 'user', text: q };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const response =
        mockAiResponses[q] ||
        `Based on college records for ${q}: Information retrieved from official campus portal. You can view full details in the respective module or ask for more specifics.`;

      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, sender: 'assistant', text: response },
      ]);
      setIsTyping(false);
    }, 500);
  };

  return (
    <div className="flex flex-col rounded-3xl border border-slate-200/80 bg-white p-5 shadow-xs overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-blue-600" />
          <h3 className="font-bold text-slate-900 text-sm sm:text-base">AI Assistant</h3>
        </div>
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-indigo-50 border border-indigo-200 px-2.5 py-0.5 text-[11px] font-semibold text-indigo-700">
            Beta
          </span>
          <button
            onClick={() => navigate('/student/ai')}
            className="text-xs text-blue-600 hover:text-blue-800 font-medium flex items-center gap-0.5"
            title="Open Full Screen AI Assistant"
          >
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Robot Greeting & Conversation Area */}
      <div className="flex-1 py-3 overflow-y-auto max-h-[340px] space-y-3">
        {/* Initial Bot Welcome Box */}
        <div className="flex items-start gap-3 rounded-2xl bg-blue-50/60 p-3.5 border border-blue-100/70">
          <img
            src="/assets/ai_bot.jpg"
            alt="AI Assistant"
            className="h-11 w-11 shrink-0 rounded-full object-cover ring-2 ring-white shadow-xs"
          />
          <div className="text-xs text-slate-700 space-y-1">
            <p className="font-bold text-slate-900 flex items-center gap-1">
              Hi Rahul! <span className="inline-block">👋</span>
            </p>
            <p className="leading-relaxed text-slate-600">
              Ask me anything about your college — notices, exams, timetable, departments and more.
            </p>
          </div>
        </div>

        {/* Dynamic messages if any */}
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col ${
              msg.sender === 'user' ? 'items-end' : 'items-start'
            }`}
          >
            <div
              className={`max-w-[90%] rounded-2xl px-3.5 py-2 text-xs leading-relaxed ${
                msg.sender === 'user'
                  ? 'bg-blue-600 text-white font-medium rounded-br-xs'
                  : 'bg-slate-100 text-slate-800 rounded-bl-xs border border-slate-200/60 whitespace-pre-line'
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 rounded-full w-fit text-[11px] text-slate-500">
            <span className="h-1.5 w-1.5 bg-blue-600 rounded-full animate-pulse" />
            <span>Consulting campus database...</span>
          </div>
        )}

        {/* Suggested Quick Question Pills (shown if fewer than 2 messages) */}
        {messages.length < 2 && (
          <div className="space-y-1.5 pt-1">
            {aiSuggestedPrompts.map((prompt) => (
              <button
                key={prompt}
                onClick={() => handleSend(prompt)}
                className="w-full text-left rounded-xl bg-blue-50/40 hover:bg-blue-100/70 border border-blue-100/80 px-3 py-2 text-xs font-medium text-slate-700 hover:text-blue-700 transition-colors shadow-2xs"
              >
                {prompt}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Input box */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="mt-2 pt-3 border-t border-slate-100 flex items-center gap-2"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your question here..."
          className="flex-1 rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
        />
        <button
          type="submit"
          disabled={!input.trim()}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition-colors disabled:opacity-40"
          aria-label="Send message"
        >
          <Send className="h-4 w-4" />
        </button>
      </form>
    </div>
  );
}
