'use client'

import { useTheme } from '@/components/providers/ThemeProvider'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { PageTransition, AnimatedSection, AnimatedDiv } from '@/components/ui/animations'
import Link from 'next/link'
import { ArrowLeft, Shield, Lock, Eye, Server, Cookie, Users, Mail, AlertTriangle } from 'lucide-react'

export default function PrivacyPolicy() {
    const { isDark } = useTheme()

    const sections = [
        {
            icon: <Eye className="w-5 h-5" />,
            title: "Information We Collect",
            content: [
                "**Personal Information**: When you contact us, apply for a position, or request our services, we may collect your name, email address, phone number, and any other information you choose to provide.",
                "**Usage Data**: We automatically collect information about how you interact with our website, including pages visited, time spent on pages, and navigation patterns.",
                "**Technical Data**: We collect your IP address, browser type, device information, and operating system to ensure optimal website performance.",
            ]
        },
        {
            icon: <Server className="w-5 h-5" />,
            title: "How We Use Your Information",
            content: [
                "To provide, maintain, and improve our services",
                "To respond to your inquiries and fulfill your requests",
                "To send you updates about our services (with your consent)",
                "To analyze website usage and improve user experience",
                "To detect, prevent, and address technical issues",
                "To comply with legal obligations",
            ]
        },
        {
            icon: <Cookie className="w-5 h-5" />,
            title: "Cookies and Tracking Technologies",
            content: [
                "**Essential Cookies**: Required for website functionality and cannot be disabled.",
                "**Analytics Cookies**: Help us understand how visitors interact with our website using tools like Google Analytics.",
                "**Marketing Cookies**: Used to deliver relevant advertisements and track marketing campaign effectiveness.",
                "**Preference Cookies**: Remember your settings and preferences for a personalized experience.",
                "You can manage your cookie preferences through our cookie consent banner or your browser settings.",
            ]
        },
        {
            icon: <Users className="w-5 h-5" />,
            title: "Information Sharing",
            content: [
                "We do not sell, trade, or rent your personal information to third parties.",
                "We may share information with trusted service providers who assist in operating our website and conducting our business.",
                "We may disclose your information if required by law or to protect our rights, privacy, safety, or property.",
            ]
        },
        {
            icon: <Lock className="w-5 h-5" />,
            title: "Data Security",
            content: [
                "We implement appropriate technical and organizational security measures to protect your personal information.",
                "All data transmission is encrypted using industry-standard SSL/TLS protocols.",
                "Access to personal data is restricted to authorized personnel only.",
                "We regularly review and update our security practices.",
            ]
        },
        {
            icon: <Shield className="w-5 h-5" />,
            title: "Your Rights",
            content: [
                "**Access**: Request a copy of the personal data we hold about you.",
                "**Correction**: Request correction of inaccurate personal data.",
                "**Deletion**: Request deletion of your personal data (subject to legal requirements).",
                "**Objection**: Object to the processing of your personal data.",
                "**Data Portability**: Request transfer of your data to another service.",
                "To exercise these rights, please contact us at info@godev.com.",
            ]
        },
    ]

    return (
        <PageTransition>
            <div className={`min-h-screen transition-colors duration-500 ${isDark ? 'bg-black text-white' : 'bg-gray-50 text-gray-900'}`}>
                <Navbar />

                {/* Hero Section */}
                <AnimatedSection className="pt-32 pb-16 relative overflow-hidden">
                    <div className="container mx-auto px-4 md:px-6 relative z-10">
                        <AnimatedDiv variant="fadeUp">
                            <Link
                                href="/"
                                className={`inline-flex items-center gap-2 text-sm mb-8 transition-colors ${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-black'}`}
                            >
                                <ArrowLeft className="w-4 h-4" />
                                Back to Home
                            </Link>
                        </AnimatedDiv>

                        <AnimatedDiv variant="fadeUp" delay={0.1}>
                            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6 ${isDark ? 'bg-white/10 border border-white/20 text-white' : 'bg-black/5 border border-black/10 text-black'}`}>
                                <Shield className="w-4 h-4" />
                                Legal
                            </div>
                        </AnimatedDiv>

                        <AnimatedDiv variant="fadeUp" delay={0.2}>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold mb-4">
                                Privacy <span style={{ fontFamily: 'var(--font-playfair)', fontStyle: 'italic' }}>Policy</span>
                            </h1>
                        </AnimatedDiv>

                        <AnimatedDiv variant="fadeUp" delay={0.3}>
                            <p className={`text-lg max-w-2xl ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                                Your privacy is important to us. This policy explains how we collect, use, and protect your personal information.
                            </p>
                        </AnimatedDiv>

                        <AnimatedDiv variant="fadeUp" delay={0.4}>
                            <p className={`text-sm mt-4 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                                Last updated: January 2026
                            </p>
                        </AnimatedDiv>
                    </div>
                </AnimatedSection>

                {/* Content Sections */}
                <AnimatedSection className="py-16 md:py-24">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="max-w-4xl mx-auto">
                            {sections.map((section, index) => (
                                <AnimatedDiv
                                    key={index}
                                    variant="fadeUp"
                                    delay={0.1 * index}
                                    className={`mb-12 p-8 rounded-2xl ${isDark ? 'bg-zinc-900/50 border border-white/5' : 'bg-white border border-gray-200'}`}
                                >
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isDark ? 'bg-white/10 text-white' : 'bg-black/5 text-black'}`}>
                                            {section.icon}
                                        </div>
                                        <h2 className="text-xl font-semibold">{section.title}</h2>
                                    </div>
                                    <ul className="space-y-4">
                                        {section.content.map((item, i) => (
                                            <li
                                                key={i}
                                                className={`text-sm leading-relaxed pl-4 border-l-2 ${isDark ? 'text-gray-400 border-white/10' : 'text-gray-600 border-gray-200'}`}
                                                dangerouslySetInnerHTML={{
                                                    __html: item.replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-medium">$1</strong>')
                                                }}
                                            />
                                        ))}
                                    </ul>
                                </AnimatedDiv>
                            ))}

                            {/* Contact Section */}
                            <AnimatedDiv
                                variant="fadeUp"
                                delay={0.6}
                                className={`p-8 rounded-2xl ${isDark ? 'bg-gradient-to-br from-emerald-500/10 to-cyan-500/5 border border-emerald-500/20' : 'bg-gradient-to-br from-emerald-50 to-cyan-50 border border-emerald-200'}`}
                            >
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                                        <Mail className="w-6 h-6 text-emerald-400" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold mb-2">Questions About Privacy?</h3>
                                        <p className={`text-sm mb-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                                            If you have any questions about this Privacy Policy or our data practices, please contact us.
                                        </p>
                                        <a
                                            href="mailto:info@godev.com"
                                            className="inline-flex items-center gap-2 text-sm font-medium text-emerald-400 hover:text-emerald-300 transition-colors"
                                        >
                                            info@godev.com
                                            <ArrowLeft className="w-4 h-4 rotate-180" />
                                        </a>
                                    </div>
                                </div>
                            </AnimatedDiv>
                        </div>
                    </div>
                </AnimatedSection>

                <Footer />
            </div>
        </PageTransition>
    )
}
