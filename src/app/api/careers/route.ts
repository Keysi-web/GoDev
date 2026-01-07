import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin, CareerApplication } from '@/lib/supabase'
import { sendApplicationNotification } from '@/lib/mailtrap'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()

    // Extract form fields
    const firstName = formData.get('firstName') as string
    const lastName = formData.get('lastName') as string
    const email = formData.get('email') as string
    const phone = formData.get('phone') as string
    const position = formData.get('position') as string
    const applicantType = formData.get('applicantType') as string || 'employee'
    const experience = formData.get('experience') as string
    const coverLetter = formData.get('coverLetter') as string
    const cvFile = formData.get('cvFile') as File | null

    // Validate required fields
    if (!firstName || !lastName || !email || !phone || !position || !experience || !coverLetter) {
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

    let cvFileUrl: string | undefined
    let cvFileName: string | undefined

    // Upload CV file to Supabase Storage if provided
    if (cvFile && cvFile.size > 0) {
      const fileExt = cvFile.name.split('.').pop()
      const fileName = `${Date.now()}_${firstName}_${lastName}.${fileExt}`

      const { data: uploadData, error: uploadError } = await supabaseAdmin.storage
        .from('career-cvs')
        .upload(fileName, cvFile, {
          contentType: cvFile.type,
          upsert: false
        })

      if (uploadError) {
        console.error('CV upload error:', uploadError)
        // Continue without CV - don't fail the entire submission
      } else {
        // Get public URL for the uploaded file
        const { data: { publicUrl } } = supabaseAdmin.storage
          .from('career-cvs')
          .getPublicUrl(fileName)

        cvFileUrl = publicUrl
        cvFileName = cvFile.name
      }
    }

    // Prepare application data
    const applicationData: CareerApplication = {
      first_name: firstName,
      last_name: lastName,
      email,
      phone,
      position,
      applicant_type: applicantType,
      experience,
      cover_letter: coverLetter,
      cv_file_url: cvFileUrl,
      cv_file_name: cvFileName,
      status: 'pending'
    }

    // Insert application into Supabase database
    const { data: insertedData, error: insertError } = await supabaseAdmin
      .from('career_applications')
      .insert([applicationData])
      .select()

    if (insertError) {
      console.error('Database insert error:', insertError)
      return NextResponse.json(
        { error: 'Failed to save application. Please try again later.' },
        { status: 500 }
      )
    }

    // Send email notification to HR
    const emailResult = await sendApplicationNotification({
      firstName,
      lastName,
      email,
      phone,
      position,
      applicantType,
      experience,
      coverLetter,
      cvFileUrl,
      cvFileName
    })

    if (!emailResult.success) {
      console.warn('Email notification failed:', emailResult.error)
      // Don't fail the submission if email fails - application is still saved
    }

    // Log successful submission
    console.log('✅ Application submitted:', {
      id: insertedData?.[0]?.id,
      applicant: `${firstName} ${lastName}`,
      position,
      emailSent: emailResult.success,
      timestamp: new Date().toISOString()
    })

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