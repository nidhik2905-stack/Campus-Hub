// src/pages/student/AIAssistant.jsx
import React, { useState } from 'react';
import { Sparkles, Send, Bot, User, Info, Database, ShieldCheck, RefreshCw, MessageSquare } from 'lucide-react';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';
import { aiSuggestedPrompts, mockAiResponses, currentUser } from '../../utils/mockData';

const initialChat = [
  {
    id: 1,
    sender: 'user',
    text: 'When is the DBMS exam?',
    time: '10:02 AM',
  },
  {
    id: 2,
    sender: 'assistant',
    text: 'According to the official Autumn 2024 examination schedule, your Database Management Systems (CS-601) examination is scheduled for **Wednesday, 25 October 2024 at 10:00 AM** in **Room 302, Academic Block A**.',
    source: 'Examination Cell circular NTC-101 / Oct 22, 2024',
    time: '10:02 AM',
  },
];

export default function AIAssistantPage() {
  const [messages, setMessages] = useState(initialChat);
  const [input, setInput] = useState('');
  const [isThinking, setIsThinking] = useState(false);

  const handleSend = (textToSend) => {
    const text = (textToSend || input).trim();
    if (!text) return;

    const userMessage = {
      id: Date.now(),
      sender: 'user',
      text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsThinking(true);

    setTimeout(() => {
      const reply =
        mockAiResponses[text] ||
        `Based on the official campus knowledge base for ${currentUser.program}: "${text}" corresponds to verified institutional records. You can check the corresponding module in the sidebar for full circulars or PDF downloads.`;

      const botMessage = {
        id: Date.now() + 1,
        sender: 'assistant',
        text: reply,
        source: 'Campus Information System (Verified Database)',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, botMessage]);
      setIsThinking(false);
    }, 600);
  };

  const handleReset = () => {
    setMessages(initialChat);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
              <Sparkles className="h-5 w-5" />
            </span>
            Campus AI Assistant
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Intelligent natural-language queries grounded in authoritative college notices, schedules, and regulations
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Badge variant="purple" size="md">
            Phase 1 UI Presentation • Static Mock AI
          </Badge>
          <Button variant="secondary" size="sm" icon={RefreshCw} onClick={handleReset}>
            Reset Chat
          </Button>
        </div>
      </div>

      {/* Main Grid: Left Chat Area (8 cols) + Right Information Panel (4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Chat Window */}
        <div className="lg:col-span-8 flex flex-col rounded-3xl border border-slate-200/80 bg-white shadow-xs overflow-hidden h-[620px]">
          {/* Top Bar of Chat */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50">
            <div className="flex items-center gap-3">
              <div className="relative">
                <img
                  src="/assets/ai_bot.jpg"
                  alt="AI Bot"
                  className="h-9 w-9 rounded-full object-cover ring-2 ring-blue-500/20"
                />
                <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-white" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">Campus Information Bot</h3>
                <p className="text-[11px] text-slate-500">Online • Grounded in College Data</p>
              </div>
            </div>
            <Badge variant="success" dot>
              Database Ready
            </Badge>
          </div>

          {/* Messages Flow */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 max-w-[85%] ${
                  msg.sender === 'user' ? 'ml-auto flex-row-reverse' : ''
                }`}
              >
                {msg.sender === 'assistant' ? (
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                    <Bot className="h-4 w-4" />
                  </div>
                ) : (
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-800 text-white">
                    <User className="h-4 w-4" />
                  </div>
                )}

                <div className="space-y-1">
                  <div
                    className={`rounded-2xl p-4 text-xs sm:text-sm leading-relaxed shadow-xs ${
                      msg.sender === 'user'
                        ? 'bg-blue-600 text-white rounded-tr-xs font-medium'
                        : 'bg-slate-100/90 text-slate-800 rounded-tl-xs border border-slate-200/60 whitespace-pre-line'
                    }`}
                  >
                    {msg.text}
                  </div>

                  <div className={`flex items-center gap-2 text-[10px] text-slate-400 px-1 ${
                    msg.sender === 'user' ? 'justify-end' : ''
                  }`}>
                    <span>{msg.time}</span>
                    {msg.source && (
                      <span className="text-blue-600 font-medium">
                        • Source: {msg.source}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {isThinking && (
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                  <Bot className="h-4 w-4" />
                </div>
                <div className="rounded-2xl bg-slate-100 p-3 text-xs text-slate-500 flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-blue-600 animate-ping" />
                  Searching official campus timetable and exam records...
                </div>
              </div>
            )}
          </div>

          {/* Quick Prompts Bar */}
          <div className="px-6 py-2 border-t border-slate-100 bg-slate-50/70 overflow-x-auto flex gap-2 scrollbar-none">
            {aiSuggestedPrompts.map((q) => (
              <button
                key={q}
                onClick={() => handleSend(q)}
                className="whitespace-nowrap rounded-lg bg-white border border-slate-200/80 px-2.5 py-1 text-xs text-slate-700 hover:border-blue-300 hover:text-blue-600 transition-colors shadow-2xs"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-4 border-t border-slate-100 flex items-center gap-2 bg-white"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything about college notices, exams, timetable, departments..."
              className="flex-1 rounded-xl border border-slate-200 bg-slate-50/80 px-4 py-3 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            />
            <Button
              type="submit"
              disabled={!input.trim()}
              icon={Send}
              className="px-4 py-3"
            >
              Ask AI
            </Button>
          </form>
        </div>

        {/* Right Info Panel */}
        <div className="lg:col-span-4 space-y-4">
          <Card padding="p-5">
            <h3 className="font-bold text-slate-900 text-sm sm:text-base flex items-center gap-2 mb-3">
              <Info className="h-4 w-4 text-blue-600" />
              About Campus AI
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              This assistant is college-specific. In later phases, it will connect to backend embeddings and Gemini LLM services to answer queries solely from verified college documents.
            </p>

            <div className="mt-4 pt-3 border-t border-slate-100 space-y-3">
              <div className="flex items-start gap-3">
                <Database className="h-4 w-4 text-cyan-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-semibold text-slate-800">Grounding Corpus</h4>
                  <p className="text-[11px] text-slate-500">
                    Syllabus, circulars, department announcements, and exam timetables.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-semibold text-slate-800">Role-Aware Safety</h4>
                  <p className="text-[11px] text-slate-500">
                    Students only receive data pertinent to their department, semester, and batch.
                  </p>
                </div>
              </div>
            </div>
          </Card>

          <Card padding="p-5" className="bg-gradient-to-br from-indigo-50/60 to-blue-50/60 border-indigo-100">
            <h4 className="text-xs font-bold text-indigo-900 uppercase tracking-wider mb-2">
              Sample Inquiries
            </h4>
            <ul className="space-y-2 text-xs text-indigo-800">
              <li>• “Where is the Networks lab held?”</li>
              <li>• “What are the eligibility criteria for the placement drive?”</li>
              <li>• “Who is the faculty advisor for CSE-B?”</li>
              <li>• “Show the deadline for backlog exam form submission.”</li>
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
}
