'use client'

import { motion, HTMLMotionProps, Variants, useInView } from 'framer-motion'
import { ReactNode, useRef } from 'react'

// Base animation variants for reuse
export const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    }
}

export const fadeInDown: Variants = {
    hidden: { opacity: 0, y: -40 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    }
}

export const fadeInLeft: Variants = {
    hidden: { opacity: 0, x: -40 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    }
}

export const fadeInRight: Variants = {
    hidden: { opacity: 0, x: 40 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    }
}

export const scaleIn: Variants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
    }
}

export const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.1
        }
    }
}

export const staggerContainerFast: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.05,
            delayChildren: 0.05
        }
    }
}

// Animated wrapper component with scroll trigger
interface AnimatedSectionProps extends HTMLMotionProps<'section'> {
    children: ReactNode
    className?: string
    delay?: number
    once?: boolean
}

export function AnimatedSection({
    children,
    className = '',
    delay = 0,
    once = true,
    ...props
}: AnimatedSectionProps) {
    const ref = useRef(null)
    const isInView = useInView(ref, { once, margin: '-100px' })

    return (
        <motion.section
            ref={ref}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={{
                hidden: { opacity: 0, y: 60 },
                visible: {
                    opacity: 1,
                    y: 0,
                    transition: {
                        duration: 0.8,
                        delay,
                        ease: [0.22, 1, 0.36, 1]
                    }
                }
            }}
            className={className}
            {...props}
        >
            {children}
        </motion.section>
    )
}

// Animated div wrapper
interface AnimatedDivProps extends HTMLMotionProps<'div'> {
    children: ReactNode
    className?: string
    delay?: number
    variant?: 'fadeUp' | 'fadeDown' | 'fadeLeft' | 'fadeRight' | 'scale' | 'blur'
    once?: boolean
}

export function AnimatedDiv({
    children,
    className = '',
    delay = 0,
    variant = 'fadeUp',
    once = true,
    ...props
}: AnimatedDivProps) {
    const ref = useRef(null)
    const isInView = useInView(ref, { once, margin: '-50px' })

    const variants = {
        fadeUp: {
            hidden: { opacity: 0, y: 40 },
            visible: { opacity: 1, y: 0 }
        },
        fadeDown: {
            hidden: { opacity: 0, y: -40 },
            visible: { opacity: 1, y: 0 }
        },
        fadeLeft: {
            hidden: { opacity: 0, x: -40 },
            visible: { opacity: 1, x: 0 }
        },
        fadeRight: {
            hidden: { opacity: 0, x: 40 },
            visible: { opacity: 1, x: 0 }
        },
        scale: {
            hidden: { opacity: 0, scale: 0.9 },
            visible: { opacity: 1, scale: 1 }
        },
        blur: {
            hidden: { opacity: 0, filter: 'blur(10px)' },
            visible: { opacity: 1, filter: 'blur(0px)' }
        }
    }

    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={{
                hidden: variants[variant].hidden,
                visible: {
                    ...variants[variant].visible,
                    transition: {
                        duration: 0.6,
                        delay,
                        ease: [0.22, 1, 0.36, 1]
                    }
                }
            }}
            className={className}
            {...props}
        >
            {children}
        </motion.div>
    )
}

// Staggered children container
interface StaggerContainerProps extends HTMLMotionProps<'div'> {
    children: ReactNode
    className?: string
    staggerDelay?: number
    once?: boolean
}

export function StaggerContainer({
    children,
    className = '',
    staggerDelay = 0.1,
    once = true,
    ...props
}: StaggerContainerProps) {
    const ref = useRef(null)
    const isInView = useInView(ref, { once, margin: '-50px' })

    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={{
                hidden: { opacity: 0 },
                visible: {
                    opacity: 1,
                    transition: {
                        staggerChildren: staggerDelay,
                        delayChildren: 0.1
                    }
                }
            }}
            className={className}
            {...props}
        >
            {children}
        </motion.div>
    )
}

