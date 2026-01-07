'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ChevronRight, Loader2 } from 'lucide-react'

interface LoadingButtonProps {
    href: string
    children: React.ReactNode
    variant?: 'default' | 'outline'
    className?: string
    isDark?: boolean
}

export function LoadingButton({ href, children, variant = 'default', className = '', isDark = true }: LoadingButtonProps) {
    const [isLoading, setIsLoading] = useState(false)

    const handleClick = () => {
        setIsLoading(true)
    }

    const baseStyles = variant === 'default'
        ? isDark
            ? 'bg-white text-black hover:bg-gray-100'
            : 'bg-black text-white hover:bg-gray-800'
        : isDark
            ? 'border-white/20 text-white hover:bg-white/10'
            : 'border-black/20 text-black hover:bg-black/5'

    return (
        <Link href={href} onClick={handleClick}>
            <Button
                variant={variant === 'outline' ? 'outline' : 'default'}
                className={`rounded-full px-8 py-6 text-base font-medium flex items-center gap-2 transition-all duration-300 ${baseStyles} ${className}`}
                disabled={isLoading}
            >
                {isLoading ? (
                    <>
                        <Loader2 className="h-5 w-5 animate-spin" />
                        Loading...
                    </>
                ) : (
                    <>
                        {children}
                        <ChevronRight className="h-5 w-5" />
                    </>
                )}
            </Button>
        </Link>
    )
}

interface LoadingLinkProps {
    href: string
    children: React.ReactNode
    className?: string
}

export function LoadingLink({ href, children, className = '' }: LoadingLinkProps) {
    const [isLoading, setIsLoading] = useState(false)

    const handleClick = () => {
        setIsLoading(true)
    }

    return (
        <Link
            href={href}
            onClick={handleClick}
            className={`inline-flex items-center text-sm font-medium hover:gap-3 transition-all duration-300 ${className}`}
        >
            {isLoading ? (
                <>
                    <Loader2 className="h-4 w-4 animate-spin mr-1" />
                    Loading...
                </>
            ) : (
                <>
                    {children}
                    <ChevronRight className="h-4 w-4 ml-1" />
                </>
            )}
        </Link>
    )
}
