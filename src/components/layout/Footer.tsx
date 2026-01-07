'use client'

import { useState } from 'react'
import Link from 'next/link'
import { MessageSquare, X, Send } from 'lucide-react'
import { useTheme } from '@/components/providers/ThemeProvider'

export function Footer() {
    const { isDark } = useTheme()
    const [isChatOpen, setIsChatOpen] = useState(false)
    const [messages, setMessages] = useState([
        { text: "Hi! How can we help you today?", sender: "agent" }
    ])
    const [inputValue, setInputValue] = useState("")

    const handleSendMessage = () => {
        if (inputValue.trim()) {
            setMessages([...messages, { text: inputValue, sender: "user" }])
            setInputValue("")

            setTimeout(() => {
                setMessages(prev => [...prev, {
                    text: "Thanks for your message! Our team will respond shortly.",
                    sender: "agent"
                }])
            }, 1000)
        }
    }

    return (
        <>
            {/* Footer */}
            <footer className="bg-black text-white pt-16 pb-8 relative overflow-hidden">
                <div className="container mx-auto px-6 max-w-6xl relative z-10">
                    {/* Top Section - Three Columns */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-24">
                        {/* Left Column - Location & Contact */}
                        <div className="space-y-8">
                            <div>
                                <p className="text-xs text-gray-500 uppercase tracking-wider mb-3">Location</p>
                                <p className="text-sm text-gray-300 leading-relaxed">
                                    Cebu City,<br />
                                    Philippines
                                </p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 uppercase tracking-wider mb-3">Contact</p>
                                <p className="text-sm text-gray-300 leading-relaxed">
                                    info@godev.com<br />
                                    +63 949 544 7748
                                </p>
                            </div>
                        </div>

                        {/* Center Column - Links */}
                        <div>
                            <p className="text-xs text-gray-500 uppercase tracking-wider mb-6">Links</p>
                            <ul className="space-y-4">
                                <li>
                                    <Link href="/about" className="text-xl md:text-2xl text-white hover:text-gray-400 transition-colors">
                                        About
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/projects" className="text-xl md:text-2xl text-white hover:text-gray-400 transition-colors">
                                        Projects
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/services" className="text-xl md:text-2xl text-white hover:text-gray-400 transition-colors">
                                        Services
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/contact" className="text-xl md:text-2xl text-white hover:text-gray-400 transition-colors">
                                        Contact
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        {/* Right Column - Socials */}
                        <div>
                            <p className="text-xs text-gray-500 uppercase tracking-wider mb-6">Socials</p>
                            <ul className="space-y-4">
                                <li>
                                    <a href="#" className="text-xl md:text-2xl text-white hover:text-gray-400 transition-colors">
                                        Facebook
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="text-xl md:text-2xl text-white hover:text-gray-400 transition-colors">
                                        X(Twitter)
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="text-xl md:text-2xl text-white hover:text-gray-400 transition-colors">
                                        Instagram
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="text-xl md:text-2xl text-white hover:text-gray-400 transition-colors">
                                        LinkedIn
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Large Watermark Logo */}
                    <div className="relative h-32 md:h-48 mb-12 overflow-hidden">
                        <div
                            className="absolute inset-0 flex items-center justify-center text-[8rem] md:text-[12rem] lg:text-[16rem] font-bold tracking-tighter select-none pointer-events-none"
                            style={{
                                fontFamily: 'var(--font-playfair)',
                                fontStyle: 'italic',
                                background: 'linear-gradient(to bottom, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.02) 100%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text',
                            }}
                        >
                            GoDev
                        </div>
                    </div>

                    {/* Divider */}
                    <div className="h-px bg-zinc-800 mb-6"></div>

                    {/* Bottom Bar */}
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-xs text-gray-500">
                            © 2025 <span className="text-white">GoDev</span>. All Rights Reserved
                        </p>
                        <div className="flex items-center gap-6">
                            <Link href="/privacy" className="text-xs text-gray-500 hover:text-white transition-colors">
                                Privacy Policy
                            </Link>
                            <Link href="/terms" className="text-xs text-gray-500 hover:text-white transition-colors">
                                Terms of Service
                            </Link>
                            <button
                                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                                className="flex items-center gap-2 text-xs text-gray-400 hover:text-white transition-colors group"
                            >
                                Back to Top
                                <span className="w-8 h-8 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center group-hover:bg-zinc-700 transition-colors">
                                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M18 15l-6-6-6 6" />
                                    </svg>
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </footer>

            {/* Live Chat Widget */}
            {!isChatOpen && (
                <div className="fixed bottom-6 right-6 z-50">
                    <button
                        onClick={() => setIsChatOpen(true)}
                        className="bg-black hover:bg-gray-900 text-white rounded-full p-4 shadow-2xl transition-all duration-300 hover:scale-105"
                    >
                        <MessageSquare className="h-6 w-6" />
                    </button>
                </div>
            )}

            {/* Chat Window */}
            {isChatOpen && (
                <div className="fixed bottom-6 right-6 z-50 w-96 h-[500px] bg-white rounded-lg shadow-2xl flex flex-col border border-gray-200">
                    {/* Chat Header */}
                    <div className="bg-black text-white p-4 rounded-t-lg flex justify-between items-center">
                        <div>
                            <h3 className="font-semibold text-sm tracking-wide">Live Chat</h3>
                            <p className="text-xs text-gray-400 font-normal">We typically reply in minutes</p>
                        </div>
                        <button
                            onClick={() => setIsChatOpen(false)}
                            className="hover:bg-gray-900 p-1 rounded transition-colors"
                        >
                            <X className="h-5 w-5" />
                        </button>
                    </div>

                    {/* Messages Area */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                        {messages.map((msg, idx) => (
                            <div
                                key={idx}
                                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                                <div
                                    className={`max-w-[80%] px-4 py-2 rounded-lg text-sm ${msg.sender === 'user'
                                        ? 'bg-black text-white'
                                        : 'bg-gray-100 text-gray-900'
                                        }`}
                                >
                                    {msg.text}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Input Area */}
                    <div className="p-4 border-t border-gray-200">
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                                placeholder="Type your message..."
                                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-black text-sm"
                            />
                            <button
                                onClick={handleSendMessage}
                                className="bg-black hover:bg-gray-900 text-white p-2 rounded-lg transition-colors"
                            >
                                <Send className="h-5 w-5" />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
