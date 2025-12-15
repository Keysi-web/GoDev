'use client'

import { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
//import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
//import { Separator } from '@/components/ui/separator'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
//import { Label } from '@/components/ui/label'
import { 
  Code2, 
  Smartphone, 
  Palette, 
  ShoppingCart, 
  Bot, 
  MessageSquare, 
  Settings,
  Zap,
  Shield,
  Users,
  TrendingUp,
  Headphones,
  ChevronRight,
  Star,
  CheckCircle,
  Menu,
  X,
  Moon,
  Sun,
  Send
} from 'lucide-react'

export default function GoDevLanding() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [formErrors, setFormErrors] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [isDark, setIsDark] = useState(true)
  const [metrics, setMetrics] = useState({
    projects: 0,
    clients: 0,
    satisfaction: 0,
    countries: 0
  })
   const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hi! How can we help you today?", sender: "agent" }
  ]);
  const [inputValue, setInputValue] = useState("");

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      setMessages([...messages, { text: inputValue, sender: "user" }]);
      setInputValue("");
      
      // Simulate agent response
      setTimeout(() => {
        setMessages(prev => [...prev, { 
          text: "Thanks for your message! Our team will respond shortly.", 
          sender: "agent" 
        }]);
      }, 1000);
    }
  }

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Animate metrics
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateMetrics()
        }
      })
    }, { threshold: 0.5 })

    const metricsSection = document.getElementById('metrics')
    if (metricsSection) {
      observer.observe(metricsSection)
    }

    return () => observer.disconnect()
  }, [])

  const animateMetrics = () => {
    const duration = 2000
    const steps = 60
    const interval = duration / steps

    let step = 0
    const timer = setInterval(() => {
      step++
      const progress = step / steps

      setMetrics({
        projects: Math.floor(500 * progress),
        clients: Math.floor(200 * progress),
        satisfaction: Math.floor(98 * progress),
        countries: Math.floor(25 * progress)
      })

      if (step >= steps) {
        clearInterval(timer)
        setMetrics({
          projects: 500,
          clients: 200,
          satisfaction: 98,
          countries: 25
        })
      }
    }, interval)
  }

  const navItems = [
    { label: 'Home', href: '#home' },
    { label: 'Services', href: '#services' },
    { label: 'About', href: '#about' },
    { label: 'Blogs', href: '#blogs' },
    { label: 'Testimonials', href: '#testimonials' },
    { label: 'Contact', href: '#contact' },
    { label: 'Careers', href: '/careers' }
  ]

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

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (formErrors[field]) {
      setFormErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const handleSubmit = async (e) => {
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

  const services = [
    {
      icon: Code2,
      title: 'Website Development',
      description: 'Custom, scalable web applications built with modern technologies'
    },
    {
      icon: Smartphone,
      title: 'Mobile App Development',
      description: 'Native and cross-platform mobile apps for iOS and Android'
    },
    {
      icon: Palette,
      title: 'UI/UX & Website Design',
      description: 'Beautiful, intuitive designs that delight users and drive conversions'
    },
    {
      icon: ShoppingCart,
      title: 'E-commerce Solutions',
      description: 'Complete online stores with payment integration and inventory management'
    },
    {
      icon: Bot,
      title: 'AI Automation',
      description: 'Intelligent automation solutions powered by cutting-edge AI technology'
    },
    {
      icon: MessageSquare,
      title: 'Chat Support Systems',
      description: 'Real-time chat solutions to enhance customer engagement'
    },
    {
      icon: Settings,
      title: 'Custom Business Systems',
      description: 'Tailored software solutions to streamline your business operations'
    }
  ]

  const benefits = [
    {
      icon: Zap,
      title: 'Fast & Reliable Delivery',
      description: 'Agile development methodology ensures quick turnaround without compromising quality'
    },
    {
      icon: Shield,
      title: 'Scalable & Maintainable',
      description: 'Built with best practices to grow with your business and stay maintainable'
    },
    {
      icon: Users,
      title: 'Developer-First Mindset',
      description: 'We understand technology deeply because we are developers ourselves'
    },
    {
      icon: TrendingUp,
      title: 'Business Growth Focused',
      description: 'Every solution is designed to drive real business results and ROI'
    },
    {
      icon: Headphones,
      title: 'Dedicated Support',
      description: '24/7 support and maintenance to keep your systems running smoothly'
    }
  ]

  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'CEO, TechStart Inc.',
      content: 'GoDev transformed our business with their custom automation system. We saved 40% in operational costs.',
      rating: 5
    },
    {
      name: 'Michael Rodriguez',
      role: 'Founder, RetailFlow',
      content: 'The e-commerce platform they built exceeded our expectations. Sales increased by 60% in the first quarter.',
      rating: 5
    },
    {
      name: 'Emily Watson',
      role: 'CTO, DataSync Solutions',
      content: 'As a developer-led company, they speak our language. The code quality and architecture are exceptional.',
      rating: 5
    }
  ]

  return (
    <div className={`min-h-screen transition-colors duration-500 ${isDark ? 'bg-black text-white' : 'bg-gray-50 text-gray-900'}`}>
      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 20px rgba(255,255,255,0.1); }
          50% { box-shadow: 0 0 40px rgba(255,255,255,0.3), 0 0 60px rgba(255,255,255,0.2); }
        }
        
        @keyframes wobble {
          0%, 100% { transform: rotate(0deg) translateY(0); }
          25% { transform: rotate(1deg) translateY(-5px); }
          50% { transform: rotate(0deg) translateY(0); }
          75% { transform: rotate(-1deg) translateY(-5px); }
        }
        
        @keyframes slide {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        
        @keyframes wave {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        
        .glow-card {
          animation: glow 3s ease-in-out infinite;
          transition: all 0.3s ease;
        }
        
        .glow-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 0 60px rgba(255,255,255,0.4), 0 0 80px rgba(255,255,255,0.3) !important;
        }
        
        .wobble-card {
          transition: all 0.3s ease;
        }
        
        .wobble-card:hover {
          animation: wobble 0.5s ease-in-out;
        }
        
        .loop-container {
          display: flex;
          animation: slide 20s linear infinite;
        }
        
        .loop-container:hover {
          animation-play-state: paused;
        }
        
        .wave-bg {
          background: linear-gradient(-45deg, #000, #1a1a1a, #000, #0a0a0a);
          background-size: 400% 400%;
          animation: wave 15s ease infinite;
        }
        
        .float-3d {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>

      {/* Floating Navbar */}
      <nav className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'w-11/12 max-w-6xl' 
          : 'w-11/12 max-w-7xl'
      }`}>
        <div className={`rounded-full backdrop-blur-xl border transition-all duration-500 ${
          isDark 
            ? 'bg-black/40 border-white/10' 
            : 'bg-white/40 border-gray-200/50'
        } ${isScrolled ? 'py-2 px-6 shadow-2xl' : 'py-3 px-8 shadow-xl'}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className={`w-8 h-8 rounded-full ${isDark ? 'bg-white' : 'bg-black'}`} />
              <span className="font-bold text-xl">GoDev</span>
            </div>

            <div className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className={`px-4 py-2 rounded-full transition-all duration-300 hover:scale-105 ${
                    isDark 
                      ? 'hover:bg-white/10' 
                      : 'hover:bg-black/5'
                  }`}
                >
                  {item.label}
                </a>
              ))}
            </div>

            <div className="flex items-center space-x-3">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsDark(!isDark)}
                className={`rounded-full ${isDark ? 'hover:bg-white/10' : 'hover:bg-black/5'}`}
              >
                {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>
              
              <Button 
                size="sm"
                className={`rounded-full ${
                  isDark 
                    ? 'bg-white text-black hover:bg-gray-200' 
                    : 'bg-black text-white hover:bg-gray-800'
                }`}
                onClick={() => window.location.href = '/careers'}
              >
                Get Started
              </Button>

              <Sheet>
                <SheetTrigger asChild className="md:hidden">
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className={isDark ? 'bg-black border-white/10' : 'bg-white'}>
                  <div className="flex flex-col space-y-4 mt-8">
                    {navItems.map((item) => (
                      <a
                        key={item.label}
                        href={item.href}
                        className="text-lg font-medium hover:text-gray-400 transition-colors"
                      >
                        {item.label}
                      </a>
                    ))}
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section with 3D Background */}
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* 3D Background */}
        <div className="absolute inset-0">
          <div className={`absolute inset-0 ${isDark ? 'bg-black' : 'bg-gray-50'}`} />
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl float-3d" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl float-3d" style={{ animationDelay: '2s' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-white/3 rounded-full blur-3xl float-3d" style={{ animationDelay: '4s' }} />
        </div>

        <div className="relative z-10 container mx-auto px-4 pt-32 pb-20 text-center">
          <Badge className={`mb-6 px-4 py-1 rounded-full ${
            isDark 
              ? 'bg-white/10 text-white border-white/20' 
              : 'bg-black/10 text-black border-black/20'
          }`}>
            Development for Developers
          </Badge>
          
          <h1 className="text-6xl md:text-8xl font-bold mb-6 leading-tight">
            Build. Scale.
            <br />
            <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>Innovate.</span>
          </h1>
          
          <p className={`text-xl md:text-2xl mb-12 max-w-2xl mx-auto ${
            isDark ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Custom software solutions that drive real business growth. 
          </p>
          
         <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              className={`rounded-full px-8 ${
                isDark 
                  ? 'bg-white text-black hover:bg-gray-200' 
                  : 'bg-black text-white hover:bg-gray-800'
              }`}
              onClick={() => window.location.href = '/#contact'}
            >
              Build a Project
              <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
            
            <Button 
              variant="outline" 
              size="lg" 
              className={`rounded-full px-8 ${
                isDark 
                  ? 'border-white/20 text-black hover:bg-white/10' 
                  : 'border-black/20 hover:bg-black/5'
              }`}
              onClick={() => window.location.href = '/careers'}
            >
              Join Our Team
            </Button>
          </div>
        </div>
      </section>

      {/* Services Section with Glowing Cards */}
      <section id="services" className="py-32 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold mb-4">What We Do</h2>
            <div className={`w-20 h-1 mx-auto ${isDark ? 'bg-white' : 'bg-black'}`} />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className={`glow-card p-8 rounded-3xl border ${
                  isDark 
                    ? 'bg-white/5 border-white/10' 
                    : 'bg-white border-gray-200'
                }`}
              >
                <service.icon className="h-12 w-12 mb-6" />
                <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose GoDev - Looping Section */}
      <section id="about" className="py-32 overflow-hidden">
        <div className="container mx-auto px-4 mb-16">
          <div className="text-center">
            <h2 className="text-5xl font-bold mb-4">Why Choose GoDev</h2>
            <div className={`w-20 h-1 mx-auto ${isDark ? 'bg-white' : 'bg-black'}`} />
          </div>
        </div>
        
        <div className="relative">
          <div className="flex">
            <div className="loop-container">
              {[...benefits, ...benefits].map((benefit, index) => (
                <div key={index} className="flex-shrink-0 w-96 mx-4">
                  <div className={`p-8 rounded-3xl border h-full ${
                    isDark 
                      ? 'bg-white/5 border-white/10' 
                      : 'bg-white border-gray-200'
                  }`}>
                    <benefit.icon className="h-10 w-10 mb-4" />
                    <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
                    <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                      {benefit.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Blogs Section with Wobble Cards */}
      <section id="blogs" className="py-32">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold mb-4">Latest Insights</h2>
            <div className={`w-20 h-1 mx-auto ${isDark ? 'bg-white' : 'bg-black'}`} />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                category: 'Development',
                title: 'Scalable React Applications',
                excerpt: 'Best practices for building React apps that grow with your business'
              },
              {
                category: 'AI & Automation',
                title: 'AI in Business Workflows',
                excerpt: 'Practical ways to leverage AI for business efficiency'
              },
              {
                category: 'Strategy',
                title: 'Build vs Buy Software',
                excerpt: 'When to choose custom development over off-the-shelf solutions'
              }
            ].map((blog, index) => (
              <div
                key={index}
                className={`wobble-card p-8 rounded-3xl border cursor-pointer ${
                  isDark 
                    ? 'bg-white/5 border-white/10 hover:bg-white/10' 
                    : 'bg-white border-gray-200 hover:shadow-xl'
                }`}
              >
                <div className={`text-sm mb-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  {blog.category}
                </div>
                <h3 className="text-2xl font-bold mb-4">{blog.title}</h3>
                <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                  {blog.excerpt}
                </p>
                <div className="mt-6 inline-flex items-center hover:gap-2 transition-all">
                  Read More <ChevronRight className="h-4 w-4 ml-1" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials - Minimalist */}
      <section id="testimonials" className="py-32">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold mb-4">Client Success</h2>
            <div className={`w-20 h-1 mx-auto ${isDark ? 'bg-white' : 'bg-black'}`} />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className={`p-8 rounded-3xl ${
                  isDark ? 'bg-white/5' : 'bg-white border border-gray-200'
                }`}
              >
                <div className="flex mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-current" />
                  ))}
                </div>
                <p className={`mb-6 text-lg ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  "{testimonial.content}"
                </p>
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {testimonial.role}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Metrics */}
          <div id="metrics" className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-5xl font-bold mb-2">{metrics.projects}+</div>
              <div className={isDark ? 'text-gray-400' : 'text-gray-600'}>Projects Delivered</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold mb-2">{metrics.clients}+</div>
              <div className={isDark ? 'text-gray-400' : 'text-gray-600'}>Happy Clients</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold mb-2">{metrics.satisfaction}%</div>
              <div className={isDark ? 'text-gray-400' : 'text-gray-600'}>Satisfaction Rate</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold mb-2">{metrics.countries}+</div>
              <div className={isDark ? 'text-gray-400' : 'text-gray-600'}>Countries Served</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section with Moving Background */}
      <section id="contact" className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 wave-bg" />
        
        <div className="relative z-10 container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-5xl font-bold mb-6">Let's Build Together</h2>
              <p className={`text-xl ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Ready to start your project?
              </p>
            </div>
            
            <div className={`p-8 rounded-3xl ${
              isDark 
                ? 'bg-white/5 border border-white/10' 
                : 'bg-white border border-gray-200'
            }`}>
              {showSuccess && (
                <div className="mb-6 p-4 bg-green-500/10 border border-green-500/20 rounded-2xl text-green-500">
                  <CheckCircle className="inline h-5 w-5 mr-2" />
                  Message sent successfully!
                </div>
              )}
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className={`rounded-2xl ${
                      isDark 
                        ? 'bg-white/5 border-white/10' 
                        : 'bg-gray-50 border-gray-200'
                    }`}
                    placeholder="Your name"
                  />
                  {formErrors.name && (
                    <p className="mt-2 text-sm text-red-500">{formErrors.name}</p>
                  )}
                </div>
                
                <div>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className={`rounded-2xl ${
                      isDark 
                        ? 'bg-white/5 border-white/10' 
                        : 'bg-gray-50 border-gray-200'
                    }`}
                    placeholder="your@email.com"
                  />
                  {formErrors.email && (
                    <p className="mt-2 text-sm text-red-500">{formErrors.email}</p>
                  )}
                </div>
                
                <div>
                  <Textarea
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    className={`rounded-2xl min-h-[120px] ${
                      isDark 
                        ? 'bg-white/5 border-white/10' 
                        : 'bg-gray-50 border-gray-200'
                    }`}
                    placeholder="Tell us about your project..."
                  />
                  {formErrors.message && (
                    <p className="mt-2 text-sm text-red-500">{formErrors.message}</p>
                  )}
                </div>
                
                <Button 
                  type="submit" 
                  size="lg" 
                  className={`w-full rounded-full ${
                    isDark 
                      ? 'bg-white text-black hover:bg-gray-200' 
                      : 'bg-black text-white hover:bg-gray-800'
                  }`}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

     {/* Minimalist Footer */}
      <footer className="bg-black text-white py-16">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div>
              <h3 className="text-3xl font-semibold mb-4 tracking-tight">
                GoDev
              </h3>
              <p className="text-gray-400 text-sm font-normal leading-relaxed">
                Development for Developers. Building systems that scale your business.
              </p>
            </div>
            
            <div>
              <h4 className="text-sm font-semibold mb-4 tracking-wide uppercase text-gray-300">Services</h4>
              <ul className="space-y-3 text-gray-400 text-sm font-normal">
                <li className="hover:text-white transition-colors cursor-pointer">Web Development</li>
                <li className="hover:text-white transition-colors cursor-pointer">Mobile Apps</li>
                <li className="hover:text-white transition-colors cursor-pointer">AI Solutions</li>
                <li className="hover:text-white transition-colors cursor-pointer">Business Automation</li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-sm font-semibold mb-4 tracking-wide uppercase text-gray-300">Company</h4>
              <ul className="space-y-3 text-gray-400 text-sm font-normal">
                <li className="hover:text-white transition-colors cursor-pointer">About Us</li>
                <li className="hover:text-white transition-colors cursor-pointer">Careers</li>
                <li className="hover:text-white transition-colors cursor-pointer">Blog</li>
                <li className="hover:text-white transition-colors cursor-pointer">Contact</li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-sm font-semibold mb-4 tracking-wide uppercase text-gray-300">Contact</h4>
              <div className="space-y-3 text-gray-400 text-sm font-normal">
                <p className="hover:text-white transition-colors">info@godev.com</p>
                <p>+63 949 544 7748</p>
                <p className="text-xs mt-4 text-gray-500">Mon-Fri: 9AM-6PM EST</p>
              </div>
            </div>
          </div>
          
          <div className="h-px bg-gray-800 mb-8"></div>
          
          <div className="flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
            <p className="font-normal">
              © 2025 GoDev. All rights reserved.
            </p>
            <div className="flex gap-8 mt-4 md:mt-0 font-normal">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Live Chat Widget */}
      {!isChatOpen && (
        <div className="fixed bottom-6 right-6 z-50">
          <button
            onClick={() => setIsChatOpen(true)}
            className="bg-black hover:bg-gray-900 text-white rounded-full p-4 shadow-2xl transition-all duration-300 hover:scale-105"
          >
            <MessageSquare className="h-6 w-6" />
          </button>
        </div>
      )}

      {/* Chat Window */}
      {isChatOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-96 h-[500px] bg-white rounded-lg shadow-2xl flex flex-col border border-gray-200">
          {/* Chat Header */}
          <div className="bg-black text-white p-4 rounded-t-lg flex justify-between items-center">
            <div>
              <h3 className="font-semibold text-sm tracking-wide">Live Chat</h3>
              <p className="text-xs text-gray-400 font-normal">We typically reply in minutes</p>
            </div>
            <button
              onClick={() => setIsChatOpen(false)}
              className="hover:bg-gray-900 p-1 rounded transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] px-4 py-2 rounded-lg text-sm ${
                    msg.sender === 'user'
                      ? 'bg-black text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Type your message..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-black text-sm"
              />
              <button
                onClick={handleSendMessage}
                className="bg-black hover:bg-gray-900 text-white p-2 rounded-lg transition-colors"
              >
                <Send className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
 }
