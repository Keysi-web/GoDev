'use client'

import { useState, useEffect } from 'react'
import { X, Cookie, Settings } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface CookiePreferences {
    necessary: boolean
    analytics: boolean
    marketing: boolean
    preferences: boolean
}

export function CookieConsent() {
    const [isVisible, setIsVisible] = useState(false)
    const [showSettings, setShowSettings] = useState(false)
    const [preferences, setPreferences] = useState<CookiePreferences>({
        necessary: true,
        analytics: false,
        marketing: false,
        preferences: false,
    })

    useEffect(() => {
        // Check if user has already set cookie preferences
        const hasConsent = localStorage.getItem('cookie-consent')
        if (!hasConsent) {
            // Delay showing the banner for better UX
            const timer = setTimeout(() => setIsVisible(true), 1500)
            return () => clearTimeout(timer)
        }
    }, [])

    const acceptAll = () => {
        const allAccepted: CookiePreferences = {
            necessary: true,
            analytics: true,
            marketing: true,
            preferences: true,
        }
        setPreferences(allAccepted)
        savePreferences(allAccepted)
        setIsVisible(false)
    }

    const acceptNecessary = () => {
        const necessaryOnly: CookiePreferences = {
            necessary: true,
            analytics: false,
            marketing: false,
            preferences: false,
        }
        setPreferences(necessaryOnly)
        savePreferences(necessaryOnly)
        setIsVisible(false)
    }

    const savePreferences = (prefs: CookiePreferences) => {
        localStorage.setItem('cookie-consent', JSON.stringify({
            preferences: prefs,
            timestamp: new Date().toISOString(),
        }))
    }

    const handleSavePreferences = () => {
        savePreferences(preferences)
        setIsVisible(false)
        setShowSettings(false)
    }

    if (!isVisible) return null

    return (
        <AnimatePresence>
            <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 100, opacity: 0 }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                className="fixed bottom-0 left-0 right-0 z-[100] p-4 md:p-6"
            >
                <div className="max-w-4xl mx-auto">
                    <div className="bg-zinc-950 border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
                        {/* Main Banner */}
                        {!showSettings ? (
                            <div className="p-6 md:p-8">
                                <div className="flex items-start gap-4">
                                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500/20 to-orange-500/10 flex items-center justify-center">
                                        <Cookie className="w-6 h-6 text-amber-400" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-lg font-semibold text-white mb-2">We value your privacy</h3>
                                        <p className="text-sm text-gray-400 leading-relaxed mb-4">
                                            We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic.
                                            By clicking "Accept All", you consent to our use of cookies.{' '}
                                            <a href="/privacy" className="text-white underline hover:text-amber-400 transition-colors">
                                                Read our Privacy Policy
                                            </a>
                                        </p>
                                        <div className="flex flex-wrap items-center gap-3">
                                            <button
                                                onClick={acceptAll}
                                                className="px-6 py-2.5 bg-white text-black font-medium rounded-full hover:bg-gray-100 transition-all duration-200 text-sm"
                                            >
                                                Accept All
                                            </button>
                                            <button
                                                onClick={acceptNecessary}
                                                className="px-6 py-2.5 bg-zinc-800 text-white font-medium rounded-full hover:bg-zinc-700 transition-all duration-200 text-sm border border-white/10"
                                            >
                                                Necessary Only
                                            </button>
                                            <button
                                                onClick={() => setShowSettings(true)}
                                                className="flex items-center gap-2 px-4 py-2.5 text-gray-400 hover:text-white transition-colors text-sm"
                                            >
                                                <Settings className="w-4 h-4" />
                                                Manage Preferences
                                            </button>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => setIsVisible(false)}
                                        className="flex-shrink-0 p-2 text-gray-500 hover:text-white transition-colors"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        ) : (
                            /* Settings Panel */
                            <div className="p-6 md:p-8">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-lg font-semibold text-white">Cookie Preferences</h3>
                                    <button
                                        onClick={() => setShowSettings(false)}
                                        className="p-2 text-gray-500 hover:text-white transition-colors"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>

                                <div className="space-y-4 mb-6">
                                    {[
                                        {
                                            key: 'necessary' as const,
                                            title: 'Strictly Necessary',
                                            description: 'Essential for the website to function. Cannot be disabled.',
                                            disabled: true,
                                        },
                                        {
                                            key: 'analytics' as const,
                                            title: 'Analytics',
                                            description: 'Help us understand how visitors interact with our website.',
                                            disabled: false,
                                        },
                                        {
                                            key: 'marketing' as const,
                                            title: 'Marketing',
                                            description: 'Used to deliver personalized advertisements.',
                                            disabled: false,
                                        },
                                        {
                                            key: 'preferences' as const,
                                            title: 'Preferences',
                                            description: 'Remember your settings and preferences for a better experience.',
                                            disabled: false,
                                        },
                                    ].map((cookie) => (
                                        <div
                                            key={cookie.key}
                                            className={`flex items-center justify-between p-4 rounded-xl ${cookie.disabled ? 'bg-zinc-900/50' : 'bg-zinc-900 hover:bg-zinc-800/80'
                                                } transition-colors`}
                                        >
                                            <div className="flex-1 mr-4">
                                                <h4 className="text-sm font-medium text-white mb-1">{cookie.title}</h4>
                                                <p className="text-xs text-gray-500">{cookie.description}</p>
                                            </div>
                                            <label className="relative inline-flex items-center cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    checked={preferences[cookie.key]}
                                                    onChange={(e) =>
                                                        !cookie.disabled &&
                                                        setPreferences({ ...preferences, [cookie.key]: e.target.checked })
                                                    }
                                                    disabled={cookie.disabled}
                                                    className="sr-only peer"
                                                />
                                                <div
                                                    className={`w-11 h-6 rounded-full peer ${cookie.disabled
                                                            ? 'bg-emerald-500/50 cursor-not-allowed'
                                                            : 'bg-zinc-700 peer-checked:bg-emerald-500'
                                                        } peer-focus:outline-none transition-colors after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-5`}
                                                ></div>
                                            </label>
                                        </div>
                                    ))}
                                </div>

                                <div className="flex justify-end gap-3">
                                    <button
                                        onClick={() => setShowSettings(false)}
                                        className="px-6 py-2.5 text-gray-400 hover:text-white transition-colors text-sm"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleSavePreferences}
                                        className="px-6 py-2.5 bg-white text-black font-medium rounded-full hover:bg-gray-100 transition-all duration-200 text-sm"
                                    >
                                        Save Preferences
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    )
}
