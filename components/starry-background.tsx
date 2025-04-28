"use client"

import { useRef, useEffect } from "react"
import { motion } from "framer-motion"

interface Star {
  x: number
  y: number
  size: number
  opacity: number
  twinkleSpeed: number
  twinkleDelay: number
}

export default function StarryBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const starsRef = useRef<Star[]>([])
  const animationRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas to full screen
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      generateStars()
    }

    window.addEventListener("resize", resizeCanvas)
    resizeCanvas()

    // Generate stars
    function generateStars() {
      const stars: Star[] = []
      const starCount = Math.floor((window.innerWidth * window.innerHeight) / 1000)

      for (let i = 0; i < starCount; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 3 + 1.5,
          opacity: Math.random() * 0.6 + 0.4,
          twinkleSpeed: Math.random() * 0.015 + 0.008,
          twinkleDelay: Math.random() * 100,
        })
      }

      starsRef.current = stars
    }

    // Animation loop
    let time = 0
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      time++

      // Draw stars
      starsRef.current.forEach((star) => {
        const twinkle = Math.sin((time + star.twinkleDelay) * star.twinkleSpeed) * 0.7 + 0.3

        // Draw glow
        const gradient = ctx.createRadialGradient(star.x, star.y, 0, star.x, star.y, star.size * 2)
        gradient.addColorStop(0, `rgba(255, 255, 255, ${star.opacity * twinkle})`)
        gradient.addColorStop(1, "rgba(255, 255, 255, 0)")

        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.size * 2, 0, Math.PI * 2)
        ctx.fill()

        // Draw star center
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity * twinkle})`
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2)
        ctx.fill()
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(animationRef.current)
    }
  }, [])

  return (
    <motion.canvas
      ref={canvasRef}
      className="absolute inset-0 bg-gradient-to-b from-[#0a0a2a] to-[#1a1a4a]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
    />
  )
}
