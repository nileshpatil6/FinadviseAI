'use client';

import { FormEvent, useEffect, useRef, useState } from 'react';
import { MessageCircle, Send, ShieldAlert, Sparkles, X, ExternalLink } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

type ChatRole = 'user' | 'assistant';

interface GroundingSource {
  uri: string;
  title: string;
}

interface ChatMessage {
  role: ChatRole;
  content: string;
  sources?: GroundingSource[];
}

const initialMessages: ChatMessage[] = [
  {
    role: 'assistant',
    content:
      'Hi! I am FinadAI Assistant. Ask me anything about credit cards, loans, insurance, or investments and I will walk you through the considerations.',
  },
];

export function FinancialAdvisorChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const conversationEndRef = useRef<HTMLDivElement | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      textareaRef.current?.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    conversationEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOpen]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = input.trim();

    if (!trimmed || isLoading) {
      return;
    }

    const nextMessages: ChatMessage[] = [...messages, { role: 'user', content: trimmed }];
    setMessages(nextMessages);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/financial-advice', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: nextMessages }),
      });

      const data = await response.json();

      if (!response.ok || !data?.success) {
        const errorMessage = data?.error || 'Sorry, I could not process that. Please try asking in a different way.';
        setMessages((prev) => [...prev, { role: 'assistant', content: errorMessage }]);
        return;
      }

      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: data.message as string,
          sources: data.sources as GroundingSource[] | undefined
        }
      ]);
    } catch (error) {
      console.error('Chat request failed', error);
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: 'I had trouble reaching the financial advice service. Please check your connection and try again.',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-3 text-white shadow-xl transition hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-4 focus:ring-blue-300/50"
        aria-haspopup="dialog"
        aria-expanded={isOpen}
      >
        <MessageCircle className="h-5 w-5" />
        <span className="text-sm font-semibold">Ask FinadAI</span>
      </button>

      {isOpen && (
        <div className="fixed bottom-6 right-6 left-6 md:left-auto z-50 w-auto md:w-full md:max-w-md lg:max-w-lg transform rounded-3xl bg-white shadow-2xl ring-1 ring-black/5 transition-all">
          <div className="flex items-start justify-between border-b border-gray-100 p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-600 p-2 text-white shadow-lg">
                <Sparkles className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-gray-900">FinadAI Assistant</h3>
                <p className="text-xs text-gray-500">Financial insights tailored for you</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="rounded-full p-1 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
              aria-label="Close chatbot"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="flex max-h-[50vh] md:max-h-[420px] flex-col gap-3 overflow-y-auto px-4 py-4 text-sm text-gray-800">
            {messages.map((message, index) => (
              <div
                key={`${message.role}-${index}`}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] md:max-w-[80%] rounded-2xl px-4 py-3 shadow-sm ${
                    message.role === 'user'
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  {message.role === 'assistant' ? (
                    <>
                      <div className="prose prose-sm max-w-none">
                        <ReactMarkdown
                          components={{
                            p: ({ children }) => <p className="mb-2 last:mb-0 leading-relaxed">{children}</p>,
                            strong: ({ children }) => <strong className="font-bold text-gray-900">{children}</strong>,
                            em: ({ children }) => <em className="italic">{children}</em>,
                            ul: ({ children }) => <ul className="list-disc list-inside space-y-1 my-2">{children}</ul>,
                            ol: ({ children }) => <ol className="list-decimal list-inside space-y-1 my-2">{children}</ol>,
                            li: ({ children }) => <li className="leading-relaxed">{children}</li>,
                            h1: ({ children }) => <h1 className="text-lg font-bold mb-2 text-gray-900">{children}</h1>,
                            h2: ({ children }) => <h2 className="text-base font-bold mb-2 text-gray-900">{children}</h2>,
                            h3: ({ children }) => <h3 className="text-sm font-bold mb-1 text-gray-900">{children}</h3>,
                            code: ({ children }) => <code className="bg-gray-200 px-1 py-0.5 rounded text-xs">{children}</code>,
                            a: ({ children, href }) => (
                              <a href={href} className="text-blue-600 underline hover:text-blue-800" target="_blank" rel="noopener noreferrer">
                                {children}
                              </a>
                            ),
                          }}
                        >
                          {message.content}
                        </ReactMarkdown>
                      </div>
                      {message.sources && message.sources.length > 0 && (
                        <div className="mt-3 border-t border-gray-200 pt-2">
                          <p className="text-xs font-semibold text-gray-600 mb-1">Sources:</p>
                          <div className="space-y-1">
                            {message.sources.map((source, idx) => (
                              <a
                                key={idx}
                                href={source.uri}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-start gap-1.5 text-xs text-blue-600 hover:text-blue-800 hover:underline"
                              >
                                <ExternalLink className="h-3 w-3 mt-0.5 flex-shrink-0" />
                                <span className="line-clamp-1">{source.title}</span>
                              </a>
                            ))}
                          </div>
                        </div>
                      )}
                    </>
                  ) : (
                    <p className="whitespace-pre-wrap leading-relaxed">{message.content}</p>
                  )}
                </div>
              </div>
            ))}
            <div ref={conversationEndRef} />
          </div>

          <div className="border-t border-gray-100 bg-gray-50 px-4 py-3">
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <textarea
                ref={textareaRef}
                rows={2}
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="Ask about credit cards, loans, insurance..."
                className="w-full resize-none rounded-2xl border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 shadow-inner focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200/60"
                aria-label="Type your financial question"
              />
              <button
                type="submit"
                disabled={isLoading}
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-lg transition hover:from-blue-700 hover:to-indigo-700 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isLoading ? (
                  <>
                    <span className="h-2 w-2 animate-ping rounded-full bg-white/80" />
                    Thinking...
                  </>
                ) : (
                  <>
                    Send
                    <Send className="h-4 w-4" />
                  </>
                )}
              </button>
            </form>
            <div className="mt-3 flex items-start gap-2 text-xs text-gray-500">
              <ShieldAlert className="mt-0.5 h-4 w-4 flex-shrink-0 text-blue-500" />
              <p>
                Guidance is for informational purposes. Review specifics with your bank or a licensed financial
                advisor before making decisions.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
