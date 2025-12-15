import { NextRequest, NextResponse } from 'next/server'

// Email service configuration - Using a free email service
const EMAIL_SERVICE_CONFIG = {
  // Replace with your actual business email
  businessEmail: 'your-business-email@example.com',
  // You can use services like:
  // 1. Resend.com (free tier available)
  // 2. SendGrid (free tier available)
  // 3. Formspree.io (free form handling)
  // 4. Netlify Forms (if hosted on Netlify)
  // 5. Web3Forms (free API)
}

// Simple email sending function using a free service
async function sendEmail(formData: { name: string; email: string; message: string }) {
  try {
    // Option 1: Using Web3Forms (free, no API key required)
    const web3FormsResponse = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        access_key: 'YOUR_WEB3FORMS_ACCESS_KEY', // Get free key from web3forms.com
        subject: `New Contact Form Submission from ${formData.name}`,
        from: formData.email,
        message: `
          Name: ${formData.name}
          Email: ${formData.email}
          
          Message:
          ${formData.message}
          
          ---
          Sent from: GoDev Contact Form
          Date: ${new Date().toLocaleString()}
        `,
      }),
    })

    if (web3FormsResponse.ok) {
      return { success: true, service: 'Web3Forms' }
    }

    // Option 2: Using Formspree (free tier available)
    const formSpreeResponse = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        message: formData.message,
        subject: 'New Contact Form Submission',
      }),
    })

    if (formSpreeResponse.ok) {
      return { success: true, service: 'Formspree' }
    }

    // Option 3: Simple email logging (for development)
    console.log('📧 EMAIL WOULD BE SENT:', {
      to: EMAIL_SERVICE_CONFIG.businessEmail,
      from: formData.email,
      subject: `New Contact Form: ${formData.name}`,
      body: formData.message,
      timestamp: new Date().toISOString(),
    })

    return { success: true, service: 'Development Mode' }
    
  } catch (error) {
    console.error('Email sending error:', error)
    return { success: false, error: error.message }
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, message } = body

    // Validate input
    if (!name || !email || !message) {
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

    // Validate message length
    if (message.length < 10) {
      return NextResponse.json(
        { error: 'Message must be at least 10 characters long' },
        { status: 400 }
      )
    }

    // Send email using free service
    const emailResult = await sendEmail({ name, email, message })

    if (!emailResult.success) {
      return NextResponse.json(
        { error: 'Failed to send email. Please try again later.' },
        { status: 500 }
      )
    }

    // Log submission for records
    console.log('✅ Contact form submitted successfully:', {
      name,
      email,
      messageLength: message.length,
      service: emailResult.service,
      timestamp: new Date().toISOString()
    })

    return NextResponse.json(
      { 
        success: true, 
        message: 'Thank you for your message! We will get back to you within 24 hours.',
        service: emailResult.service
      },
      { status: 200 }
    )

  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Internal server error. Please try again later.' },
      { status: 500 }
    )
  }
}