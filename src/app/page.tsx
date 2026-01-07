'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { useTheme } from '@/components/providers/ThemeProvider'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { ChevronRight, CheckCircle } from 'lucide-react'
import {
  AnimatedSection,
  AnimatedDiv,
  StaggerContainer,
  StaggerItem,
  PageTransition,
  FloatingElement,
  HoverCard
} from '@/components/ui/animations'

export default function GoDevLanding() {
  const { isDark } = useTheme()
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0)
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [formErrors, setFormErrors] = useState({ name: '', email: '', message: '' })

  const validateForm = () => {
    const errors = { name: '', email: '', message: '' }
    if (!formData.name.trim()) errors.name = 'Name is required'
    else if (formData.name.trim().length < 2) errors.name = 'Name must be at least 2 characters'
    if (!formData.email.trim()) errors.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) errors.email = 'Please enter a valid email'
    if (!formData.message.trim()) errors.message = 'Message is required'
    else if (formData.message.trim().length < 10) errors.message = 'Message must be at least 10 characters'
    setFormErrors(errors)
    return !errors.name && !errors.email && !errors.message
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return
    setIsSubmitting(true)
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      if (response.ok) {
        setShowSuccess(true)
        setFormData({ name: '', email: '', message: '' })
        setTimeout(() => setShowSuccess(false), 5000)
      }
    } catch (error) {
      console.error('Form submission error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <PageTransition>
      <div className={`min-h-screen transition-colors duration-500 ${isDark ? 'bg-black text-white' : 'bg-gray-50 text-gray-900'}`}>
        <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee { animation: marquee 15s linear infinite; }
        .animate-marquee:hover { animation-play-state: paused; }
        .float-3d { animation: float 6s ease-in-out infinite; }
      `}</style>

        <Navbar />

        {/* Hero Section */}
        <section id="home" className="relative min-h-screen overflow-hidden">
          <canvas
            ref={(canvas) => {
              if (canvas && !canvas.dataset.initialized) {
                canvas.dataset.initialized = 'true'
                const ctx = canvas.getContext('2d')
                if (!ctx) return
                const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight }
                resize()
                window.addEventListener('resize', resize)
                let time = 0
                const waves = [
                  { amplitude: 50, frequency: 0.02, speed: 0.02, y: 0.6, opacity: 0.15 },
                  { amplitude: 30, frequency: 0.03, speed: 0.015, y: 0.65, opacity: 0.1 },
                  { amplitude: 40, frequency: 0.015, speed: 0.025, y: 0.7, opacity: 0.08 },
                ]
                const animate = () => {
                  ctx.clearRect(0, 0, canvas.width, canvas.height)
                  waves.forEach((wave) => {
                    ctx.beginPath()
                    ctx.moveTo(0, canvas.height)
                    for (let x = 0; x <= canvas.width; x += 5) {
                      const y = canvas.height * wave.y + Math.sin(x * wave.frequency + time * wave.speed) * wave.amplitude
                      ctx.lineTo(x, y)
                    }
                    ctx.lineTo(canvas.width, canvas.height)
                    ctx.closePath()
                    const gradient = ctx.createLinearGradient(0, canvas.height * 0.5, 0, canvas.height)
                    gradient.addColorStop(0, `rgba(255, 255, 255, ${wave.opacity})`)
                    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)')
                    ctx.fillStyle = gradient
                    ctx.fill()
                  })
                  time += 1
                  requestAnimationFrame(animate)
                }
                animate()
              }
            }}
            className="absolute inset-0 z-0 pointer-events-none"
          />
          <div className={`absolute inset-0 ${isDark ? 'bg-black' : 'bg-gray-50'}`} />
          <FloatingElement className="absolute top-1/3 right-1/4 w-64 h-64 bg-white/5 rounded-full blur-3xl" />

          <div className="relative z-10 min-h-screen flex flex-col">
            <div className="flex-1 flex items-center">
              <div className="container mx-auto px-6 pt-24">
                <div className="grid lg:grid-cols-12 gap-8 items-center">
                  <motion.div
                    className="lg:col-span-7"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <h1 className="text-6xl md:text-7xl lg:text-8xl xl:text-9xl leading-[0.9] mb-8">
                      <motion.span
                        className="block"
                        style={{ fontFamily: 'var(--font-playfair)', fontStyle: 'italic' }}
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                      >
                        Build.
                      </motion.span>
                      <motion.span
                        className="block font-bold"
                        style={{ fontFamily: 'var(--font-playfair)', fontStyle: 'italic' }}
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      >
                        Scale.
                      </motion.span>
                      <motion.span
                        className={`block font-bold ${isDark ? 'text-gray-500' : 'text-gray-400'}`}
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
                      >
                        Innovate.
                      </motion.span>
                    </h1>
                  </motion.div>
                  <AnimatedDiv
                    className="lg:col-span-5 lg:pl-8"
                    delay={0.8}
                    variant="fadeLeft"
                  >
                    <div className="space-y-8">
                      <div>
                        <p className={`text-sm uppercase tracking-widest mb-3 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>© Development for Developers</p>
                        <p className={`text-lg leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                          Custom software solutions that drive real business growth with intention, clarity, and care.
                        </p>
                      </div>
                      <motion.div
                        className="flex items-center gap-6"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 1, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <Link href="/contact" className={`inline-flex items-center text-sm font-medium hover:gap-3 transition-all duration-300 ${isDark ? 'text-white' : 'text-black'}`}>
                          Contact Us <ChevronRight className="h-4 w-4 ml-1" />
                        </Link>
                        <Link href="/careers" className={`inline-flex items-center text-sm font-medium hover:gap-3 transition-all duration-300 ${isDark ? 'text-white' : 'text-black'}`}>
                          Join Us <ChevronRight className="h-4 w-4 ml-1" />
                        </Link>
                      </motion.div>
                    </div>
                  </AnimatedDiv>
                </div>
              </div>
            </div>
            <motion.div
              className="container mx-auto px-6 pb-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className={`text-sm uppercase tracking-widest mb-4 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>We do</p>
              <div className={`flex flex-wrap items-center gap-x-4 gap-y-2 text-sm mb-6 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                <span>Web Development</span><span className="text-xs">/</span>
                <span>Mobile Apps</span><span className="text-xs">/</span>
                <span>UI/UX Design</span><span className="text-xs">/</span>
                <span>AI Automation</span>
              </div>
              {/* Looping Logo Marquee */}
              <div className="overflow-hidden mt-2 max-w-[280px] md:max-w-[350px]">
                <div className="animate-marquee flex items-center gap-8 whitespace-nowrap">
                  {[...Array(2)].map((_, setIndex) => (
                    <div key={setIndex} className="flex items-center gap-8">
                      {['Nexdev', 'GoBots', 'GoTeam', 'GoPay', 'SLA'].map((brand, i) => (
                        <span
                          key={i}
                          className={`text-base md:text-lg font-semibold tracking-tight ${isDark ? 'text-white/25' : 'text-black/20'}`}
                          style={{ fontFamily: 'var(--font-playfair)', fontStyle: 'italic' }}
                        >
                          {brand}
                        </span>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>


        {/* Services Section */}
        <AnimatedSection id="services" className="py-16 md:py-24 relative overflow-hidden">
          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <AnimatedDiv className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-16 gap-8" variant="fadeUp">
              <div>
                <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6 ${isDark ? 'bg-white/10 border border-white/20 text-white' : 'bg-black/5 border border-black/10 text-black'}`}>
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" />
                  </svg>
                  Our Services
                </div>
                <h2 className="text-4xl md:text-5xl lg:text-6xl">
                  <span style={{ fontFamily: 'var(--font-playfair)', fontStyle: 'italic' }}>What</span> <span className="font-semibold">We Do</span>
                </h2>
              </div>
              <div className="lg:max-w-md lg:text-right">
                <p className={`text-base md:text-lg leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  We craft digital experiences from idea to launch — blending strategy, design, and engineering.
                </p>
              </div>
            </AnimatedDiv>

            <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8" staggerDelay={0.08}>
              {[
                {
                  title: 'Website Development',
                  desc: 'Custom, scalable web applications built with modern technologies',
                  icon: (
                    <div className="relative w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/10 flex items-center justify-center">
                      <svg className="w-6 h-6 text-blue-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <rect x="3" y="3" width="18" height="18" rx="2" />
                        <polyline points="8,12 10,10 12,12" />
                        <line x1="16" y1="12" x2="16" y2="12.01" />
                      </svg>
                    </div>
                  )
                },
                {
                  title: 'Mobile App Development',
                  desc: 'Native and cross-platform mobile apps for iOS and Android',
                  icon: (
                    <div className="relative w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-violet-500/10 flex items-center justify-center">
                      <svg className="w-6 h-6 text-purple-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <rect x="5" y="2" width="14" height="20" rx="2" />
                        <line x1="12" y1="18" x2="12" y2="18.01" />
                      </svg>
                    </div>
                  )
                },
                {
                  title: 'UI/UX & Website Design',
                  desc: 'Beautiful, intuitive designs that delight users and drive conversions',
                  icon: (
                    <div className="relative w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500/20 to-rose-500/10 flex items-center justify-center">
                      <svg className="w-6 h-6 text-pink-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <circle cx="12" cy="12" r="3" />
                        <path d="M12 2v4m0 12v4m-10-10h4m12 0h4" />
                      </svg>
                    </div>
                  )
                },
                {
                  title: 'E-commerce Solutions',
                  desc: 'Complete online stores with payment integration and inventory management',
                  icon: (
                    <div className="relative w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500/20 to-green-500/10 flex items-center justify-center">
                      <svg className="w-6 h-6 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M6 6h15l-1.5 9h-12z" />
                        <circle cx="9" cy="20" r="1" />
                        <circle cx="18" cy="20" r="1" />
                        <path d="M6 6L4 2H2" />
                      </svg>
                    </div>
                  )
                },
                {
                  title: 'AI Automation',
                  desc: 'Intelligent automation solutions powered by cutting-edge AI technology',
                  icon: (
                    <div className="relative w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500/20 to-amber-500/10 flex items-center justify-center">
                      <svg className="w-6 h-6 text-orange-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <rect x="4" y="4" width="16" height="16" rx="2" />
                        <circle cx="9" cy="12" r="1" fill="currentColor" />
                        <circle cx="15" cy="12" r="1" fill="currentColor" />
                        <path d="M9 16c1.5 1 4.5 1 6 0" />
                      </svg>
                    </div>
                  )
                },
                {
                  title: 'Chat Support Systems',
                  desc: 'Real-time chat solutions to enhance customer engagement',
                  icon: (
                    <div className="relative w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-teal-500/10 flex items-center justify-center">
                      <svg className="w-6 h-6 text-cyan-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.66 0 3-4.03 3-9s-1.34-9-3-9m0 18c-1.66 0-3-4.03-3-9s1.34-9 3-9m-9 9a9 9 0 019-9" />
                        <circle cx="12" cy="12" r="2" fill="currentColor" />
                      </svg>
                    </div>
                  )
                },
                {
                  title: 'Custom Business Systems',
                  desc: 'Tailored software solutions to streamline your business operations',
                  icon: (
                    <div className="relative w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-500/20 to-lime-500/10 flex items-center justify-center">
                      <svg className="w-6 h-6 text-yellow-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    </div>
                  )
                },
                {
                  title: 'Dedicated Support',
                  desc: '24/7 support and maintenance to keep your systems running smoothly',
                  icon: (
                    <div className="relative w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500/20 to-blue-500/10 flex items-center justify-center">
                      <svg className="w-6 h-6 text-indigo-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                        <polyline points="9,12 11,14 15,10" />
                      </svg>
                    </div>
                  )
                },
              ].map((s, i) => (
                <StaggerItem key={i}>
                  <HoverCard className={`group p-6 rounded-2xl transition-all duration-300 h-full ${isDark ? 'bg-zinc-900/50 border border-white/5 hover:border-white/10' : 'bg-gray-100 border border-gray-200 hover:border-gray-300'}`}>
                    <div className="mb-4">{s.icon}</div>
                    <div className={`text-xs font-medium mb-3 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>/0{i + 1}</div>
                    <h3 className="text-lg font-semibold mb-2">{s.title}</h3>
                    <p className={`text-sm leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{s.desc}</p>
                  </HoverCard>
                </StaggerItem>
              ))}
            </StaggerContainer>
            <AnimatedDiv className="flex justify-center" delay={0.4}>
              <Link href="/services">
                <Button className={`rounded-full px-8 py-6 text-base font-medium flex items-center gap-2 ${isDark ? 'bg-white text-black hover:bg-gray-100' : 'bg-black text-white hover:bg-gray-800'}`}>
                  View All Services <ChevronRight className="h-5 w-5" />
                </Button>
              </Link>
            </AnimatedDiv>
          </div>
        </AnimatedSection>

        {/* About Section */}
        <AnimatedSection id="about" className="py-24 md:py-32 relative overflow-hidden">
          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <div className={`rounded-[2rem] md:rounded-[3rem] p-8 md:p-16 lg:p-20 ${isDark ? 'bg-zinc-900/50 border border-white/5' : 'bg-gray-100/50 border border-gray-200/50'}`}>
              <div className="flex justify-center mb-10">
                <div className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium ${isDark ? 'bg-zinc-800 border border-white/10 text-white' : 'bg-white border border-gray-200 text-black shadow-sm'}`}>
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                  About Us
                </div>
              </div>
              <div className="text-center max-w-2xl mx-auto mb-16">
                <p className={`text-lg md:text-xl leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  We help ambitious brands and startups build digital products that stand out and scale.
                  <span className={isDark ? 'text-gray-500' : 'text-gray-400'}> We believe in working smart, building fast, and designing with purpose.</span>
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
                {[
                  { label: 'Projects Launched', value: '140' },
                  { label: 'Years Of Experience', value: '10' },
                  { label: 'Happy Clients', value: '50' }
                ].map((m, i) => (
                  <div key={i} className={`py-8 md:py-12 px-6 text-center ${i !== 2 ? `border-b md:border-b-0 md:border-r ${isDark ? 'border-white/10' : 'border-gray-200'}` : ''}`}>
                    <p className={`text-xs md:text-sm uppercase tracking-wider mb-4 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>{m.label}</p>
                    <p className={`text-5xl md:text-6xl lg:text-7xl font-light tracking-tight ${isDark ? 'text-white/80' : 'text-gray-800'}`} style={{ fontStyle: 'italic' }}>{m.value}+</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Projects Section */}
        <AnimatedSection id="projects" className="py-24 md:py-32 relative overflow-hidden">
          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <div className="text-center mb-16">
              <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6 ${isDark ? 'bg-white/10 border border-white/20 text-white' : 'bg-black/5 border border-black/10 text-black'}`}>
                Featured Projects
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl">
                <span style={{ fontFamily: 'var(--font-playfair)', fontStyle: 'italic' }}>Our</span> <span className="font-semibold">Work</span>
              </h2>
            </div>
            <div className="space-y-12 mb-8">
              {[
                {
                  title: 'SLA E-Commerce',
                  subtitle: 'E-commerce platform for SLA',
                  tags: ['Web App', 'Mobile Responsive'],
                  startDate: 'December 2025',
                  endDate: 'Pending',
                  image: '/sla-homepage.png',
                  demoUrl: 'https://sla-ecom.vercel.app/'
                },
                {
                  title: 'NexDev Community',
                  subtitle: 'Community platform for developers',
                  tags: ['Website', 'Full Stack'],
                  startDate: 'November 2025',
                  endDate: 'January 2026',
                  image: '/nexdev-landing.png',
                  demoUrl: 'https://nexdev-six.vercel.app/'
                },
                {
                  title: 'NexDev Application',
                  subtitle: 'Learning management system',
                  tags: ['Web App', 'Dashboard'],
                  startDate: 'October 2025',
                  endDate: 'December 2025',
                  image: '/nexdev-login.png',
                  demoUrl: 'https://nexdev-app.vercel.app'
                },
              ].map((p, i) => (
                <div key={i} className={`relative rounded-3xl overflow-hidden ${isDark ? 'bg-zinc-900/80 border border-white/5' : 'bg-gray-100 border border-gray-200'}`}>
                  <div className="p-6 md:p-8 lg:p-10">
                    {/* Header with Tags and Timeline */}
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-6">
                      {/* Left - Tags */}
                      <div className="flex flex-wrap gap-2">
                        {p.tags.map((tag, ti) => (
                          <span key={ti} className={`text-xs px-4 py-2 rounded-full font-medium ${isDark ? 'bg-zinc-800 border border-white/10 text-white' : 'bg-white border border-gray-200 text-black'}`}>
                            {tag}
                          </span>
                        ))}
                      </div>
                      {/* Right - Timeline */}
                      <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 text-right">
                        <div>
                          <p className={`text-[10px] uppercase tracking-widest mb-1 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>Start Project</p>
                          <p className="flex items-center gap-2 justify-end">
                            <span className="text-2xl font-bold" style={{ fontFamily: 'var(--font-playfair)', fontStyle: 'italic' }}>S.</span>
                            <span className={`text-sm ${isDark ? 'text-white' : 'text-black'}`}>{p.startDate}</span>
                          </p>
                        </div>
                        <div>
                          <p className={`text-[10px] uppercase tracking-widest mb-1 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>End Project</p>
                          <p className="flex items-center gap-2 justify-end">
                            <span className="text-2xl font-bold" style={{ fontFamily: 'var(--font-playfair)', fontStyle: 'italic' }}>E.</span>
                            <span className={`text-sm ${isDark ? 'text-white' : 'text-black'}`}>{p.endDate}</span>
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Browser Mockup */}
                    <div className="relative rounded-xl overflow-hidden border border-white/10 bg-zinc-950 group">
                      {/* Browser Header */}
                      <div className="flex items-center gap-2 px-4 py-3 bg-zinc-900/80 border-b border-white/5">
                        <div className="flex items-center gap-1.5">
                          <div className="w-3 h-3 rounded-full bg-red-500" />
                          <div className="w-3 h-3 rounded-full bg-yellow-500" />
                          <div className="w-3 h-3 rounded-full bg-green-500" />
                        </div>
                        <div className="flex-1 mx-4">
                          <div className={`h-7 rounded-md ${isDark ? 'bg-zinc-800' : 'bg-gray-200'}`} />
                        </div>
                      </div>
                      {/* Browser Content - Project Screenshot */}
                      <div className="relative aspect-[16/9] md:aspect-[21/9]">
                        <Image
                          src={p.image}
                          alt={p.title}
                          fill
                          className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                        />
                        {/* Live Demo Overlay */}
                        <a
                          href={p.demoUrl}
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

                    {/* Project Title */}
                    <div className="mt-6 md:mt-8 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
                      <div>
                        <p className={`text-xs uppercase tracking-widest mb-2 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>{p.subtitle}</p>
                        <h3 className="text-3xl md:text-4xl lg:text-5xl font-semibold">
                          {p.title.split(' ')[0]} <span style={{ fontFamily: 'var(--font-playfair)', fontStyle: 'italic' }} className="text-emerald-400">{p.title.split(' ').slice(1).join(' ')}</span>
                        </h3>
                      </div>
                      <a
                        href={p.demoUrl}
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
            <div className="flex justify-center">
              <Link href="/projects">
                <Button className={`rounded-full px-8 py-6 text-base font-medium flex items-center gap-2 transition-all duration-300 ${isDark ? 'bg-white/10 text-white/60 border border-white/10 hover:bg-white hover:text-black hover:border-white' : 'bg-black/10 text-black/60 border border-black/10 hover:bg-black hover:text-white hover:border-black'}`}>
                  View All Projects <ChevronRight className="h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </AnimatedSection>

        {/* Process Section */}
        <AnimatedSection className="py-24 md:py-32 relative overflow-hidden">
          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-16 gap-8">
              <div>
                <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6 ${isDark ? 'bg-white/10 border border-white/20 text-white' : 'bg-black/5 border border-black/10 text-black'}`}>
                  Our Process
                </div>
                <h2 className="text-4xl md:text-5xl lg:text-6xl max-w-2xl">
                  <span style={{ fontFamily: 'var(--font-playfair)', fontStyle: 'italic' }}>The Journey</span> to a <span className="font-semibold">Successful Product</span>
                </h2>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
              {/* Connecting Line - visible only on desktop */}
              <div className={`hidden lg:block absolute top-16 left-[12.5%] right-[12.5%] h-[2px] ${isDark ? 'bg-gradient-to-r from-transparent via-white/10 to-transparent' : 'bg-gradient-to-r from-transparent via-black/10 to-transparent'}`} />

              {[
                {
                  title: 'Discover',
                  desc: 'We dive deep into your business goals and user needs to understand the full picture.',
                  icon: (
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <circle cx="11" cy="11" r="8" />
                      <path d="M21 21l-4.35-4.35" />
                      <path d="M11 8v6m-3-3h6" />
                    </svg>
                  ),
                  gradient: 'from-blue-500/20 to-cyan-500/10'
                },
                {
                  title: 'Design',
                  desc: 'Shape powerful experiences with purpose-driven creativity and user-centered thinking.',
                  icon: (
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M12 19l7-7 3 3-7 7-3-3z" />
                      <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
                      <path d="M2 2l7.586 7.586" />
                      <circle cx="11" cy="11" r="2" />
                    </svg>
                  ),
                  gradient: 'from-purple-500/20 to-pink-500/10'
                },
                {
                  title: 'Develop',
                  desc: 'Build scalable solutions with precision, clean code, and modern technologies.',
                  icon: (
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <polyline points="16 18 22 12 16 6" />
                      <polyline points="8 6 2 12 8 18" />
                      <line x1="12" y1="2" x2="12" y2="22" />
                    </svg>
                  ),
                  gradient: 'from-emerald-500/20 to-green-500/10'
                },
                {
                  title: 'Launch & Grow',
                  desc: 'Deploy with impact through strategic rollouts and continuous optimization.',
                  icon: (
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 00-2.91-.09z" />
                      <path d="M12 15l-3-3a22 22 0 012-3.95A12.88 12.88 0 0122 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 01-4 2z" />
                      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
                      <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
                    </svg>
                  ),
                  gradient: 'from-orange-500/20 to-amber-500/10'
                },
              ].map((s, i) => (
                <div key={i} className={`group relative rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 ${isDark ? 'bg-zinc-900/80 border border-white/5 hover:border-white/15 hover:bg-zinc-900' : 'bg-gray-100 border border-gray-200 hover:border-gray-300 hover:bg-gray-50'}`}>
                  {/* Step Number Badge */}
                  <div className={`absolute -top-3 -right-3 w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${isDark ? 'bg-zinc-800 border border-white/10 text-white' : 'bg-white border border-gray-200 text-black shadow-sm'}`}>
                    0{i + 1}
                  </div>

                  {/* Icon */}
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${s.gradient} flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110`}>
                    <div className={isDark ? 'text-white' : 'text-gray-800'}>
                      {s.icon}
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-semibold mb-3">{s.title}</h3>
                  <p className={`text-sm leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{s.desc}</p>

                  {/* Arrow indicator */}
                  <div className={`mt-4 flex items-center gap-2 text-xs font-medium transition-all duration-300 ${isDark ? 'text-gray-500 group-hover:text-white' : 'text-gray-400 group-hover:text-black'}`}>
                    <span>Step {i + 1}</span>
                    <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* Team Section */}
        <AnimatedSection className="py-24 md:py-32 relative overflow-hidden">
          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <div className="text-center mb-16">
              <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6 ${isDark ? 'bg-white/10 border border-white/20 text-white' : 'bg-black/5 border border-black/10 text-black'}`}>
                Owner/Founder
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl">
                Meet Our <span style={{ fontFamily: 'var(--font-playfair)', fontStyle: 'italic' }}>CEO</span>
              </h2>
            </div>
            <div className="flex justify-center">
              <div className={`rounded-3xl overflow-hidden max-w-md w-full ${isDark ? 'bg-zinc-900/80 border border-white/10' : 'bg-gray-100 border border-gray-200'} shadow-2xl`}>
                <div className={`aspect-[3/4] relative ${isDark ? 'bg-gradient-to-b from-zinc-800 to-zinc-900' : 'bg-gradient-to-b from-gray-200 to-gray-300'}`}>
                  <Image
                    src="/khyle-carang.png"
                    alt="Khyle Carang"
                    fill
                    className="object-cover object-top"
                  />
                </div>
                <div className="p-8 text-center">
                  <h3 className="text-2xl font-semibold mb-2">Khyle Carang</h3>
                  <p className={`text-base ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Founder, CEO & Lead Developer</p>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* FAQ Section */}
        <AnimatedSection className="py-24 md:py-32 relative overflow-hidden">
          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <div className="flex justify-center mb-8">
              <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium ${isDark ? 'bg-zinc-800/80 border border-white/10 text-white' : 'bg-white border border-gray-200 text-black shadow-sm'}`}>
                FAQs
              </div>
            </div>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl lg:text-6xl">
                <span className="font-semibold">FAQ</span><span style={{ fontFamily: 'var(--font-playfair)', fontStyle: 'italic' }}>s</span>
              </h2>
            </div>
            <div className="max-w-3xl mx-auto">
              {[
                { q: 'How long does a typical project take?', a: 'Project timelines vary, but most website projects take 2-4 weeks. Complex apps may take longer.' },
                { q: 'Do you offer ongoing support after launch?', a: 'Yes! We offer maintenance packages and ongoing support to keep your product updated and secure.' },
                { q: 'What if I only need design or development?', a: 'That\'s fine. We offer standalone design and development services tailored to your needs.' },
                { q: 'Can you work with my internal team?', a: 'Absolutely. We frequently collaborate with in-house teams as an extension of your workforce.' },
                { q: 'Do you work with startups or only established companies?', a: 'We work with both! From early-stage startups to established companies looking to scale.' },
              ].map((faq, i) => (
                <div key={i} className={`border-b ${isDark ? 'border-white/10' : 'border-gray-200'}`}>
                  <button onClick={() => setOpenFaqIndex(openFaqIndex === i ? null : i)} className="w-full py-6 flex items-center justify-between text-left">
                    <span className={`text-base md:text-lg font-medium pr-8 ${isDark ? 'text-white' : 'text-black'}`}>{faq.q}</span>
                    <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all ${openFaqIndex === i ? (isDark ? 'bg-white text-black' : 'bg-black text-white') : (isDark ? 'bg-zinc-800 text-white' : 'bg-gray-100 text-black')}`}>
                      <svg className={`w-4 h-4 transition-transform ${openFaqIndex === i ? 'rotate-45' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
                      </svg>
                    </div>
                  </button>
                  <div className={`overflow-hidden transition-all ${openFaqIndex === i ? 'max-h-96 pb-6' : 'max-h-0'}`}>
                    <p className={`text-sm md:text-base ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{faq.a}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* Contact Section */}
        <AnimatedSection id="contact" className="py-16 md:py-24 relative overflow-hidden">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="relative bg-black rounded-[2rem] overflow-hidden min-h-[400px] flex flex-col justify-end p-8 md:p-12">
                <canvas
                  ref={(canvas) => {
                    if (canvas && !canvas.dataset.ctaInitialized) {
                      canvas.dataset.ctaInitialized = 'true'
                      const ctx = canvas.getContext('2d')
                      if (!ctx) return
                      const resize = () => { canvas.width = canvas.parentElement?.offsetWidth || 600; canvas.height = canvas.parentElement?.offsetHeight || 500 }
                      resize()
                      window.addEventListener('resize', resize)
                      let time = 0
                      const animate = () => {
                        ctx.clearRect(0, 0, canvas.width, canvas.height)
                        for (let x = 20; x < canvas.width - 20; x += 20) {
                          for (let y = 20; y < canvas.height - 100; y += 20) {
                            const wave = Math.sin(x * 0.02 + y * 0.02 + time * 0.03) * 0.5 + 0.5
                            ctx.beginPath()
                            ctx.arc(x, y, 1.5, 0, Math.PI * 2)
                            ctx.fillStyle = `rgba(255, 255, 255, ${0.1 + wave * 0.2})`
                            ctx.fill()
                          }
                        }
                        time += 1
                        requestAnimationFrame(animate)
                      }
                      animate()
                    }
                  }}
                  className="absolute inset-0 z-0 pointer-events-none"
                />
                <div className="relative z-10">
                  <h2 className="text-4xl md:text-5xl lg:text-6xl text-white font-semibold">Let's Talk</h2>
                  <p className="text-3xl md:text-4xl text-gray-400 mt-2" style={{ fontFamily: 'var(--font-playfair)', fontStyle: 'italic' }}>Your Next Big Idea</p>
                  <div className="mt-8 space-y-4">
                    <p className="text-white">info@godev.com</p>
                    <p className="text-white">+63 949 544 7748</p>
                  </div>
                </div>
              </div>
              <div className={`rounded-[2rem] p-8 md:p-12 ${isDark ? 'bg-zinc-950 border border-white/5' : 'bg-gray-100 border border-gray-200'}`}>
                <h3 className="text-xl md:text-2xl font-medium mb-8">Fill This Form Below</h3>
                {showSuccess && (
                  <div className="mb-6 p-4 bg-green-500/10 border border-green-500/20 rounded-xl text-green-500">
                    <CheckCircle className="inline h-5 w-5 mr-2" />Message sent successfully!
                  </div>
                )}
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Your Name</label>
                    <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className={`w-full bg-transparent border-0 border-b py-3 focus:outline-none ${isDark ? 'border-zinc-700 focus:border-white text-white' : 'border-gray-300 focus:border-black text-black'}`}
                      placeholder="Enter your full name" />
                    {formErrors.name && <p className="mt-2 text-sm text-red-500">{formErrors.name}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Your Email</label>
                    <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className={`w-full bg-transparent border-0 border-b py-3 focus:outline-none ${isDark ? 'border-zinc-700 focus:border-white text-white' : 'border-gray-300 focus:border-black text-black'}`}
                      placeholder="Enter your email" />
                    {formErrors.email && <p className="mt-2 text-sm text-red-500">{formErrors.email}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">More About The Project</label>
                    <textarea value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className={`w-full bg-transparent border rounded-lg py-3 px-4 min-h-[120px] resize-none focus:outline-none ${isDark ? 'border-zinc-700 focus:border-white text-white' : 'border-gray-300 focus:border-black text-black'}`}
                      placeholder="Tell us about your project..." />
                    {formErrors.message && <p className="mt-2 text-sm text-red-500">{formErrors.message}</p>}
                  </div>
                  <button type="submit" disabled={isSubmitting}
                    className="w-full bg-stone-200 hover:bg-stone-300 text-black font-medium py-4 px-6 rounded-full transition-all duration-200 shadow-[0_10px_0_0_rgba(0,0,0,0.2),0_16px_32px_0_rgba(0,0,0,0.15)] hover:shadow-[0_14px_0_0_rgba(0,0,0,0.25),0_20px_40px_0_rgba(0,0,0,0.2)] hover:-translate-y-1 active:shadow-[0_5px_0_0_rgba(0,0,0,0.2),0_8px_16px_0_rgba(0,0,0,0.15)] active:translate-y-1 transform active:scale-[0.98]">
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </AnimatedSection>

        <Footer />
      </div>
    </PageTransition>
  )
}

