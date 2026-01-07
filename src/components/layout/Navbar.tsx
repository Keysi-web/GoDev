'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Menu, ChevronRight, Moon, Sun } from 'lucide-react'
import { useTheme } from '@/components/providers/ThemeProvider'

export function Navbar() {
    const { isDark, toggleTheme } = useTheme()
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const pathname = usePathname()

    const navItems = [
        { label: 'About', href: '/about' },
        { label: 'Services', href: '/services' },
        { label: 'Projects', href: '/projects' },
        { label: 'Contact', href: '/contact' },
        { label: 'Nexdev', href: 'https://nexdev-six.vercel.app/', external: true },
    ]

    const mobileNavItems = [
        { label: 'About', href: '/about' },
        { label: 'Services', href: '/services' },
        { label: 'Projects', href: '/projects' },
        { label: 'Contact', href: '/contact' },
        { label: 'Careers', href: '/careers' },
    ]

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-500 py-4">
            <div className="mx-auto max-w-7xl px-6 transition-all duration-500">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <div className="flex items-center">
                        <Link href="/">
                            <span
                                className={`text-2xl tracking-wide ${isDark ? 'text-white' : 'text-black'}`}
                                style={{ fontFamily: 'var(--font-playfair)', fontStyle: 'italic' }}
                            >
                                GoDev<sup className="text-[10px] ml-0.5">®</sup>
                            </span>
                        </Link>
                    </div>

                    {/* Navigation */}
                    <div className={`hidden md:flex items-center rounded-full transition-all duration-300 ${isDark
                        ? 'bg-zinc-900/80 border border-white/10'
                        : 'bg-gray-100/80 border border-gray-200/50'
                        } backdrop-blur-xl px-2 py-1.5`}>
                        {navItems.map((item) => (
                            item.external ? (
                                <a
                                    key={item.label}
                                    href={item.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`px-4 py-1.5 text-sm font-medium rounded-full transition-all duration-300 ${isDark
                                        ? 'text-gray-300 hover:text-white hover:bg-white/10'
                                        : 'text-gray-600 hover:text-black hover:bg-black/5'
                                        }`}
                                >
                                    {item.label}
                                </a>
                            ) : (
                                <Link
                                    key={item.label}
                                    href={item.href}
                                    className={`px-4 py-1.5 text-sm font-medium rounded-full transition-all duration-300 ${pathname === item.href
                                            ? isDark
                                                ? 'text-white bg-white/10'
                                                : 'text-black bg-black/5'
                                            : isDark
                                                ? 'text-gray-300 hover:text-white hover:bg-white/10'
                                                : 'text-gray-600 hover:text-black hover:bg-black/5'
                                        }`}
                                >
                                    {item.label}
                                </Link>
                            )
                        ))}
                    </div>

                    {/* Right Side - CTA Button */}
                    <div className="flex items-center space-x-3">
                        {/* Theme Toggle */}
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={toggleTheme}
                            className={`rounded-full hidden md:flex ${isDark ? 'hover:bg-white/10 text-white' : 'hover:bg-black/5 text-black'}`}
                        >
                            {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                        </Button>

                        {/* Get Started Button */}
                        <Link href="/contact">
                            <Button
                                className={`rounded-full px-5 py-2 text-sm font-medium hidden md:flex items-center gap-2 transition-all duration-300 ${isDark
                                    ? 'bg-white text-black hover:bg-gray-100 hover:scale-105'
                                    : 'bg-black text-white hover:bg-gray-800 hover:scale-105'
                                    }`}
                            >
                                Get Started
                                <ChevronRight className="h-4 w-4" />
                            </Button>
                        </Link>

                        {/* Mobile Menu */}
                        <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
                            <SheetTrigger asChild className="md:hidden">
                                <Button variant="ghost" size="icon" className={`rounded-full ${isDark ? 'hover:bg-white/10 text-white' : 'hover:bg-black/5 text-black'}`}>
                                    <Menu className="h-5 w-5" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent
                                side="right"
                                className={`w-[300px] sm:w-[400px] ${isDark
                                    ? 'bg-black/95 backdrop-blur-xl border-white/10 text-white'
                                    : 'bg-white/95 backdrop-blur-xl border-gray-200 text-black'
                                    }`}
                            >
                                <SheetTitle className={`text-2xl font-bold mb-8 ${isDark ? 'text-white' : 'text-black'}`}>
                                    Menu
                                </SheetTitle>

                                <div className="flex flex-col space-y-2">
                                    {mobileNavItems.map((item, index) => (
                                        <Link
                                            key={item.label}
                                            href={item.href}
                                            onClick={() => setIsMenuOpen(false)}
                                            className={`text-lg font-medium py-3 px-4 rounded-lg transition-all ${pathname === item.href
                                                    ? isDark
                                                        ? 'text-white bg-white/10'
                                                        : 'text-black bg-black/5'
                                                    : isDark
                                                        ? 'text-white hover:bg-white/10'
                                                        : 'text-black hover:bg-black/5'
                                                }`}
                                            style={{
                                                animationDelay: `${index * 0.05}s`,
                                                animation: 'fadeIn 0.3s ease-out forwards',
                                                opacity: 0
                                            }}
                                        >
                                            {item.label}
                                        </Link>
                                    ))}
                                </div>

                                <div className="absolute bottom-8 left-0 right-0 px-6 space-y-3">
                                    <Link href="/contact" onClick={() => setIsMenuOpen(false)}>
                                        <Button
                                            className={`w-full rounded-full py-6 text-base font-semibold ${isDark
                                                ? 'bg-white text-black hover:bg-gray-100'
                                                : 'bg-black text-white hover:bg-gray-900'
                                                }`}
                                        >
                                            Let's Chat!
                                            <ChevronRight className="ml-2 h-5 w-5" />
                                        </Button>
                                    </Link>

                                    <div className={`flex items-center justify-center pt-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={toggleTheme}
                                            className="rounded-full"
                                        >
                                            {isDark ? (
                                                <>
                                                    <Sun className="h-4 w-4 mr-2" />
                                                    Light Mode
                                                </>
                                            ) : (
                                                <>
                                                    <Moon className="h-4 w-4 mr-2" />
                                                    Dark Mode
                                                </>
                                            )}
                                        </Button>
                                    </div>
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </div>
        </nav>
    )
}
