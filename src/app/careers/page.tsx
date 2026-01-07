'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { CheckCircle, ArrowLeft } from 'lucide-react'
import {
  AnimatedDiv,
  StaggerContainer,
  StaggerItem,
  PageTransition,
  HoverCard
} from '@/components/ui/animations'

const jobPositions = [
  {
    title: 'Software Developer',
    description: 'Build scalable applications with modern technologies',
    type: 'Full-time/Interns'
  },
  {
    title: 'Front-end Developer',
    description: 'Create beautiful and responsive user interfaces',
    type: 'Full-time/Interns'
  },
  {
    title: 'Back-end Developer',
    description: 'Design and implement robust server-side solutions',
    type: 'Full-time/Interns'
  },
  {
    title: 'UI/UX Designer',
    description: 'Shape exceptional user experiences through design',
    type: 'Full-time/Interns'
  },
  {
    title: 'QA Engineer',
    description: 'Ensure quality and reliability across our products',
    type: 'Full-time/Interns'
  },
  {
    title: 'AI Engineer',
    description: 'Develop cutting-edge AI and machine learning solutions',
    type: 'Full-time/Interns'
  },
  {
    title: 'Research Developer',
    description: 'Explore innovative technologies and methodologies',
    type: 'Full-time/Interns'
  }
]

