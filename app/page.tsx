"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import StarryBackground from "@/components/starry-background"
import ShootingStar from "@/components/shooting-star"
import FloatingPhoto from "@/components/floating-photo"

export default function StarryNightLove() {
  const [started, setStarted] = useState(false)
  const [audioStarted, setAudioStarted] = useState(false)
  const [clickCount, setClickCount] = useState(0)
  const [showFinalMessage, setShowFinalMessage] = useState(false)
  const [stars, setStars] = useState<{ id: number; x: number; y: number }[]>([])
  const [photos, setPhotos] = useState<{ id: number; x: number; y: number; photoIndex: number; message: string }[]>([])
  const audioRef = useRef<HTMLAudioElement>(null)

  const messages = [
    "You are my brightest star ✨",
    "With you, every night is magical 💖",
    "One month closer to forever 💘",
    "Your smile outshines the stars ✨",
    "Every moment with you is precious 💫",
    "You make my heart twinkle ✨",
    "Our love story is written in the stars 💖",
    "You're my universe 🌌",
    "Forever yours under the stars ✨",
    "My heart belongs to you 💘",
    "You light up my darkest nights 💫",
    "Our love is cosmic ✨",
  ]

  const photoUrls = [
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-04-29%20at%2000.31.03_fd890ff5.jpg-SkxZnoWOeUOCpJmGmykHdF8LpuRI3a.jpeg",
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-04-29%20at%2000.31.05_80411e81.jpg-pL3dIMdSU2THZ9EONFjdvKfvKY1EZa.jpeg",
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-04-29%20at%2000.31.06_7c070a49.jpg-vz80i9oTx7R4XeaZLVJzx51UEUBoCY.jpeg",
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-04-29%20at%2000.31.04_e91b2535.jpg-HROw4yrLGjyVgTI7UhbdscDHbitW7E.jpeg",
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-04-29%20at%2000.31.04_2a644d7b.jpg-jeWe90wRKx0aHOth4kaitUSMuR0VGI.jpeg",
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-04-29%20at%2000.31.05_ffcdd4ff.jpg-DwFDtbZl5PWK8K8Hkl5Q9lnK5gNHD4.jpeg",
  ]

  useEffect(() => {
    if (clickCount >= 10 && !showFinalMessage) {
      setTimeout(() => {
        setShowFinalMessage(true)
      }, 1000)
    }
  }, [clickCount, showFinalMessage])

  const handleStart = () => {
    setStarted(true)
    if (audioRef.current) {
      audioRef.current.play().catch((e) => console.log("Audio play failed:", e))
      setAudioStarted(true)
    }
  }

  const handleClick = (e: React.MouseEvent) => {
    if (!started || showFinalMessage) return

    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    // Add shooting star
    const newStar = { id: Date.now(), x, y }
    setStars((prev) => [...prev, newStar])

    // Add photo with message after a delay
    setTimeout(() => {
      const photoX = x + Math.random() * 100 - 50
      const photoY = y + Math.random() * 100 - 50
      const photoIndex = Math.floor(Math.random() * photoUrls.length)
      const messageIndex = Math.floor(Math.random() * messages.length)

      setPhotos((prev) => [
        ...prev,
        {
          id: Date.now(),
          x: photoX,
          y: photoY,
          photoIndex,
          message: messages[messageIndex],
        },
      ])
      setClickCount((prev) => prev + 1)
    }, 500)
  }

  const resetExperience = () => {
    setClickCount(0)
    setShowFinalMessage(false)
    setPhotos([])
    setStars([])
    if (audioRef.current) {
      audioRef.current.currentTime = 0
    }
  }

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      <audio ref={audioRef} src="/background.mp3" loop className="hidden" />

      <StarryBackground />

      <div className="absolute inset-0 z-10" onClick={started ? handleClick : undefined}>
        <AnimatePresence>
          {!started && (
            <motion.div
              className="absolute inset-0 flex flex-col items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
            >
              <motion.h1
                className="text-3xl md:text-5xl font-bold text-white text-center mb-8"
                animate={{
                  textShadow: [
                    "0 0 8px rgba(255,255,255,0.5)",
                    "0 0 16px rgba(255,255,255,0.8)",
                    "0 0 8px rgba(255,255,255,0.5)",
                  ],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                }}
              >
                Our Love Under the Stars ✨
              </motion.h1>

              <motion.button
                className="px-6 py-3 bg-purple-600 bg-opacity-60 text-white rounded-full text-lg font-medium backdrop-blur-sm"
                whileHover={{ scale: 1.05, backgroundColor: "rgba(147, 51, 234, 0.8)" }}
                whileTap={{ scale: 0.98 }}
                animate={{
                  boxShadow: [
                    "0 0 8px rgba(168,85,247,0.5)",
                    "0 0 16px rgba(168,85,247,0.8)",
                    "0 0 8px rgba(168,85,247,0.5)",
                  ],
                }}
                transition={{
                  boxShadow: {
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "reverse",
                  },
                }}
                onClick={handleStart}
              >
                Click to Begin
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Shooting stars */}
        <AnimatePresence>
          {stars.map((star) => (
            <ShootingStar key={star.id} x={star.x} y={star.y} />
          ))}
        </AnimatePresence>

        {/* Floating photos */}
        <AnimatePresence>
          {photos.map((photo) => (
            <FloatingPhoto
              key={photo.id}
              x={photo.x}
              y={photo.y}
              imageUrl={photoUrls[photo.photoIndex]}
              message={photo.message}
            />
          ))}
        </AnimatePresence>

        {/* Final message */}
        <AnimatePresence>
          {showFinalMessage && (
            <motion.div
              className="absolute inset-0 flex flex-col items-center justify-center z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
            >
              <motion.div
                className="bg-black bg-opacity-40 backdrop-blur-sm p-8 rounded-xl flex flex-col items-center"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                }}
              >
                <motion.h2
                  className="text-3xl md:text-5xl font-bold text-white text-center mb-6"
                  animate={{
                    textShadow: [
                      "0 0 8px rgba(255,255,255,0.5)",
                      "0 0 16px rgba(255,255,255,0.8)",
                      "0 0 8px rgba(255,255,255,0.5)",
                    ],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "reverse",
                  }}
                >
                  I Love You to the Stars and Beyond 🌌💖
                </motion.h2>

                <motion.button
                  className="mt-6 px-6 py-3 bg-pink-600 bg-opacity-70 text-white rounded-full text-lg font-medium backdrop-blur-sm"
                  whileHover={{ scale: 1.05, backgroundColor: "rgba(219, 39, 119, 0.8)" }}
                  whileTap={{ scale: 0.98 }}
                  onClick={resetExperience}
                >
                  Start Again
                </motion.button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
