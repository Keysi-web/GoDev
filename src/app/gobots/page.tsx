'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 text-center">
      <h1 className="text-8xl font-bold tracking-tight text-primary">404</h1>

      <p className="mt-4 text-2xl font-semibold">
        Page Not Found
      </p>

      <p className="mt-2 max-w-md text-muted-foreground">
        Sorry, the page you’re looking for doesn’t exist or may have been moved.
      </p>

      <div className="mt-8 flex gap-4">
        <Button asChild>
          <Link href="/">Go Home</Link>
        </Button>

        <Button variant="outline" asChild>
          <Link href="/contact">Contact Support</Link>
        </Button>
      </div>
    </div>
  )
}
