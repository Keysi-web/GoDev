# Contact Form Setup Guide

## Current Status
The contact form is currently in **development mode** and will log submissions to the console. To receive actual emails, you need to configure one of the free email services below.

## Free Email Service Options

### Option 1: Web3Forms (Recommended - Free)
1. Go to [web3forms.com](https://web3forms.com/)
2. Sign up for a free account
3. Get your Access Key
4. Replace `YOUR_WEB3FORMS_ACCESS_KEY` in `/src/app/api/contact/route.ts`
5. Update `your-business-email@example.com` to your actual email

**Benefits:**
- Free tier available
- No SMTP setup required
- Works immediately
- Spam protection included

### Option 2: Formspree (Free Tier)
1. Go to [formspree.io](https://formspree.io/)
2. Create a new form
3. Get your Form ID
4. Replace `YOUR_FORM_ID` in the code
5. Update your business email

**Benefits:**
- 50 submissions/month free
- Email notifications
- Dashboard to track submissions
- Easy setup

### Option 3: Resend (Free Tier)
1. Go to [resend.com](https://resend.com/)
2. Sign up for free account
3. Get your API key
4. Replace the email sending function with Resend API

**Benefits:**
- 3,000 emails/month free
- Professional email delivery
- Templates support
- Analytics

### Option 4: Netlify Forms (If hosted on Netlify)
If you deploy to Netlify, forms work automatically:
1. Deploy to Netlify
2. Forms are automatically handled
3. Receive emails at your netlify email

## Quick Setup Steps

1. **Choose a service** from the options above
2. **Get your API key/ID** from the service
3. **Update the code** in `/src/app/api/contact/route.ts`
4. **Test the form** on your website
5. **Check your email** for submissions

## Development Mode
Currently, the form will:
- ✅ Validate input fields
- ✅ Log submissions to console
- ✅ Show success message to users
- ❌ Send actual emails (needs configuration)

## Security Features
- Input validation
- Email format checking
- Message length requirements
- Error handling
- Rate limiting (recommended for production)

## Next Steps
1. Choose your preferred email service
2. Update the configuration
3. Test the contact form
4. Deploy your website
5. Monitor for submissions