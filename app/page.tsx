"use client";

import { useState } from "react";

export default function Home() {
  const [messages, setMessages] = useState([
    {
      role: 'chef',
      content:
        'You have chicken, garlic, rice, and spinach. We can turn this into something elegant. Would you prefer a creamy garlic skillet or a lighter herb rice bowl?',
    },
  ]);

  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  async function sendMessage() {
    if (!input.trim() || loading) return;

    const userMessage = {
      role: 'user',
      content: input,
    };

    setMessages((prev) => [...prev, userMessage]);

    const currentInput = input;
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          session_id: 'demo-session',
          message: currentInput,
          ingredients: ['chicken', 'rice', 'spinach', 'garlic'],
          creativity: 0.7,
          verbosity: 'normal',
        }),
      });

      const data = await response.json();

      setMessages((prev) => [
        ...prev,
        {
          role: 'chef',
          content: data.reply,
        },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: 'chef',
          content:
            'Something went wrong while contacting the kitchen. Please try again.',
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen overflow-hidden bg-[#06110d] text-white relative">
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.18),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(5,150,105,0.15),transparent_30%)]" />

      <div className="absolute -top-40 -left-32 h-[28rem] w-[28rem] rounded-full bg-emerald-500/20 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-[24rem] w-[24rem] rounded-full bg-green-400/10 blur-3xl" />

      <div className="relative z-10 flex min-h-screen">
        {/* Sidebar */}
        <aside className="hidden lg:flex w-[320px] flex-col border-r border-white/10 bg-white/5 backdrop-blur-2xl">
          <div className="p-8 border-b border-white/10">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-400/20 border border-emerald-300/20 shadow-[0_0_40px_rgba(16,185,129,0.25)]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-7 w-7 text-emerald-300"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 3c2.755 0 4.99 2.235 4.99 4.99 0 1.443-.613 2.744-1.594 3.655l-1.4 1.3A3.5 3.5 0 0 0 13 15.51V17m-1 4h.01"
                  />
                </svg>
              </div>

              <div>
                <h1 className="text-2xl font-semibold tracking-tight">
                  Yappuccino
                </h1>
                <p className="text-sm text-emerald-100/60 mt-1">
                  Refined AI culinary guidance
                </p>
              </div>
            </div>
          </div>

          <div className="p-6 space-y-5">
            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-white/70">Chef Style</span>
                <span className="text-xs rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-emerald-200">
                  Creative
                </span>
              </div>

              <input
                type="range"
                className="w-full accent-emerald-400"
                defaultValue={72}
              />
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-white/70">Ingredients</span>
                <span className="text-xs text-white/40">4 items</span>
              </div>

              <div className="flex flex-wrap gap-2">
                {['Chicken', 'Rice', 'Spinach', 'Garlic'].map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-emerald-400/10 bg-emerald-400/10 px-3 py-2 text-sm text-emerald-100"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-emerald-400/10 to-transparent p-5 backdrop-blur-xl">
              <p className="text-sm text-white/60 uppercase tracking-[0.2em] mb-3">
                Session
              </p>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-white/80">
                  <span>Current Recipe</span>
                  <span className="text-emerald-200">Creamy Garlic Chicken</span>
                </div>

                <div className="flex justify-between text-white/80">
                  <span>Current Step</span>
                  <span className="text-emerald-200">1 / 7</span>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Main */}
        <section className="flex-1 flex flex-col">
          {/* Topbar */}
          <header className="sticky top-0 z-20 border-b border-white/10 bg-black/10 backdrop-blur-2xl px-6 py-5">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-semibold tracking-tight">
                  AI Culinary Assistant
                </h2>
                <p className="text-sm text-white/50 mt-1">
                  Elegant conversational cooking guidance
                </p>
              </div>

              <button className="rounded-2xl border border-emerald-400/20 bg-emerald-400/10 px-5 py-3 text-sm font-medium text-emerald-100 transition hover:bg-emerald-400/20 hover:shadow-[0_0_30px_rgba(16,185,129,0.25)]">
                New Session
              </button>
            </div>
          </header>

          {/* Chat */}
          <div className="flex-1 overflow-y-auto px-6 py-8">
            <div className="mx-auto max-w-4xl space-y-6">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${
                    message.role === 'user'
                      ? 'justify-end'
                      : 'justify-start'
                  }`}
                >
                  <div
                    className={`max-w-[80%] rounded-[2rem] border px-6 py-5 backdrop-blur-2xl shadow-2xl ${
                      message.role === 'user'
                        ? 'border-emerald-400/20 bg-emerald-400/15 text-emerald-50'
                        : 'border-white/10 bg-white/[0.05] text-white/90'
                    }`}
                  >
                    <div className="mb-2 flex items-center gap-2">
                      <div
                        className={`h-2 w-2 rounded-full ${
                          message.role === 'user'
                            ? 'bg-emerald-300'
                            : 'bg-white/50'
                        }`}
                      />

                      <span className="text-xs uppercase tracking-[0.2em] text-white/40">
                        {message.role === 'user' ? 'You' : 'Chef'}
                      </span>
                    </div>

                    <p className="leading-8 text-[15px] text-white/85">
                      {message.content}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Input */}
          <div className="border-t border-white/10 bg-black/10 backdrop-blur-2xl p-6">
            <div className="mx-auto max-w-4xl">
              <div className="flex items-center gap-4 rounded-[2rem] border border-white/10 bg-white/[0.04] px-5 py-4 shadow-[0_10px_50px_rgba(0,0,0,0.35)] backdrop-blur-3xl">
                <input
                  placeholder="Ask the chef anything..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      sendMessage();
                    }
                  }}
                  className="flex-1 bg-transparent text-white placeholder:text-white/30 outline-none"
                />

                <button
                  onClick={sendMessage}
                  disabled={loading}
                  className="rounded-2xl bg-emerald-400 px-6 py-3 text-sm font-semibold text-black transition hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(16,185,129,0.4)] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? 'Cooking...' : 'Send'}
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
