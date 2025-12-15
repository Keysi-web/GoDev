import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    
    // Extract form fields
    const firstName = formData.get('firstName') as string
    const lastName = formData.get('lastName') as string
    const middleName = formData.get('middleName') as string
    const email = formData.get('email') as string
    const phone = formData.get('phone') as string
    const position = formData.get('position') as string
    const location = formData.get('location') as string
    const experience = formData.get('experience') as string
    const coverLetter = formData.get('coverLetter') as string
    const cvFile = formData.get('cvFile') as File
    
    // Validate required fields
    if (!firstName || !lastName || !email || !phone || !position || !location || !experience || !coverLetter) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Validate experience length
    if (experience.trim().length < 10) {
      return NextResponse.json(
        { error: 'Experience must be at least 10 characters long' },
        { status: 400 }
      )
    }

    // Validate cover letter length
    if (coverLetter.trim().length < 50) {
      return NextResponse.json(
        { error: 'Cover letter must be at least 50 characters long' },
        { status: 400 }
      )
    }

    // Log application for now (in production, you would save to database and send email)
    console.log('📋 JOB APPLICATION RECEIVED:', {
      applicant: `${firstName} ${middleName ? middleName + ' ' : ''}${lastName}`,
      contact: { email, phone, location },
      position: position,
      experience: experience.substring(0, 100) + (experience.length > 100 ? '...' : ''),
      coverLetter: coverLetter.substring(0, 150) + (coverLetter.length > 150 ? '...' : ''),
      cvFileName: cvFile?.name || 'No file uploaded',
      cvFileSize: cvFile ? `${(cvFile.size / 1024 / 1024).toFixed(2)} MB` : 'No file',
      timestamp: new Date().toISOString()
    })

    // In production, you would:
    // 1. Save application to database
    // 2. Send email notification to HR
    // 3. Send confirmation email to applicant
    // 4. Store CV file in cloud storage
    // 5. Add to applicant tracking system

    return NextResponse.json(
      { 
        success: true, 
        message: 'Application submitted successfully! We will review your application and get back to you soon.' 
      },
      { status: 200 }
    )

  } catch (error) {
    console.error('Job application error:', error)
    return NextResponse.json(
      { error: 'Internal server error. Please try again later.' },
      { status: 500 }
    )
  }
}