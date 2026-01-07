'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { CheckCircle, ChevronRight } from 'lucide-react'
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

export default function ContactPage() {
    const { isDark } = useTheme()
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [showSuccess, setShowSuccess] = useState(false)
    const [formErrors, setFormErrors] = useState({
        name: '',
        email: '',
        message: ''
    })

    const validateForm = () => {
        const errors = {
            name: '',
            email: '',
            message: ''
        }

        if (!formData.name.trim()) {
            errors.name = 'Name is required'
        } else if (formData.name.trim().length < 2) {
            errors.name = 'Name must be at least 2 characters'
        }

        if (!formData.email.trim()) {
            errors.email = 'Email is required'
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            errors.email = 'Please enter a valid email address'
        }

        if (!formData.message.trim()) {
            errors.message = 'Message is required'
        } else if (formData.message.trim().length < 10) {
            errors.message = 'Message must be at least 10 characters'
        }

        setFormErrors(errors)
        return !errors.name && !errors.email && !errors.message
    }

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }))
        if (formErrors[field as keyof typeof formErrors]) {
            setFormErrors(prev => ({ ...prev, [field]: '' }))
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!validateForm()) {
            return
        }

        setIsSubmitting(true)

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            })

            const result = await response.json()

            if (response.ok) {
                setShowSuccess(true)
                setFormData({ name: '', email: '', message: '' })
                setFormErrors({ name: '', email: '', message: '' })
                setTimeout(() => setShowSuccess(false), 5000)
            } else {
                if (result.error) {
                    setFormErrors({
                        name: result.error.includes('name') ? result.error : '',
                        email: result.error.includes('email') ? result.error : '',
                        message: result.error.includes('message') ? result.error : result.error
                    })
                }
            }
        } catch (error) {
            console.error('Form submission error:', error)
            setFormErrors({
                name: '',
                email: '',
                message: 'Network error. Please try again.'
            })
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
        
        .float-3d {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>

                <Navbar />

                {/* Contact Section */}
                <AnimatedSection className="pt-32 pb-16 md:py-32 relative overflow-hidden">
                    <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-white/5 rounded-full blur-3xl float-3d" />
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
                            {/* Left Panel - Dot Grid Background */}
                            <div className="relative bg-black rounded-[2rem] overflow-hidden min-h-[400px] md:min-h-[600px] flex flex-col justify-between p-8 md:p-12">
                                {/* Animated Dot Grid Canvas */}
                                <canvas
                                    ref={(canvas) => {
                                        if (canvas && !canvas.dataset.ctaInitialized) {
                                            canvas.dataset.ctaInitialized = 'true';
                                            const ctx = canvas.getContext('2d');
                                            if (!ctx) return;

                                            const resize = () => {
                                                canvas.width = canvas.parentElement?.offsetWidth || 600;
                                                canvas.height = canvas.parentElement?.offsetHeight || 500;
                                            };
                                            resize();
                                            window.addEventListener('resize', resize);

                                            let time = 0;
                                            const dotSpacing = 20;
                                            const dotRadius = 1.5;

                                            const animate = () => {
                                                ctx.clearRect(0, 0, canvas.width, canvas.height);

                                                for (let x = dotSpacing; x < canvas.width - 20; x += dotSpacing) {
                                                    for (let y = dotSpacing; y < canvas.height - 100; y += dotSpacing) {
                                                        const wave = Math.sin(x * 0.02 + y * 0.02 + time * 0.03) * 0.5 + 0.5;
                                                        const opacity = 0.1 + wave * 0.2;

                                                        ctx.beginPath();
                                                        ctx.arc(x, y, dotRadius, 0, Math.PI * 2);
                                                        ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
                                                        ctx.fill();
                                                    }
                                                }

                                                time += 1;
                                                requestAnimationFrame(animate);
                                            };
                                            animate();
                                        }
                                    }}
                                    className="absolute inset-0 z-0 pointer-events-none"
                                />

                                {/* Top Content */}
                                <div className="relative z-10">
                                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6 bg-white/10 border border-white/20 text-white">
                                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                                        </svg>
                                        Get In Touch
                                    </div>
                                </div>

                                {/* Bottom Content */}
                                <div className="relative z-10">
                                    <h1 className="text-4xl md:text-5xl lg:text-6xl text-white font-semibold leading-tight">
                                        Let's Talk
                                    </h1>
                                    <p
                                        className="text-3xl md:text-4xl lg:text-5xl text-gray-400 mt-2"
                                        style={{ fontFamily: 'var(--font-playfair)', fontStyle: 'italic' }}
                                    >
                                        Your Next Big Idea
                                    </p>

                                    {/* Contact Info */}
                                    <div className="mt-12 space-y-6">
                                        <div>
                                            <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">Email</p>
                                            <a href="mailto:info@godev.com" className="text-lg text-white hover:text-gray-300 transition-colors">
                                                info@godev.com
                                            </a>
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">Phone</p>
                                            <a href="tel:+639495447748" className="text-lg text-white hover:text-gray-300 transition-colors">
                                                +63 949 544 7748
                                            </a>
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">Location</p>
                                            <p className="text-lg text-white">
                                                Cebu City, Philippines
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Right Panel - Contact Form */}
                            <div className="bg-zinc-950 rounded-[2rem] p-8 md:p-10 lg:p-12 border border-white/5">
                                <h3 className="text-xl md:text-2xl text-white font-medium mb-8">
                                    Fill This Form Below
                                </h3>

                                {showSuccess && (
                                    <div className="mb-6 p-4 bg-green-500/10 border border-green-500/20 rounded-xl text-green-500">
                                        <CheckCircle className="inline h-5 w-5 mr-2" />
                                        Message sent successfully!
                                    </div>
                                )}

                                <form onSubmit={handleSubmit} className="space-y-6">
                                    {/* Name Field */}
                                    <div>
                                        <label className="block text-sm font-medium text-white mb-2">
                                            Your Name
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.name}
                                            onChange={(e) => handleInputChange('name', e.target.value)}
                                            className="w-full bg-transparent border-0 border-b border-zinc-700 focus:border-white text-white placeholder-zinc-500 py-3 px-0 focus:outline-none focus:ring-0 transition-colors"
                                            placeholder="Enter your full name"
                                        />
                                        {formErrors.name && (
                                            <p className="mt-2 text-sm text-red-500">{formErrors.name}</p>
                                        )}
                                    </div>

                                    {/* Email Field */}
                                    <div>
                                        <label className="block text-sm font-medium text-white mb-2">
                                            Your Email
                                        </label>
                                        <input
                                            type="email"
                                            value={formData.email}
                                            onChange={(e) => handleInputChange('email', e.target.value)}
                                            className="w-full bg-transparent border-0 border-b border-zinc-700 focus:border-white text-white placeholder-zinc-500 py-3 px-0 focus:outline-none focus:ring-0 transition-colors"
                                            placeholder="Enter the e-mail"
                                        />
                                        {formErrors.email && (
                                            <p className="mt-2 text-sm text-red-500">{formErrors.email}</p>
                                        )}
                                    </div>

                                    {/* Project Description Field */}
                                    <div>
                                        <label className="block text-sm font-medium text-white mb-2">
                                            More About The Project
                                        </label>
                                        <textarea
                                            value={formData.message}
                                            onChange={(e) => handleInputChange('message', e.target.value)}
                                            className="w-full bg-transparent border border-zinc-700 focus:border-white text-white placeholder-zinc-500 py-3 px-4 rounded-lg focus:outline-none focus:ring-0 transition-colors min-h-[150px] resize-none"
                                            placeholder="Tell us about your project..."
                                        />
                                        {formErrors.message && (
                                            <p className="mt-2 text-sm text-red-500">{formErrors.message}</p>
                                        )}
                                    </div>

                                    {/* Submit Button */}
                                    <button
                                        type="submit"
                                        className="w-full bg-stone-200 hover:bg-stone-300 text-black font-medium py-4 px-6 rounded-full transition-all duration-200 shadow-[0_10px_0_0_rgba(0,0,0,0.2),0_16px_32px_0_rgba(0,0,0,0.15)] hover:shadow-[0_14px_0_0_rgba(0,0,0,0.25),0_20px_40px_0_rgba(0,0,0,0.2)] hover:-translate-y-1 active:shadow-[0_5px_0_0_rgba(0,0,0,0.2),0_8px_16px_0_rgba(0,0,0,0.15)] active:translate-y-1 transform active:scale-[0.98]"
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? 'Sending...' : 'Send Message'}
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </AnimatedSection>

                {/* Services Quick Links */}
                <AnimatedSection className="py-16 md:py-24">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="text-center mb-12">
                            <h2 className="text-2xl md:text-3xl font-semibold mb-4">
                                Explore Our Services
                            </h2>
                            <p className={`max-w-2xl mx-auto ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                                Not sure where to start? Check out what we offer.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {[
                                { title: 'Web Development', href: '/services', description: 'Custom websites and web applications' },
                                { title: 'Mobile Apps', href: '/services', description: 'iOS and Android development' },
                                { title: 'UI/UX Design', href: '/services', description: 'Beautiful user experiences' },
                            ].map((service, index) => (
                                <Link
                                    key={index}
                                    href={service.href}
                                    className={`group p-6 rounded-2xl transition-all duration-300 hover:-translate-y-1 ${isDark
                                        ? 'bg-zinc-900/50 border border-white/5 hover:border-white/10'
                                        : 'bg-gray-100 border border-gray-200 hover:border-gray-300'
                                        }`}
                                >
                                    <h3 className="text-lg font-semibold mb-2 flex items-center justify-between">
                                        {service.title}
                                        <ChevronRight className="h-5 w-5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                                    </h3>
                                    <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                                        {service.description}
                                    </p>
                                </Link>
                            ))}
                        </div>
                    </div>
                </AnimatedSection>
                <Footer />
            </div>
        </PageTransition>
    )
}