export default function CareersPage() {
  const [selectedPosition, setSelectedPosition] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    applicantType: '',
    experience: '',
    coverLetter: '',
    cvFile: null as File | null
  })

  const [formErrors, setFormErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const validateForm = () => {
    const errors: Record<string, string> = {}

    if (!formData.firstName.trim()) errors.firstName = 'First name is required'
    if (!formData.lastName.trim()) errors.lastName = 'Last name is required'
    if (!formData.email.trim()) errors.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) errors.email = 'Invalid email'
    if (!formData.phone.trim()) errors.phone = 'Phone number is required'
    if (!formData.applicantType) errors.applicantType = 'Please select applicant type'
    if (!formData.experience.trim()) errors.experience = 'Experience is required'
    if (!formData.coverLetter.trim()) errors.coverLetter = 'Cover letter is required'
    else if (formData.coverLetter.trim().length < 50) errors.coverLetter = 'Cover letter too short (min 50 characters)'
    if (!formData.cvFile) errors.cvFile = 'CV is required'

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (formErrors[field]) {
      setFormErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null
    if (!file) return

    if (file.size > 25 * 1024 * 1024) {
      setFormErrors(prev => ({ ...prev, cvFile: 'File must be less than 5MB' }))
      return
    }

    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
    if (!allowedTypes.includes(file.type)) {
      setFormErrors(prev => ({ ...prev, cvFile: 'Only PDF or Word documents' }))
      return
    }

    setFormData(prev => ({ ...prev, cvFile: file }))
    setFormErrors(prev => ({ ...prev, cvFile: '' }))
  }

  const handleSubmit = async () => {
    if (!validateForm()) return

    setIsSubmitting(true)

    try {
      const payload = new FormData()
      payload.append('firstName', formData.firstName)
      payload.append('lastName', formData.lastName)
      payload.append('email', formData.email)
      payload.append('phone', formData.phone)
      payload.append('position', selectedPosition || '')
      payload.append('experience', formData.experience)
      payload.append('coverLetter', formData.coverLetter)
      if (formData.cvFile) payload.append('cvFile', formData.cvFile)

      const res = await fetch('/api/careers', { method: 'POST', body: payload })
      const json = await res.json().catch(() => ({}))

      if (res.ok) {
        setShowSuccess(true)
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          applicantType: '',
          experience: '',
          coverLetter: '',
          cvFile: null
        })
        setFormErrors({})
        setTimeout(() => {
          setShowSuccess(false)
          setSelectedPosition(null)
        }, 3000)
      } else {
        setFormErrors(prev => ({ ...prev, cvFile: 'Submission failed' }))
      }
    } catch (err) {
      setFormErrors(prev => ({ ...prev, cvFile: 'Network error' }))
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <div className="container mx-auto px-4 py-8">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => selectedPosition ? setSelectedPosition(null) : window.history.back()}
          className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 mb-8"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          {selectedPosition ? 'Back to Positions' : 'Back'}
        </Button>
        {!selectedPosition ? (
          /* Job Listings View */
          <div className="max-w-3xl mx-auto">
            <div className="mb-16 text-center">
              <h1 className="text-5xl font-light mb-4 text-gray-900 dark:text-white">Careers</h1>
              <p className="text-lg text-gray-600 dark:text-gray-400">Join our team and build the future</p>
            </div>

            <div className="space-y-3">
              {jobPositions.map((position) => (
                <div
                  key={position.title}
                  className="group border border-gray-200 dark:border-gray-800 rounded-lg p-6 hover:border-gray-900 dark:hover:border-gray-100 transition-all duration-200"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
                        {position.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                        {position.description}
                      </p>
                      <span className="text-xs text-gray-500 dark:text-gray-500">
                        {position.type}
                      </span>
                    </div>
                    <Button
                      onClick={() => setSelectedPosition(position.title)}
                      variant="outline"
                      className="border-gray-900 dark:border-gray-100 text-gray-900 dark:text-white hover:bg-gray-900 hover:text-white dark:hover:bg-gray-100 dark:hover:text-gray-900 transition-colors whitespace-nowrap"
                    >
                      Apply Now
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* Application Form View */
          <div className="max-w-2xl mx-auto">
            <div className="mb-12">
              <h2 className="text-3xl font-light mb-2 text-gray-900 dark:text-white">
                {selectedPosition}
              </h2>
              <p className="text-gray-600 dark:text-gray-400">Complete the form below to apply</p>
            </div>

            {showSuccess && (
              <div className="mb-8 p-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg">
                <div className="flex items-center gap-3 text-gray-900 dark:text-white">
                  <CheckCircle className="h-5 w-5" />
                  <span>Application submitted successfully</span>
                </div>
              </div>
            )}

            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="firstName" className="text-sm text-gray-700 dark:text-gray-300 mb-2 block">
                    First Name *
                  </Label>
                  <Input
                    id="firstName"
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    className={`border-gray-300 dark:border-gray-700 ${formErrors.firstName ? 'border-red-500' : ''}`}
                    placeholder="John"
                  />
                  {formErrors.firstName && (
                    <p className="mt-1 text-xs text-red-500">{formErrors.firstName}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="lastName" className="text-sm text-gray-700 dark:text-gray-300 mb-2 block">
                    Last Name *
                  </Label>
                  <Input
                    id="lastName"
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    className={`border-gray-300 dark:border-gray-700 ${formErrors.lastName ? 'border-red-500' : ''}`}
                    placeholder="Doe"
                  />
                  {formErrors.lastName && (
                    <p className="mt-1 text-xs text-red-500">{formErrors.lastName}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="email" className="text-sm text-gray-700 dark:text-gray-300 mb-2 block">
                    Email *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className={`border-gray-300 dark:border-gray-700 ${formErrors.email ? 'border-red-500' : ''}`}
                    placeholder="john@example.com"
                  />
                  {formErrors.email && (
                    <p className="mt-1 text-xs text-red-500">{formErrors.email}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="phone" className="text-sm text-gray-700 dark:text-gray-300 mb-2 block">
                    Phone *
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className={`border-gray-300 dark:border-gray-700 ${formErrors.phone ? 'border-red-500' : ''}`}
                    placeholder="+1 (555) 123-4567"
                  />
                  {formErrors.phone && (
                    <p className="mt-1 text-xs text-red-500">{formErrors.phone}</p>
                  )}
                </div>
              </div>

              <div>
                <Label htmlFor="applicantType" className="text-sm text-gray-700 dark:text-gray-300 mb-2 block">
                  Applicant Type *
                </Label>
                <Select value={formData.applicantType} onValueChange={(value) => handleInputChange('applicantType', value)}>
                  <SelectTrigger className={`border-gray-300 dark:border-gray-700 ${formErrors.applicantType ? 'border-red-500' : ''}`}>
                    <SelectValue placeholder="Select applicant type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hippies">Hippies</SelectItem>
                    <SelectItem value="employee">Employee</SelectItem>
                  </SelectContent>
                </Select>
                {formErrors.applicantType && (
                  <p className="mt-1 text-xs text-red-500">{formErrors.applicantType}</p>
                )}
              </div>

              <div>
                <Label htmlFor="experience" className="text-sm text-gray-700 dark:text-gray-300 mb-2 block">
                  Experience *
                </Label>
                <Textarea
                  id="experience"
                  value={formData.experience}
                  onChange={(e) => handleInputChange('experience', e.target.value)}
                  className={`border-gray-300 dark:border-gray-700 min-h-[120px] ${formErrors.experience ? 'border-red-500' : ''}`}
                  placeholder="Tell us about your relevant experience and skills..."
                />
                {formErrors.experience && (
                  <p className="mt-1 text-xs text-red-500">{formErrors.experience}</p>
                )}
              </div>

              <div>
                <Label htmlFor="coverLetter" className="text-sm text-gray-700 dark:text-gray-300 mb-2 block">
                  Cover Letter *
                </Label>
                <Textarea
                  id="coverLetter"
                  value={formData.coverLetter}
                  onChange={(e) => handleInputChange('coverLetter', e.target.value)}
                  className={`border-gray-300 dark:border-gray-700 min-h-[150px] ${formErrors.coverLetter ? 'border-red-500' : ''}`}
                  placeholder="Why do you want to join us? What makes you a good fit?"
                />
                {formErrors.coverLetter && (
                  <p className="mt-1 text-xs text-red-500">{formErrors.coverLetter}</p>
                )}
              </div>

              <div>
                <Label htmlFor="cvFile" className="text-sm text-gray-700 dark:text-gray-300 mb-2 block">
                  Upload CV *
                </Label>
                <div className="relative">
                  <Input
                    id="cvFile"
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                    className={`border-gray-300 dark:border-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:bg-gray-100 file:text-gray-900 dark:file:bg-gray-800 dark:file:text-gray-100 ${formErrors.cvFile ? 'border-red-500' : ''}`}
                  />
                  {formData.cvFile && (
                    <p className="mt-2 text-xs text-gray-600 dark:text-gray-400">
                      {formData.cvFile.name}
                    </p>
                  )}
                  {formErrors.cvFile && (
                    <p className="mt-1 text-xs text-red-500">{formErrors.cvFile}</p>
                  )}
                </div>
              </div>

              <div className="pt-4">
                <Button
                  onClick={handleSubmit}
                  size="lg"
                  className="w-full bg-gray-900 hover:bg-gray-800 dark:bg-gray-100 dark:hover:bg-gray-200 text-white dark:text-gray-900"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Application'}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}