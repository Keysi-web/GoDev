'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useTheme } from '@/components/providers/ThemeProvider'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import {
    AnimatedSection,
    AnimatedDiv,
    StaggerContainer,
    StaggerItem,
    PageTransition,
    HoverCard
} from '@/components/ui/animations'

export default function ServicesPage() {
    const { isDark } = useTheme()

    return (
        <PageTransition>
            <div className={`min-h-screen transition-colors duration-500 ${isDark ? 'bg-black text-white' : 'bg-gray-50 text-gray-900'}`}>
                <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        
        .float-3d {
          animation: float 6s ease-in-out infinite;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>

                <Navbar />

                {/* Hero Section */}
                <AnimatedSection className="pt-32 pb-16 relative overflow-hidden">
                    <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-white/5 rounded-full blur-3xl float-3d" />
                    <div className="container mx-auto px-4 md:px-6 relative z-10">
                        <div className="max-w-4xl">
                            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6 ${isDark
                                ? 'bg-white/10 border border-white/20 text-white'
                                : 'bg-black/5 border border-black/10 text-black'
                                }`}>
                                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M12 2L2 7l10 5 10-5-10-5z" />
                                    <path d="M2 17l10 5 10-5" />
                                    <path d="M2 12l10 5 10-5" />
                                </svg>
                                Our Services
                            </div>
                            <h1 className="text-5xl md:text-6xl lg:text-7xl mb-6">
                                <span style={{ fontFamily: 'var(--font-playfair)', fontStyle: 'italic' }}>What</span>
                                {' '}
                                <span className="font-semibold">We Do</span>
                            </h1>
                            <p className={`text-lg md:text-xl max-w-2xl ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                                We craft digital experiences from idea to launch — blending strategy, design, and engineering to build products that perform.
                            </p>
                        </div>
                    </div>
                </AnimatedSection>

                {/* Services Section */}
                <AnimatedSection className="py-16 md:py-24 relative overflow-hidden">
                    <canvas
                        ref={(canvas) => {
                            if (canvas && !canvas.dataset.servicesInitialized) {
                                canvas.dataset.servicesInitialized = 'true';
                                const ctx = canvas.getContext('2d');
                                if (!ctx) return;

                                const resize = () => {
                                    canvas.width = window.innerWidth;
                                    canvas.height = canvas.parentElement?.offsetHeight || 800;
                                };
                                resize();
                                window.addEventListener('resize', resize);

                                let time = 0;
                                const animate = () => {
                                    ctx.clearRect(0, 0, canvas.width, canvas.height);

                                    ctx.strokeStyle = isDark ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.03)';
                                    ctx.lineWidth = 1;

                                    for (let y = 0; y < canvas.height; y += 20) {
                                        ctx.beginPath();
                                        for (let x = 0; x <= canvas.width; x += 5) {
                                            const wave = Math.sin(x * 0.01 + time * 0.02 + y * 0.01) * 5;
                                            if (x === 0) {
                                                ctx.moveTo(x, y + wave);
                                            } else {
                                                ctx.lineTo(x, y + wave);
                                            }
                                        }
                                        ctx.stroke();
                                    }

                                    time += 1;
                                    requestAnimationFrame(animate);
                                };
                                animate();
                            }
                        }}
                        className="absolute inset-0 z-0 pointer-events-none"
                    />
                    <div className="container mx-auto px-4 md:px-6 relative z-10">
                        {/* Services Cards Grid - Row 1 */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 mb-0">
                            {[
                                {
                                    title: 'Website Development',
                                    description: 'Custom, scalable web applications built with modern technologies',
                                    icon: (
                                        <svg className="w-16 h-16 md:w-20 md:h-20" viewBox="0 0 80 80" fill="none">
                                            <rect x="10" y="15" width="60" height="50" rx="8" fill={isDark ? '#2a2a2a' : '#e5e5e5'} stroke={isDark ? '#4a4a4a' : '#d1d1d1'} strokeWidth="1" />
                                            <rect x="10" y="15" width="60" height="12" rx="8" fill={isDark ? '#3a3a3a' : '#ddd'} />
                                            <circle cx="22" cy="21" r="3" fill={isDark ? '#5a5a5a' : '#bbb'} />
                                            <circle cx="32" cy="21" r="3" fill={isDark ? '#4a4a4a' : '#ccc'} />
                                            <circle cx="42" cy="21" r="3" fill={isDark ? '#4a4a4a' : '#ccc'} />
                                            <path d="M25 40l8 8-8 8" stroke={isDark ? '#5a5a5a' : '#999'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M45 56h15" stroke={isDark ? '#4a4a4a' : '#bbb'} strokeWidth="2" strokeLinecap="round" />
                                        </svg>
                                    )
                                },
                                {
                                    title: 'Mobile App Development',
                                    description: 'Native and cross-platform mobile apps for iOS and Android',
                                    icon: (
                                        <svg className="w-16 h-16 md:w-20 md:h-20" viewBox="0 0 80 80" fill="none">
                                            <rect x="22" y="8" width="36" height="64" rx="8" fill={isDark ? '#2a2a2a' : '#e5e5e5'} stroke={isDark ? '#4a4a4a' : '#d1d1d1'} strokeWidth="1" />
                                            <rect x="26" y="16" width="28" height="40" rx="2" fill={isDark ? '#1a1a1a' : '#f5f5f5'} />
                                            <circle cx="40" cy="64" r="4" fill={isDark ? '#4a4a4a' : '#ccc'} />
                                            <rect x="35" y="10" width="10" height="3" rx="1" fill={isDark ? '#3a3a3a' : '#ddd'} />
                                        </svg>
                                    )
                                },
                                {
                                    title: 'UI/UX & Website Design',
                                    description: 'Beautiful, intuitive designs that delight users and drive conversions',
                                    icon: (
                                        <svg className="w-16 h-16 md:w-20 md:h-20" viewBox="0 0 80 80" fill="none">
                                            <circle cx="40" cy="40" r="28" fill={isDark ? '#2a2a2a' : '#e5e5e5'} stroke={isDark ? '#4a4a4a' : '#d1d1d1'} strokeWidth="1" />
                                            <circle cx="30" cy="28" r="6" fill={isDark ? '#5a5a5a' : '#bbb'} />
                                            <circle cx="50" cy="28" r="6" fill={isDark ? '#4a4a4a' : '#ccc'} />
                                            <circle cx="25" cy="45" r="6" fill={isDark ? '#3a3a3a' : '#ddd'} />
                                            <circle cx="55" cy="45" r="6" fill={isDark ? '#4a4a4a' : '#ccc'} />
                                            <circle cx="52" cy="58" r="8" fill={isDark ? '#2a2a2a' : '#e5e5e5'} stroke={isDark ? '#4a4a4a' : '#d1d1d1'} strokeWidth="1" />
                                        </svg>
                                    )
                                },
                                {
                                    title: 'E-commerce Solutions',
                                    description: 'Complete online stores with payment integration and inventory management',
                                    icon: (
                                        <svg className="w-16 h-16 md:w-20 md:h-20" viewBox="0 0 80 80" fill="none">
                                            <path d="M15 20h8l8 35h30l6-25H28" stroke={isDark ? '#4a4a4a' : '#ccc'} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                                            <circle cx="35" cy="62" r="5" fill={isDark ? '#3a3a3a' : '#ddd'} stroke={isDark ? '#4a4a4a' : '#ccc'} strokeWidth="2" />
                                            <circle cx="55" cy="62" r="5" fill={isDark ? '#3a3a3a' : '#ddd'} stroke={isDark ? '#4a4a4a' : '#ccc'} strokeWidth="2" />
                                            <rect x="40" y="28" width="18" height="14" rx="2" fill={isDark ? '#2a2a2a' : '#e5e5e5'} stroke={isDark ? '#5a5a5a' : '#bbb'} strokeWidth="1" />
                                        </svg>
                                    )
                                }
                            ].map((service, index) => (
                                <div
                                    key={index}
                                    className={`group relative p-6 md:p-8 transition-all duration-300 border-t border-b ${index === 0 ? 'rounded-tl-[2rem] sm:rounded-tl-[2.5rem] border-l lg:rounded-bl-none' : ''
                                        } ${index === 3 ? 'rounded-tr-[2rem] sm:rounded-tr-[2.5rem] border-r lg:rounded-br-none' : ''
                                        } ${isDark
                                            ? 'border-white/10 hover:bg-white/5'
                                            : 'border-gray-200 hover:bg-gray-50'
                                        } ${index === 0 ? 'sm:rounded-tl-[2.5rem] sm:border-b-0 lg:border-b' : ''
                                        } ${index === 1 ? 'sm:border-r sm:border-b-0 lg:border-b lg:border-r-0' : ''
                                        } ${index === 2 ? 'sm:border-l lg:border-l-0' : ''
                                        }`}
                                >
                                    <div className="mb-6 md:mb-8 opacity-80 group-hover:opacity-100 transition-opacity duration-300">
                                        {service.icon}
                                    </div>
                                    <h3 className="text-xl md:text-2xl font-semibold mb-3">
                                        {service.title}
                                    </h3>
                                    <p className={`text-sm md:text-base leading-relaxed ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                                        {service.description}
                                    </p>
                                </div>
                            ))}
                        </div>

                        {/* Services Cards Grid - Row 2 */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0">
                            {[
                                {
                                    title: 'AI Automation',
                                    description: 'Intelligent automation solutions powered by cutting-edge AI technology',
                                    icon: (
                                        <svg className="w-16 h-16 md:w-20 md:h-20" viewBox="0 0 80 80" fill="none">
                                            <rect x="20" y="20" width="40" height="35" rx="8" fill={isDark ? '#2a2a2a' : '#e5e5e5'} stroke={isDark ? '#4a4a4a' : '#d1d1d1'} strokeWidth="1" />
                                            <circle cx="32" cy="35" r="5" fill={isDark ? '#4a4a4a' : '#ccc'} />
                                            <circle cx="48" cy="35" r="5" fill={isDark ? '#4a4a4a' : '#ccc'} />
                                            <path d="M32 46h16" stroke={isDark ? '#5a5a5a' : '#bbb'} strokeWidth="2" strokeLinecap="round" />
                                            <rect x="36" y="10" width="8" height="10" rx="2" fill={isDark ? '#3a3a3a' : '#ddd'} />
                                            <rect x="25" y="55" width="30" height="8" rx="2" fill={isDark ? '#3a3a3a' : '#ddd'} />
                                            <rect x="30" y="63" width="8" height="8" rx="1" fill={isDark ? '#4a4a4a' : '#ccc'} />
                                            <rect x="42" y="63" width="8" height="8" rx="1" fill={isDark ? '#4a4a4a' : '#ccc'} />
                                        </svg>
                                    )
                                },
                                {
                                    title: 'Chat Support Systems',
                                    description: 'Real-time chat solutions to enhance customer engagement',
                                    icon: (
                                        <svg className="w-16 h-16 md:w-20 md:h-20" viewBox="0 0 80 80" fill="none">
                                            <path d="M15 20h35a8 8 0 018 8v20a8 8 0 01-8 8H30l-10 10v-10h-5a8 8 0 01-8-8V28a8 8 0 018-8z" fill={isDark ? '#2a2a2a' : '#e5e5e5'} stroke={isDark ? '#4a4a4a' : '#d1d1d1'} strokeWidth="1" />
                                            <circle cx="25" cy="38" r="3" fill={isDark ? '#5a5a5a' : '#bbb'} />
                                            <circle cx="37" cy="38" r="3" fill={isDark ? '#5a5a5a' : '#bbb'} />
                                            <circle cx="49" cy="38" r="3" fill={isDark ? '#5a5a5a' : '#bbb'} />
                                            <path d="M45 15h20a6 6 0 016 6v15a6 6 0 01-6 6h-3v7l-7-7h-5" stroke={isDark ? '#3a3a3a' : '#ddd'} strokeWidth="2" fill="none" />
                                        </svg>
                                    )
                                },
                                {
                                    title: 'Custom Business Systems',
                                    description: 'Tailored software solutions to streamline your business operations',
                                    icon: (
                                        <svg className="w-16 h-16 md:w-20 md:h-20" viewBox="0 0 80 80" fill="none">
                                            <circle cx="40" cy="40" r="12" fill={isDark ? '#1a1a1a' : '#f5f5f5'} stroke={isDark ? '#4a4a4a' : '#d1d1d1'} strokeWidth="2" />
                                            <path d="M40 18v-6M40 68v-6M62 40h6M12 40h6M54.5 25.5l4.2-4.2M21.3 58.7l4.2-4.2M54.5 54.5l4.2 4.2M21.3 21.3l4.2 4.2" stroke={isDark ? '#4a4a4a' : '#ccc'} strokeWidth="4" strokeLinecap="round" />
                                            <circle cx="40" cy="40" r="20" fill="none" stroke={isDark ? '#3a3a3a' : '#ddd'} strokeWidth="6" />
                                        </svg>
                                    )
                                },
                                {
                                    title: 'Dedicated Support',
                                    description: '24/7 support and maintenance to keep your systems running smoothly',
                                    icon: (
                                        <svg className="w-16 h-16 md:w-20 md:h-20" viewBox="0 0 80 80" fill="none">
                                            <path d="M20 45v-5a20 20 0 0140 0v5" stroke={isDark ? '#4a4a4a' : '#ccc'} strokeWidth="3" fill="none" />
                                            <rect x="12" y="42" width="12" height="20" rx="4" fill={isDark ? '#2a2a2a' : '#e5e5e5'} stroke={isDark ? '#4a4a4a' : '#d1d1d1'} strokeWidth="1" />
                                            <rect x="56" y="42" width="12" height="20" rx="4" fill={isDark ? '#2a2a2a' : '#e5e5e5'} stroke={isDark ? '#4a4a4a' : '#d1d1d1'} strokeWidth="1" />
                                            <path d="M24 62v4a8 8 0 008 8h8" stroke={isDark ? '#3a3a3a' : '#ddd'} strokeWidth="2" strokeLinecap="round" />
                                        </svg>
                                    )
                                }
                            ].map((service, index) => (
                                <div
                                    key={index}
                                    className={`group relative p-6 md:p-8 transition-all duration-300 border-b ${index === 0 ? 'rounded-bl-[2rem] sm:rounded-bl-[2.5rem] border-l border-t-0' : ''
                                        } ${index === 3 ? 'rounded-br-[2rem] sm:rounded-br-[2.5rem] border-r' : ''
                                        } ${isDark
                                            ? 'border-white/10 hover:bg-white/5'
                                            : 'border-gray-200 hover:bg-gray-50'
                                        } ${index === 1 ? 'sm:border-r lg:border-r-0' : ''
                                        } ${index === 2 ? 'sm:border-l lg:border-l-0 sm:border-t-0' : ''
                                        } ${index === 3 ? 'sm:border-t-0' : ''
                                        }`}
                                >
                                    <div className="mb-6 md:mb-8 opacity-80 group-hover:opacity-100 transition-opacity duration-300">
                                        {service.icon}
                                    </div>
                                    <h3 className="text-xl md:text-2xl font-semibold mb-3">
                                        {service.title}
                                    </h3>
                                    <p className={`text-sm md:text-base leading-relaxed ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                                        {service.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </AnimatedSection>

                {/* Process Section */}
                <AnimatedSection className="py-24 md:py-32 relative overflow-hidden">
                    <canvas
                        ref={(canvas) => {
                            if (canvas && !canvas.dataset.processInitialized) {
                                canvas.dataset.processInitialized = 'true';
                                const ctx = canvas.getContext('2d');
                                if (!ctx) return;

                                const resize = () => {
                                    canvas.width = window.innerWidth;
                                    canvas.height = canvas.parentElement?.offsetHeight || 800;
                                };
                                resize();
                                window.addEventListener('resize', resize);

                                let time = 0;
                                const animate = () => {
                                    ctx.clearRect(0, 0, canvas.width, canvas.height);

                                    ctx.strokeStyle = isDark ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.03)';
                                    ctx.lineWidth = 1;

                                    for (let y = 0; y < canvas.height; y += 20) {
                                        ctx.beginPath();
                                        for (let x = 0; x <= canvas.width; x += 5) {
                                            const wave = Math.sin(x * 0.01 + time * 0.02 + y * 0.01) * 5;
                                            if (x === 0) {
                                                ctx.moveTo(x, y + wave);
                                            } else {
                                                ctx.lineTo(x, y + wave);
                                            }
                                        }
                                        ctx.stroke();
                                    }

                                    time += 1;
                                    requestAnimationFrame(animate);
                                };
                                animate();
                            }
                        }}
                        className="absolute inset-0 z-0 pointer-events-none"
                    />
                    <div className="container mx-auto px-4 md:px-6 relative z-10">
                        {/* Header */}
                        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-16 md:mb-20 gap-8">
                            <div>
                                <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6 ${isDark
                                    ? 'bg-white/10 border border-white/20 text-white'
                                    : 'bg-black/5 border border-black/10 text-black'
                                    }`}>
                                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z" />
                                    </svg>
                                    Our Process
                                </div>
                                <h2 className="text-4xl md:text-5xl lg:text-6xl max-w-2xl">
                                    <span style={{ fontFamily: 'var(--font-playfair)', fontStyle: 'italic' }}>The Journey</span>
                                    {' '}to a{' '}
                                    <span className="font-semibold">Successful Product</span>
                                </h2>
                            </div>
                            <div className="lg:max-w-md lg:text-right">
                                <p className={`text-base md:text-lg leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                                    We keep things lean and collaborative — so ideas go from concept to launch without the chaos.
                                </p>
                            </div>
                        </div>

                        {/* Process Cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {[
                                {
                                    title: 'Discover',
                                    description: 'We dive deep into your business goals, user needs, and market landscape to define a clear vision.',
                                    icon: (
                                        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                            <circle cx="12" cy="12" r="3" />
                                            <path d="M12 2v4M12 18v4M2 12h4M18 12h4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                                        </svg>
                                    )
                                },
                                {
                                    title: 'Design',
                                    description: 'Shape powerful experiences with purpose-driven creativity and thoughtful UI/UX execution.',
                                    icon: (
                                        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                            <path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3z" />
                                            <path d="M5 19l1 3 3-1-1-3-3 1z" />
                                            <path d="M19 5l-1-3-3 1 1 3 3-1z" />
                                        </svg>
                                    )
                                },
                                {
                                    title: 'Develop',
                                    description: 'Build scalable solutions that bring your vision to life with precision, performance, and clean code.',
                                    icon: (
                                        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                            <path d="M16 18l6-6-6-6M8 6l-6 6 6 6" />
                                        </svg>
                                    )
                                },
                                {
                                    title: 'Launch & Grow',
                                    description: 'Deploy your product with impact through strategic rollouts, optimization, and ongoing support.',
                                    icon: (
                                        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                            <path d="M12 2L4 7v10l8 5 8-5V7l-8-5z" />
                                            <path d="M12 22V12M12 12L4 7M12 12l8-5" />
                                        </svg>
                                    )
                                }
                            ].map((step, index) => (
                                <div
                                    key={index}
                                    className={`group relative rounded-[1.5rem] overflow-hidden transition-all duration-300 hover:-translate-y-2 ${isDark
                                        ? 'bg-zinc-900/80 border border-white/5 hover:border-white/10'
                                        : 'bg-gray-100 border border-gray-200 hover:border-gray-300'
                                        }`}
                                >
                                    <div className="p-6 md:p-8">
                                        <h3 className="text-xl md:text-2xl font-semibold mb-3">
                                            {step.title}
                                        </h3>
                                        <p className={`text-sm leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                                            {step.description}
                                        </p>
                                    </div>
                                    <div className={`relative h-32 mt-4 ${isDark ? 'bg-zinc-950' : 'bg-gray-200'}`}
                                        style={{
                                            borderTopLeftRadius: '50% 80px',
                                            borderTopRightRadius: '50% 80px'
                                        }}
                                    >
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${isDark
                                                ? 'bg-zinc-800 border border-white/10 text-white'
                                                : 'bg-white border border-gray-300 text-black'
                                                }`}>
                                                {step.icon}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </AnimatedSection>

                {/* CTA Section */}
                <AnimatedSection className="py-16 md:py-24">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className={`rounded-[2rem] md:rounded-[3rem] p-8 md:p-16 text-center ${isDark
                            ? 'bg-zinc-900/50 border border-white/5'
                            : 'bg-gray-100/50 border border-gray-200/50'
                            }`}>
                            <h2 className="text-3xl md:text-4xl lg:text-5xl mb-6">
                                Ready to <span style={{ fontFamily: 'var(--font-playfair)', fontStyle: 'italic' }}>Get Started?</span>
                            </h2>
                            <p className={`text-lg max-w-2xl mx-auto mb-8 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                                Let's discuss your project and see how we can help bring your vision to life.
                            </p>
                            <Link href="/contact">
                                <Button
                                    className={`rounded-full px-8 py-6 text-base font-medium flex items-center gap-2 mx-auto transition-all duration-300 hover:gap-3 ${isDark
                                        ? 'bg-white text-black hover:bg-gray-100'
                                        : 'bg-black text-white hover:bg-gray-800'
                                        }`}
                                >
                                    Contact Us
                                    <ChevronRight className="h-5 w-5" />
                                </Button>
                            </Link>
                        </div>
                    </div>
                </AnimatedSection>

                <Footer />
            </div>
        </PageTransition>
    )
}

