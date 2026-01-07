'use client'

import { useTheme } from '@/components/providers/ThemeProvider'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { PageTransition, AnimatedSection, AnimatedDiv } from '@/components/ui/animations'
import Link from 'next/link'
import { ArrowLeft, FileText, Scale, Briefcase, AlertCircle, Clock, Shield, Ban, Mail } from 'lucide-react'

export default function TermsOfService() {
    const { isDark } = useTheme()

    const sections = [
        {
            icon: <FileText className="w-5 h-5" />,
            title: "Acceptance of Terms",
            content: [
                "By accessing and using the GoDev website and services, you accept and agree to be bound by these Terms of Service.",
                "If you do not agree to these terms, please do not use our website or services.",
                "We reserve the right to modify these terms at any time. Continued use of our services after changes constitutes acceptance of the modified terms.",
            ]
        },
        {
            icon: <Briefcase className="w-5 h-5" />,
            title: "Services Description",
            content: [
                "GoDev provides web development, mobile app development, UI/UX design, and related digital services.",
                "Our services are provided on a project basis with specific terms outlined in individual project agreements.",
                "Service availability may vary based on project requirements and our current capacity.",
                "We reserve the right to refuse service to anyone for any reason at any time.",
            ]
        },
        {
            icon: <Scale className="w-5 h-5" />,
            title: "Intellectual Property",
            content: [
                "All content on this website, including text, graphics, logos, and software, is the property of GoDev and protected by intellectual property laws.",
                "Upon full payment, clients receive ownership rights to deliverables as specified in their project agreement.",
                "GoDev retains the right to showcase completed projects in our portfolio unless otherwise agreed in writing.",
                "Any unauthorized reproduction, distribution, or use of our content is strictly prohibited.",
            ]
        },
        {
            icon: <Clock className="w-5 h-5" />,
            title: "Project Terms",
            content: [
                "**Timeline**: Project timelines are estimates and may be affected by scope changes, client response times, or unforeseen circumstances.",
                "**Payment**: Payment terms are specified in individual project agreements. Late payments may result in project suspension.",
                "**Revisions**: The number of revisions included depends on the project agreement. Additional revisions may incur extra charges.",
                "**Cancellation**: Project cancellation terms and refund policies are outlined in individual contracts.",
            ]
        },
        {
            icon: <Shield className="w-5 h-5" />,
            title: "Warranties and Liability",
            content: [
                "Our services are provided \"as is\" without warranties of any kind, either express or implied.",
                "We do not guarantee uninterrupted, error-free, or secure service.",
                "GoDev shall not be liable for any indirect, incidental, special, consequential, or punitive damages.",
                "Our total liability shall not exceed the amount paid by you for the specific service in question.",
            ]
        },
        {
            icon: <Ban className="w-5 h-5" />,
            title: "Prohibited Uses",
            content: [
                "You agree not to use our website or services for any unlawful purpose or in violation of any applicable laws.",
                "You may not attempt to gain unauthorized access to our systems or networks.",
                "You may not use our services to transmit viruses, malware, or other harmful code.",
                "Harassment, defamation, or infringement of others' rights through our services is strictly prohibited.",
            ]
        },
        {
            icon: <AlertCircle className="w-5 h-5" />,
            title: "Indemnification",
            content: [
                "You agree to indemnify and hold harmless GoDev, its officers, directors, employees, and agents from any claims, damages, losses, or expenses arising from:",
                "Your use of our services or website",
                "Your violation of these Terms of Service",
                "Your violation of any rights of another party",
                "Any content you provide to us in connection with our services",
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
                                <Scale className="w-4 h-4" />
                                Legal
                            </div>
                        </AnimatedDiv>

                        <AnimatedDiv variant="fadeUp" delay={0.2}>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold mb-4">
                                Terms of <span style={{ fontFamily: 'var(--font-playfair)', fontStyle: 'italic' }}>Service</span>
                            </h1>
                        </AnimatedDiv>

                        <AnimatedDiv variant="fadeUp" delay={0.3}>
                            <p className={`text-lg max-w-2xl ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                                Please read these terms carefully before using our website or services. By using GoDev, you agree to these terms.
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

                            {/* Governing Law */}
                            <AnimatedDiv
                                variant="fadeUp"
                                delay={0.7}
                                className={`mb-12 p-8 rounded-2xl ${isDark ? 'bg-zinc-900/50 border border-white/5' : 'bg-white border border-gray-200'}`}
                            >
                                <div className="flex items-center gap-3 mb-6">
                                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isDark ? 'bg-white/10 text-white' : 'bg-black/5 text-black'}`}>
                                        <FileText className="w-5 h-5" />
                                    </div>
                                    <h2 className="text-xl font-semibold">Governing Law</h2>
                                </div>
                                <p className={`text-sm leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                                    These Terms of Service shall be governed by and construed in accordance with the laws of the Philippines.
                                    Any disputes arising from these terms shall be subject to the exclusive jurisdiction of the courts located in Cebu City, Philippines.
                                </p>
                            </AnimatedDiv>

                            {/* Contact Section */}
                            <AnimatedDiv
                                variant="fadeUp"
                                delay={0.8}
                                className={`p-8 rounded-2xl ${isDark ? 'bg-gradient-to-br from-blue-500/10 to-indigo-500/5 border border-blue-500/20' : 'bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200'}`}
                            >
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                                        <Mail className="w-6 h-6 text-blue-400" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold mb-2">Questions About Our Terms?</h3>
                                        <p className={`text-sm mb-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                                            If you have any questions about these Terms of Service, please don't hesitate to contact us.
                                        </p>
                                        <a
                                            href="mailto:info@godev.com"
                                            className="inline-flex items-center gap-2 text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors"
                                        >
                                            info@godev.com
                                            <ArrowLeft className="w-4 h-4 rotate-180" />
                                        </a>
                                    </div>
                                </div>
                            </AnimatedDiv>

                            {/* Related Links */}
                            <AnimatedDiv variant="fadeUp" delay={0.9} className="mt-12 text-center">
                                <p className={`text-sm mb-4 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                                    See also:
                                </p>
                                <div className="flex justify-center gap-4">
                                    <Link
                                        href="/privacy"
                                        className={`text-sm font-medium transition-colors ${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-black'}`}
                                    >
                                        Privacy Policy
                                    </Link>
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
