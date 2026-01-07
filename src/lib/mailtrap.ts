// Mailtrap Email Utility
// Uses Mailtrap's Email API for sending notifications

const MAILTRAP_API_TOKEN = process.env.MAILTRAP_API_TOKEN
const MAILTRAP_SENDER_EMAIL = process.env.MAILTRAP_SENDER_EMAIL || 'careers@godev.com'
const HR_NOTIFICATION_EMAIL = process.env.HR_NOTIFICATION_EMAIL || 'hr@godev.com'

interface EmailPayload {
    to: string
    subject: string
    text: string
    html?: string
}

interface ApplicationEmailData {
    firstName: string
    lastName: string
    email: string
    phone: string
    position: string
    applicantType: string
    experience: string
    coverLetter: string
    cvFileUrl?: string
    cvFileName?: string
}

/**
 * Send an email using Mailtrap's Email API
 */
export async function sendEmail(payload: EmailPayload): Promise<{ success: boolean; error?: string }> {
    if (!MAILTRAP_API_TOKEN) {
        console.log('📧 Mailtrap not configured. Email would be sent:', payload)
        return { success: true } // Return success in dev mode
    }

    try {
        const response = await fetch('https://send.api.mailtrap.io/api/send', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Api-Token': MAILTRAP_API_TOKEN,
            },
            body: JSON.stringify({
                from: {
                    email: MAILTRAP_SENDER_EMAIL,
                    name: 'GoDev Careers',
                },
                to: [{ email: payload.to }],
                subject: payload.subject,
                text: payload.text,
                html: payload.html,
            }),
        })

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}))
            console.error('Mailtrap API error:', errorData)
            return { success: false, error: 'Failed to send email' }
        }

        return { success: true }
    } catch (error) {
        console.error('Email sending error:', error)
        return { success: false, error: 'Email service unavailable' }
    }
}

/**
 * Send notification email to HR when a new application is received
 */
export async function sendApplicationNotification(data: ApplicationEmailData): Promise<{ success: boolean; error?: string }> {
    const subject = `New Job Application: ${data.position} - ${data.firstName} ${data.lastName}`

    const text = `
New Job Application Received

Position: ${data.position}
Applicant Type: ${data.applicantType}

Applicant Details:
- Name: ${data.firstName} ${data.lastName}
- Email: ${data.email}
- Phone: ${data.phone}

Experience:
${data.experience}

Cover Letter:
${data.coverLetter}

${data.cvFileUrl ? `CV/Resume: ${data.cvFileUrl}` : 'No CV uploaded'}

---
Submitted on: ${new Date().toLocaleString()}
`

    const html = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); color: white; padding: 30px; border-radius: 10px 10px 0 0; }
    .content { background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px; }
    .section { background: white; padding: 20px; border-radius: 8px; margin-bottom: 16px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
    .label { font-weight: 600; color: #666; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px; }
    .value { font-size: 16px; color: #1a1a2e; }
    .position-badge { display: inline-block; background: #4CAF50; color: white; padding: 6px 16px; border-radius: 20px; font-size: 14px; }
    .cv-link { display: inline-block; background: #2196F3; color: white; padding: 10px 20px; border-radius: 6px; text-decoration: none; margin-top: 10px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1 style="margin: 0; font-size: 24px;">New Job Application</h1>
      <p style="margin: 10px 0 0; opacity: 0.9;">GoDev Careers</p>
    </div>
    <div class="content">
      <div class="section">
        <div class="label">Position Applied For</div>
        <div class="value"><span class="position-badge">${data.position}</span></div>
        <div style="margin-top: 10px;"><span style="color: #666;">Type:</span> ${data.applicantType}</div>
      </div>
      
      <div class="section">
        <div class="label">Applicant Information</div>
        <div class="value" style="font-size: 20px; font-weight: 600;">${data.firstName} ${data.lastName}</div>
        <div style="margin-top: 8px;">
          <p style="margin: 4px 0;"><strong>Email:</strong> <a href="mailto:${data.email}">${data.email}</a></p>
          <p style="margin: 4px 0;"><strong>Phone:</strong> ${data.phone}</p>
        </div>
      </div>
      
      <div class="section">
        <div class="label">Experience</div>
        <div class="value" style="white-space: pre-wrap;">${data.experience}</div>
      </div>
      
      <div class="section">
        <div class="label">Cover Letter</div>
        <div class="value" style="white-space: pre-wrap;">${data.coverLetter}</div>
      </div>
      
      ${data.cvFileUrl ? `
      <div class="section">
        <div class="label">Resume/CV</div>
        <a href="${data.cvFileUrl}" class="cv-link">📄 Download ${data.cvFileName || 'Resume'}</a>
      </div>
      ` : ''}
      
      <p style="text-align: center; color: #999; font-size: 12px; margin-top: 20px;">
        Submitted on ${new Date().toLocaleString()}
      </p>
    </div>
  </div>
</body>
</html>
`

    return sendEmail({
        to: HR_NOTIFICATION_EMAIL,
        subject,
        text,
        html,
    })
}
