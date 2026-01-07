'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { usePathname } from 'next/navigation'

type ThemeContextType = {
    isDark: boolean
    setIsDark: (value: boolean) => void
    toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: ReactNode }) {
    const [isDark, setIsDark] = useState(true)
    const [isLoading, setIsLoading] = useState(false)
    const [showContent, setShowContent] = useState(true)
    const pathname = usePathname()

    useEffect(() => {
        // Check for saved theme preference
        const savedTheme = localStorage.getItem('godev-theme')
        if (savedTheme) {
            setIsDark(savedTheme === 'dark')
        }
    }, [])

    useEffect(() => {
        // Save theme preference
        localStorage.setItem('godev-theme', isDark ? 'dark' : 'light')
    }, [isDark])

    // Handle page transitions
    useEffect(() => {
        setIsLoading(true)
        setShowContent(false)

        const timer = setTimeout(() => {
            setIsLoading(false)
            setShowContent(true)
        }, 800)

        return () => clearTimeout(timer)
    }, [pathname])

    const toggleTheme = () => setIsDark(!isDark)

    return (
        <ThemeContext.Provider value={{ isDark, setIsDark, toggleTheme }}>
            {/* Loading Screen */}
            <div
                className={`fixed inset-0 z-[100] flex items-center justify-center bg-black transition-all duration-500 ${isLoading ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                    }`}
            >
                <div className="flex flex-col items-center gap-4">
                    {/* Logo Text */}
                    <span
                        className="text-4xl md:text-5xl text-white animate-pulse"
                        style={{ fontFamily: 'var(--font-playfair)', fontStyle: 'italic' }}
                    >
                        GoDev<sup className="text-sm ml-0.5">®</sup>
                    </span>
                    {/* Loading Dots */}
                    <div className="flex gap-1">
                        <span className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                        <span className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                        <span className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                </div>
            </div>

            {/* Page Content */}
            <div
                className={`transition-opacity duration-300 ${showContent ? 'opacity-100' : 'opacity-0'
                    }`}
            >
                {children}
            </div>
        </ThemeContext.Provider>
    )
}

export function useTheme() {
    const context = useContext(ThemeContext)
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider')
    }
    return context
}
