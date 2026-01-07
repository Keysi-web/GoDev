'use client'

import Link from 'next/link'
import Image from 'next/image'
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

export default function ProjectsPage() {
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
                                    <rect x="3" y="3" width="18" height="18" rx="2" />
                                    <path d="M3 9h18" />
                                    <path d="M9 21V9" />
                                </svg>
                                Featured Projects
                            </div>
                            <h1 className="text-5xl md:text-6xl lg:text-7xl mb-6">
                                <span style={{ fontFamily: 'var(--font-playfair)', fontStyle: 'italic' }}>Our</span>
                                {' '}
                                <span className="font-semibold">Work</span>
                            </h1>
                            <p className={`text-lg md:text-xl max-w-2xl ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                                Explore our latest projects and see how we bring ideas to life with precision and creativity.
                            </p>
                        </div>
                    </div>
                </AnimatedSection>

                {/* Featured Projects Section */}
                <AnimatedSection className="py-16 md:py-24 relative overflow-hidden">
                    <canvas
                        ref={(canvas) => {
                            if (canvas && !canvas.dataset.projectsInitialized) {
                                canvas.dataset.projectsInitialized = 'true';
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
                        {/* Project Cards */}
                        <div className="space-y-8">
                            {[
                                {
                                    badges: ['Web App', 'Mobile Responsive'],
                                    subtitle: 'E-commerce platform for SLA',
                                    title: 'SLA E-Commerce',
                                    titleAccent: 'E-Commerce',
                                    startLabel: 'Start Project',
                                    startDate: 'December 2025',
                                    endLabel: 'End Project',
                                    endDate: 'Pending',
                                    image: '/sla-homepage.png',
                                    bgGradient: 'from-cyan-500/20 via-teal-500/10 to-transparent',
                                    demoUrl: 'https://sla-ecommerce.vercel.app'
                                },
                                {
                                    badges: ['Website', 'Powered by GoDev'],
                                    subtitle: 'Community platform collaboration',
                                    title: 'NexDev Community',
                                    titleAccent: 'Community',
                                    startLabel: 'Start Project',
                                    startDate: 'January 2026',
                                    endLabel: 'End Project',
                                    endDate: 'Pending',
                                    image: '/nexdev-landing.png',
                                    bgGradient: 'from-blue-500/20 via-indigo-500/10 to-transparent',
                                    demoUrl: 'https://nexdev-community.vercel.app'
                                },
                                {
                                    badges: ['Web App'],
                                    subtitle: 'Developer workspace application',
                                    title: 'NexDev Application',
                                    titleAccent: 'Application',
                                    startLabel: 'Start Project',
                                    startDate: 'January 2026',
                                    endLabel: 'End Project',
                                    endDate: 'Pending',
                                    image: '/nexdev-login.png',
                                    bgGradient: 'from-purple-500/20 via-violet-500/10 to-transparent',
                                    demoUrl: 'https://nexdev-app.vercel.app'
                                }
                            ].map((project, index) => (
                                <div
                                    key={index}
                                    className={`relative rounded-[2rem] md:rounded-[3rem] overflow-hidden min-h-[500px] md:min-h-[600px] ${isDark
                                        ? 'bg-zinc-900/80 border border-white/5'
                                        : 'bg-gray-100 border border-gray-200'
                                        }`}
                                >
                                    {/* Background Image with Opacity */}
                                    <div className="absolute inset-0 opacity-15 pointer-events-none">
                                        <Image
                                            src={project.image}
                                            alt=""
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    {/* Dark overlay for better contrast */}
                                    <div className={`absolute inset-0 ${isDark ? 'bg-zinc-900/60' : 'bg-gray-100/70'} pointer-events-none`} />

                                    {/* Card Content */}
                                    <div className="relative z-10 p-8 md:p-12 lg:p-16 h-full flex flex-col">
                                        <div className="flex flex-col lg:flex-row lg:justify-between gap-8 flex-1">
                                            {/* Left Side - Badges */}
                                            <div className="flex flex-col gap-3">
                                                {project.badges.map((badge, i) => (
                                                    <div
                                                        key={i}
                                                        className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium w-fit ${isDark
                                                            ? 'bg-zinc-800 border border-white/10 text-white'
                                                            : 'bg-white border border-gray-200 text-black shadow-sm'
                                                            }`}
                                                    >
                                                        {badge}
                                                    </div>
                                                ))}
                                            </div>

                                            {/* Center - Browser Mockup with Image */}
                                            <div className="flex-1 flex items-center justify-center py-4">
                                                <div className={`relative w-full max-w-[700px] rounded-xl overflow-hidden shadow-2xl group ${isDark
                                                    ? 'bg-zinc-800/50 border border-white/10'
                                                    : 'bg-white border border-gray-300 shadow-xl'
                                                    }`}>
                                                    {/* Browser Top Bar */}
                                                    <div className={`flex items-center gap-2 px-4 py-3 ${isDark ? 'bg-zinc-700/80' : 'bg-gray-100'}`}>
                                                        <div className="flex gap-1.5">
                                                            <div className="w-3 h-3 rounded-full bg-red-500" />
                                                            <div className="w-3 h-3 rounded-full bg-yellow-500" />
                                                            <div className="w-3 h-3 rounded-full bg-green-500" />
                                                        </div>
                                                        <div className={`flex-1 mx-4 h-6 rounded-md ${isDark ? 'bg-zinc-600/50' : 'bg-gray-200'}`} />
                                                    </div>
                                                    {/* Screenshot */}
                                                    <div className="relative aspect-[16/9] w-full">
                                                        <Image
                                                            src={project.image}
                                                            alt={project.title}
                                                            fill
                                                            className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                                                        />
                                                        {/* Live Demo Overlay */}
                                                        <a
                                                            href={project.demoUrl}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/50 transition-all duration-300"
                                                        >
                                                            <span className="flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black font-medium opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 hover:bg-emerald-400 hover:text-black">
                                                                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                                                                    <polyline points="15 3 21 3 21 9" />
                                                                    <line x1="10" y1="14" x2="21" y2="3" />
                                                                </svg>
                                                                Live Demo
                                                            </span>
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Right Side - S & E Dates */}
                                            <div className="flex flex-row lg:flex-col gap-8 lg:gap-6 lg:text-right">
                                                {/* S - Start Project */}
                                                <div className="flex items-start gap-3 lg:flex-row-reverse">
                                                    <div>
                                                        <p className={`text-xs uppercase tracking-wider mb-1 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                                                            {project.startLabel}
                                                        </p>
                                                        <p className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                                                            {project.startDate}
                                                        </p>
                                                    </div>
                                                    <span className={`text-4xl md:text-5xl font-bold ${isDark ? 'text-white' : 'text-black'}`}>
                                                        S.
                                                    </span>
                                                </div>

                                                {/* E - End Project */}
                                                <div className="flex items-start gap-3 lg:flex-row-reverse">
                                                    <div>
                                                        <p className={`text-xs uppercase tracking-wider mb-1 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                                                            {project.endLabel}
                                                        </p>
                                                        <p className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                                                            {project.endDate}
                                                        </p>
                                                    </div>
                                                    <span className={`text-4xl md:text-5xl font-bold ${isDark ? 'text-white' : 'text-black'}`}>
                                                        E.
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Bottom - Project Title */}
                                        <div className="mt-auto pt-12 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
                                            <div>
                                                <p className={`text-sm mb-2 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                                                    {project.subtitle}
                                                </p>
                                                <h3 className="text-3xl md:text-4xl lg:text-5xl">
                                                    <span className={isDark ? 'text-white' : 'text-black'}>
                                                        {project.title.replace(project.titleAccent, '')}
                                                    </span>
                                                    <span className="text-emerald-500" style={{ fontFamily: 'var(--font-playfair)', fontStyle: 'italic' }}>
                                                        {project.titleAccent}
                                                    </span>
                                                </h3>
                                            </div>
                                            <a
                                                href={project.demoUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className={`inline-flex items-center gap-2 text-sm font-medium transition-all duration-300 hover:gap-3 ${isDark ? 'text-gray-400 hover:text-emerald-400' : 'text-gray-500 hover:text-emerald-500'}`}
                                            >
                                                View Live Demo
                                                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                                                    <polyline points="15 3 21 3 21 9" />
                                                    <line x1="10" y1="14" x2="21" y2="3" />
                                                </svg>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </AnimatedSection>

                {/* Testimonials Section */}
                <AnimatedSection className="py-24 md:py-32 relative overflow-hidden">
                    <canvas
                        ref={(canvas) => {
                            if (canvas && !canvas.dataset.initialized) {
                                canvas.dataset.initialized = 'true';
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
                                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                                </svg>
                                Testimonials
                            </div>
                        </div>

                        {/* Title */}
                        <div className="text-center mb-20">
                            <h2 className="text-4xl md:text-5xl lg:text-6xl">
                                <span style={{ fontFamily: 'var(--font-playfair)', fontStyle: 'italic' }}>Hear from the Clients</span>
                                <br />
                                <span className="font-semibold">We've Partnered With</span>
                            </h2>
                        </div>

                        {/* Testimonials Grid - Scattered Layout */}
                        <div className="relative min-h-[600px] md:min-h-[500px]">
                            {/* Testimonial 1 - Top Left */}
                            <div className="md:absolute md:top-0 md:left-0 md:w-[400px] mb-8 md:mb-0">
                                <div className={`rounded-2xl p-6 ${isDark
                                    ? 'bg-zinc-900/90 border border-white/10'
                                    : 'bg-white border border-gray-200 shadow-lg'
                                    }`}>
                                    <p className={`text-sm md:text-base leading-relaxed mb-6 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                                        "Agenciy felt like an extension of our team. Their design instincts and speed were exactly what we needed to launch on time — and with style."
                                    </p>
                                    <div className="flex items-center gap-3">
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${isDark
                                            ? 'bg-zinc-700 text-white'
                                            : 'bg-gray-200 text-gray-700'
                                            }`}>
                                            SC
                                        </div>
                                        <div>
                                            <p className={`font-medium text-sm ${isDark ? 'text-white' : 'text-black'}`}>Sarah Coleman</p>
                                            <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>CEO at NovoTech</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Testimonial 2 - Top Right */}
                            <div className="md:absolute md:top-[-40px] md:right-0 md:w-[380px] mb-8 md:mb-0">
                                <div className={`rounded-2xl p-6 ${isDark
                                    ? 'bg-zinc-900/90 border border-white/10'
                                    : 'bg-white border border-gray-200 shadow-lg'
                                    }`}>
                                    <p className={`text-sm md:text-base leading-relaxed mb-6 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                                        "From the first call to the final handoff, everything was seamless. The UI/UX work was some of the best we've seen."
                                    </p>
                                    <div className="flex items-center gap-3">
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${isDark
                                            ? 'bg-zinc-700 text-white'
                                            : 'bg-gray-200 text-gray-700'
                                            }`}>
                                            DR
                                        </div>
                                        <div>
                                            <p className={`font-medium text-sm ${isDark ? 'text-white' : 'text-black'}`}>Daniel Reyes</p>
                                            <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>Product Manager at Clarity CRM</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Testimonial 3 - Bottom Left */}
                            <div className="md:absolute md:bottom-0 md:left-[5%] md:w-[360px] mb-8 md:mb-0">
                                <div className={`rounded-2xl p-6 ${isDark
                                    ? 'bg-zinc-900/90 border border-white/10'
                                    : 'bg-white border border-gray-200 shadow-lg'
                                    }`}>
                                    <p className={`text-sm md:text-base leading-relaxed mb-6 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                                        "We came to Agenciy with a rough idea, and they turned it into a beautiful, functional MVP in weeks. Highly recommended."
                                    </p>
                                    <div className="flex items-center gap-3">
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${isDark
                                            ? 'bg-zinc-700 text-white'
                                            : 'bg-gray-200 text-gray-700'
                                            }`}>
                                            RL
                                        </div>
                                        <div>
                                            <p className={`font-medium text-sm ${isDark ? 'text-white' : 'text-black'}`}>Rachel Lin</p>
                                            <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>Co-Founder at Driftly</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Testimonial 4 - Bottom Right */}
                            <div className="md:absolute md:bottom-[-20px] md:right-[10%] md:w-[380px]">
                                <div className={`rounded-2xl p-6 ${isDark
                                    ? 'bg-zinc-900/90 border border-white/10'
                                    : 'bg-white border border-gray-200 shadow-lg'
                                    }`}>
                                    <p className={`text-sm md:text-base leading-relaxed mb-6 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                                        "Their process is clear, communication is fast, and the results speak for themselves. We saw a 40% boost in engagement post-launch."
                                    </p>
                                    <div className="flex items-center gap-3">
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${isDark
                                            ? 'bg-zinc-700 text-white'
                                            : 'bg-gray-200 text-gray-700'
                                            }`}>
                                            JF
                                        </div>
                                        <div>
                                            <p className={`font-medium text-sm ${isDark ? 'text-white' : 'text-black'}`}>Jason Ford</p>
                                            <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>Marketing Lead at BrightChain</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
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
                                Have a <span style={{ fontFamily: 'var(--font-playfair)', fontStyle: 'italic' }}>Project in Mind?</span>
                            </h2>
                            <p className={`text-lg max-w-2xl mx-auto mb-8 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                                Let's discuss how we can bring your vision to life with precision and creativity.
                            </p>
                            <Link href="/contact">
                                <Button
                                    className={`rounded-full px-8 py-6 text-base font-medium flex items-center gap-2 mx-auto transition-all duration-300 hover:gap-3 ${isDark
                                        ? 'bg-white text-black hover:bg-gray-100'
                                        : 'bg-black text-white hover:bg-gray-800'
                                        }`}
                                >
                                    Start Your Project
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