// Individual stagger item
interface StaggerItemProps extends HTMLMotionProps<'div'> {
    children: ReactNode
    className?: string
    direction?: 'up' | 'down' | 'left' | 'right'
}

export function StaggerItem({
    children,
    className = '',
    direction = 'up',
    ...props
}: StaggerItemProps) {
    const directions = {
        up: { y: 30, x: 0 },
        down: { y: -30, x: 0 },
        left: { x: 30, y: 0 },
        right: { x: -30, y: 0 }
    }

    return (
        <motion.div
            variants={{
                hidden: { opacity: 0, ...directions[direction] },
                visible: {
                    opacity: 1,
                    x: 0,
                    y: 0,
                    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
                }
            }}
            className={className}
            {...props}
        >
            {children}
        </motion.div>
    )
}

// Animated heading with character animation
interface AnimatedHeadingProps {
    children: string
    className?: string
    as?: 'h1' | 'h2' | 'h3' | 'h4'
    delay?: number
}

export function AnimatedHeading({
    children,
    className = '',
    as: Tag = 'h1',
    delay = 0
}: AnimatedHeadingProps) {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: '-50px' })

    const MotionTag = motion[Tag] as typeof motion.h1

    return (
        <MotionTag
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
            className={className}
        >
            {children}
        </MotionTag>
    )
}

// Page transition wrapper
interface PageTransitionProps {
    children: ReactNode
    className?: string
}

export function PageTransition({ children, className = '' }: PageTransitionProps) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className={className}
        >
            {children}
        </motion.div>
    )
}

// Floating animation for decorative elements
interface FloatingElementProps extends HTMLMotionProps<'div'> {
    children?: ReactNode
    className?: string
    duration?: number
    yOffset?: number
}

export function FloatingElement({
    children,
    className = '',
    duration = 6,
    yOffset = 20,
    ...props
}: FloatingElementProps) {
    return (
        <motion.div
            animate={{
                y: [-yOffset / 2, yOffset / 2, -yOffset / 2],
            }}
            transition={{
                duration,
                repeat: Infinity,
                ease: 'easeInOut'
            }}
            className={className}
            {...props}
        >
            {children}
        </motion.div>
    )
}

// Parallax scroll effect
interface ParallaxProps extends HTMLMotionProps<'div'> {
    children: ReactNode
    className?: string
    speed?: number
}

export function Parallax({
    children,
    className = '',
    speed = 0.5,
    ...props
}: ParallaxProps) {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: false, margin: '200px' })

    return (
        <motion.div
            ref={ref}
            style={{ willChange: 'transform' }}
            animate={isInView ? { y: 0 } : { y: speed * 50 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className={className}
            {...props}
        >
            {children}
        </motion.div>
    )
}

// Hover card animation
interface HoverCardProps extends HTMLMotionProps<'div'> {
    children: ReactNode
    className?: string
}

export function HoverCard({ children, className = '', ...props }: HoverCardProps) {
    return (
        <motion.div
            whileHover={{
                y: -8,
                scale: 1.02,
                transition: { duration: 0.3, ease: 'easeOut' }
            }}
            whileTap={{ scale: 0.98 }}
            className={className}
            {...props}
        >
            {children}
        </motion.div>
    )
}

// Text reveal animation line by line
interface TextRevealProps {
    children: ReactNode
    className?: string
    delay?: number
}

export function TextReveal({ children, className = '', delay = 0 }: TextRevealProps) {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: '-50px' })

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
            className={className}
        >
            {children}
        </motion.div>
    )
}

// Gradient text animation
interface GradientTextProps {
    children: ReactNode
    className?: string
}

export function GradientText({ children, className = '' }: GradientTextProps) {
    return (
        <motion.span
            animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
            }}
            transition={{
                duration: 5,
                repeat: Infinity,
                ease: 'linear'
            }}
            className={className}
            style={{
                backgroundSize: '200% 200%'
            }}
        >
            {children}
        </motion.span>
    )
}
