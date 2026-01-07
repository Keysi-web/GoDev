'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
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

export default function AboutPage() {
    const { isDark } = useTheme()
    const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0)

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

                {/* About Us Section */}
                <AnimatedSection className="pt-32 pb-16 md:pb-24 relative overflow-hidden">
                    <canvas
                        ref={(canvas) => {
                            if (canvas && !canvas.dataset.aboutInitialized) {
                                canvas.dataset.aboutInitialized = 'true';
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
                        {/* Main Content Card */}
                        <div className={`rounded-[2rem] md:rounded-[3rem] p-8 md:p-16 lg:p-20 ${isDark
                            ? 'bg-zinc-900/50 border border-white/5'
                            : 'bg-gray-100/50 border border-gray-200/50'
                            }`}>
                            {/* Badge */}
                            <div className="flex justify-center mb-10">
                                <div className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium ${isDark
                                    ? 'bg-zinc-800 border border-white/10 text-white'
                                    : 'bg-white border border-gray-200 text-black shadow-sm'
                                    }`}>
                                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                    </svg>
                                    About Us
                                </div>
                            </div>

                            {/* Watermark Text */}
                            <div className="relative mb-6">
                                <span className={`absolute left-1/2 -translate-x-1/2 text-[4rem] md:text-[6rem] lg:text-[8rem] font-serif italic pointer-events-none select-none ${isDark ? 'text-white/[0.03]' : 'text-black/[0.03]'}`}
                                    style={{ fontFamily: 'var(--font-playfair)' }}>
                                    godev
                                </span>
                            </div>

                            {/* Description */}
                            <div className="text-center max-w-2xl mx-auto mb-16 relative z-10 pt-8">
                                <p className={`text-lg md:text-xl leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                    We help ambitious brands and startups build digital products that stand out and scale.{' '}
                                    <span className={isDark ? 'text-gray-500' : 'text-gray-400'}>
                                        We believe in working smart, building fast, and designing with purpose.
                                    </span>
                                </p>
                            </div>

                            {/* Metrics */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
                                {[
                                    { label: 'Projects Launched', value: '140' },
                                    { label: 'Years Of Experience', value: '10' },
                                    { label: 'Happy Clients', value: '50' }
                                ].map((metric, index) => (
                                    <div
                                        key={index}
                                        className={`py-8 md:py-12 px-6 text-center md:text-left ${index !== 2
                                            ? `border-b md:border-b-0 md:border-r ${isDark ? 'border-white/10' : 'border-gray-200'}`
                                            : ''
                                            }`}
                                    >
                                        <p className={`text-xs md:text-sm uppercase tracking-wider mb-4 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                                            {metric.label}
                                        </p>
                                        <p className={`text-5xl md:text-6xl lg:text-7xl font-light tracking-tight ${isDark ? 'text-white/80' : 'text-gray-800'}`}
                                            style={{ fontStyle: 'italic' }}>
                                            {metric.value}+
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </AnimatedSection>

                {/* Team Members Section */}
                <AnimatedSection className="py-24 md:py-32 relative overflow-hidden">
                    <canvas
                        ref={(canvas) => {
                            if (canvas && !canvas.dataset.teamInitialized) {
                                canvas.dataset.teamInitialized = 'true';
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
                        <div className="text-center mb-16 md:mb-20">
                            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6 ${isDark
                                ? 'bg-white/10 border border-white/20 text-white'
                                : 'bg-black/5 border border-black/10 text-black'
                                }`}>
                                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                                    <circle cx="9" cy="7" r="4" />
                                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                                </svg>
                                Leader
                            </div>
                            <h2 className="text-4xl md:text-5xl lg:text-6xl">
                                Meet Our{' '}
                                <span style={{ fontFamily: 'var(--font-playfair)', fontStyle: 'italic' }}>Proprietor</span>
                            </h2>
                        </div>

                        {/* Team Card - Single Founder */}
                        <div className="flex justify-center">
                            <div className={`group relative rounded-3xl overflow-hidden max-w-lg w-full transition-all duration-300 hover:-translate-y-2 ${isDark
                                ? 'bg-zinc-900/80 border border-white/10 hover:border-white/20'
                                : 'bg-gray-100 border border-gray-200 hover:border-gray-300'
                                } shadow-2xl`}
                            >
                                {/* Team Badge */}
                                <div className="absolute top-6 left-6 z-10">
                                    <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${isDark
                                        ? 'bg-zinc-800/90 border border-white/10 text-white backdrop-blur-sm'
                                        : 'bg-white/90 border border-gray-200 text-black backdrop-blur-sm'
                                        }`}>
                                        Leadership
                                    </div>
                                </div>

                                {/* Photo */}
                                <div className={`relative aspect-[3/4] ${isDark
                                    ? 'bg-gradient-to-b from-zinc-800 to-zinc-900'
                                    : 'bg-gradient-to-b from-gray-200 to-gray-300'
                                    }`}>
                                    <Image
                                        src="/khyle-carang.png"
                                        alt="Khyle Carang"
                                        fill
                                        className="object-cover object-top"
                                    />
                                    <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/60 to-transparent" />
                                </div>

                                {/* Name & Role */}
                                <div className="absolute bottom-0 left-0 right-0 p-8">
                                    <h3 className="text-2xl md:text-3xl font-semibold text-white mb-2">
                                        Khyle Carang
                                    </h3>
                                    <p className="text-base text-gray-300">
                                        Founder, CEO & Lead Developer
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </AnimatedSection>

                {/* FAQ Section */}
                <AnimatedSection className="py-24 md:py-32 relative overflow-hidden">
                    <canvas
                        ref={(canvas) => {
                            if (canvas && !canvas.dataset.faqInitialized) {
                                canvas.dataset.faqInitialized = 'true';
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
                        {/* Centered Badge */}
                        <div className="flex justify-center mb-8">
                            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium ${isDark
                                ? 'bg-zinc-800/80 border border-white/10 text-white'
                                : 'bg-white border border-gray-200 text-black shadow-sm'
                                }`}>
                                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <circle cx="12" cy="12" r="10" />
                                    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                                    <line x1="12" y1="17" x2="12.01" y2="17" />
                                </svg>
                                FAQs
                            </div>
                        </div>

                        {/* Title */}
                        <div className="text-center mb-16">
                            <h2 className="text-4xl md:text-5xl lg:text-6xl">
                                <span className="font-semibold">FAQ</span>
                                <span style={{ fontFamily: 'var(--font-playfair)', fontStyle: 'italic' }}>s</span>
                            </h2>
                        </div>

                        {/* FAQ Accordion */}
                        <div className="max-w-3xl mx-auto">
                            {[
                                {
                                    question: 'How long does a typical project take?',
                                    answer: 'Project timelines vary based on scope, but most branding or website projects take between 2-4 weeks. Complex apps or platforms may take longer — we\'ll always give you a clear timeline upfront.'
                                },
                                {
                                    question: 'Do you offer ongoing support after launch?',
                                    answer: 'Yes! We offer maintenance packages and ongoing support to ensure your product stays updated, secure, and performing at its best. We\'re here for the long haul.'
                                },
                                {
                                    question: 'What if I only need design or development, not both?',
                                    answer: 'That\'s perfectly fine. We offer standalone design and development services. Whether you need UI/UX design, frontend development, or full-stack solutions, we can tailor our services to your needs.'
                                },
                                {
                                    question: 'Can you work with my internal team?',
                                    answer: 'Absolutely. We frequently collaborate with in-house teams, acting as an extension of your workforce. We integrate seamlessly into your existing workflows and communication channels.'
                                },
                                {
                                    question: 'Do you work with startups or only established companies?',
                                    answer: 'We work with both! From early-stage startups building their first MVP to established companies looking to scale or modernize, we adapt our approach to fit your stage and budget.'
                                }
                            ].map((faq, index) => (
                                <div
                                    key={index}
                                    className={`border-b ${isDark ? 'border-white/10' : 'border-gray-200'}`}
                                >
                                    <button
                                        onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                                        className="w-full py-6 flex items-center justify-between text-left transition-colors"
                                    >
                                        <span className={`text-base md:text-lg font-medium pr-8 ${isDark ? 'text-white' : 'text-black'}`}>
                                            {faq.question}
                                        </span>
                                        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${openFaqIndex === index
                                            ? isDark ? 'bg-white text-black' : 'bg-black text-white'
                                            : isDark ? 'bg-zinc-800 text-white border border-white/10' : 'bg-gray-100 text-black border border-gray-200'
                                            }`}>
                                            <svg
                                                className={`w-4 h-4 transition-transform duration-300 ${openFaqIndex === index ? 'rotate-45' : ''}`}
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                            >
                                                <line x1="12" y1="5" x2="12" y2="19" />
                                                <line x1="5" y1="12" x2="19" y2="12" />
                                            </svg>
                                        </div>
                                    </button>
                                    <div className={`overflow-hidden transition-all duration-300 ${openFaqIndex === index ? 'max-h-96 pb-6' : 'max-h-0'}`}>
                                        <p className={`text-sm md:text-base leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                                            {faq.answer}
                                        </p>
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
                                Want to <span style={{ fontFamily: 'var(--font-playfair)', fontStyle: 'italic' }}>Work With Us?</span>
                            </h2>
                            <p className={`text-lg max-w-2xl mx-auto mb-8 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                                Join our team and help build amazing digital products for clients worldwide.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link href="/contact">
                                    <Button
                                        className={`rounded-full px-8 py-6 text-base font-medium flex items-center gap-2 transition-all duration-300 hover:gap-3 ${isDark
                                            ? 'bg-white text-black hover:bg-gray-100'
                                            : 'bg-black text-white hover:bg-gray-800'
                                            }`}
                                    >
                                        Get In Touch
                                        <ChevronRight className="h-5 w-5" />
                                    </Button>
                                </Link>
                                <Link href="/careers">
                                    <Button
                                        variant="outline"
                                        className={`rounded-full px-8 py-6 text-base font-medium flex items-center gap-2 transition-all duration-300 ${isDark
                                            ? 'border-white/20 text-white hover:bg-white/10'
                                            : 'border-black/20 text-black hover:bg-black/5'
                                            }`}
                                    >
                                        View Careers
                                        <ChevronRight className="h-5 w-5" />
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </AnimatedSection>

                <Footer />
            </div>
        </PageTransition>
    )
}
