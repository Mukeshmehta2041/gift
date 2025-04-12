"use client"

/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities */

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Heart, Gift, Cake, Camera, Music, ChevronRight, Stars, PartyPopper, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Confetti from "react-confetti"
import { useWindowSize } from "react-use"

export default function BirthdayCard() {
    const [step, setStep] = useState(0)
    const [showConfetti, setShowConfetti] = useState(false)
    const { width, height } = useWindowSize()
    const audioRef = useRef<HTMLAudioElement | null>(null)
    const [isAudioPlaying, setIsAudioPlaying] = useState(false)
    const [activeMemory, setActiveMemory] = useState<number | null>(null)

    const images = [
        "/img-4.jpeg?height=400&width=600",
        "/img-1.jpeg?height=400&width=600",
        // "/img-4.jpeg?height=400&width=600",
        "/img-4.jpeg?height=400&width=600",
    ]

    const memories = [
        { title: "Our Adventure", description: "Remember that amazing trip we took last summer?" },
        { title: "Birthday Last Year", description: "Your surprise party was so much fun!" },
        { title: "Coffee Dates", description: "Our weekly coffee meetups always brighten my day." },
    ]


    useEffect(() => {
        if (step === 1) {
            setShowConfetti(true)
            const timer = setTimeout(() => setShowConfetti(false), 8000)

            // Play birthday music when entering main screen
            if (audioRef.current) {
                audioRef.current.play()
                setIsAudioPlaying(true)
            }

            return () => clearTimeout(timer)
        }
    }, [step])

    const toggleAudio = () => {
        if (audioRef.current) {
            if (isAudioPlaying) {
                audioRef.current.pause()
            } else {
                audioRef.current.play()
            }
            setIsAudioPlaying(!isAudioPlaying)
        }
    }

    const floatingHearts = Array(15)
        .fill(0)
        .map((_, i) => (
            <motion.div
                key={i}
                className="absolute"
                initial={{
                    x: Math.random() * width,
                    y: height + 20,
                    opacity: 0.7,
                    scale: Math.random() * 0.5 + 0.5,
                }}
                animate={{
                    y: -100,
                    opacity: 0,
                    transition: {
                        duration: Math.random() * 10 + 15,
                        repeat: Number.POSITIVE_INFINITY,
                        delay: Math.random() * 20,
                    },
                }}
            >
                <Heart className="text-pink-400" fill="#ec4899" size={Math.random() * 20 + 10} />
            </motion.div>
        ))

    const steps = [
        // Intro screen
        <motion.div
            key="intro"
            className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-pink-200 p-4 text-center overflow-hidden relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
        >
            {floatingHearts}

            <motion.div
                className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none"
                style={{
                    backgroundImage: "url('/placeholder.svg?height=800&width=800')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    mixBlendMode: "overlay",
                }}
            />

            <motion.div
                initial={{ scale: 0 }}
                animate={{
                    scale: [0, 1.2, 1],
                    rotate: [0, 15, -15, 10, -10, 5, -5, 0],
                }}
                transition={{ duration: 2, delay: 0.5 }}
                className="relative"
            >
                <div className="absolute -inset-4 rounded-full bg-pink-200 opacity-50 blur-lg animate-pulse" />
                <Cake className="h-28 w-28 text-pink-500 mb-6 relative z-10" />
            </motion.div>

            <motion.div
                className="relative z-10 mb-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
            >
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ delay: 2, duration: 1.5 }}
                    className="h-1 bg-gradient-to-r from-pink-300 via-purple-300 to-pink-300 rounded-full mb-4"
                />

                <motion.h1
                    className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 mb-4"
                    initial={{ y: -50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                >
                    Happy Birthday!
                </motion.h1>

                <motion.h2
                    className="text-3xl md:text-4xl font-semibold text-purple-600 mb-2"
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 1.2 }}
                >
                    Kajal
                </motion.h2>

                <motion.p
                    className="text-lg text-pink-600 italic"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.8, duration: 1 }}
                >
                    May your day be as wonderful as you are!
                </motion.p>

                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ delay: 2, duration: 1.5 }}
                    className="h-1 bg-gradient-to-r from-pink-300 via-purple-300 to-pink-300 rounded-full mt-4"
                />
            </motion.div>

            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 2.5, duration: 0.8 }}
                className="relative z-10"
            >
                <Button
                    size="lg"
                    className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white px-8 py-6 rounded-full text-xl shadow-lg group relative overflow-hidden"
                    onClick={() => setStep(1)}
                >
                    <span className="relative z-10 flex items-center">
                        {/* Open Your Surprise */}
                        Open
                        <motion.span animate={{ x: [0, 5, 0] }} transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}>
                            <ChevronRight className="ml-2 h-6 w-6" />
                        </motion.span>
                    </span>
                    <span className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Button>
            </motion.div>

            <motion.div
                className="absolute bottom-8 left-0 right-0 flex justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 3, duration: 1 }}
            >
                <div className="flex items-center text-pink-600">
                    <Sparkles className="h-5 w-5 mr-2" />
                    <span>Click to begin your birthday adventure</span>
                    <Sparkles className="h-5 w-5 ml-2" />
                </div>
            </motion.div>
        </motion.div>,

        // Main celebration screen
        <div
            key="main"
            className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-purple-100 p-4 md:p-8 relative overflow-hidden"
        >
            {showConfetti && <Confetti width={width} height={height} recycle={false} numberOfPieces={800} />}
            {floatingHearts}

            <audio
                ref={audioRef}
                src="/music.mp3"
                loop
            />

            <motion.button
                className="fixed top-4 right-4 z-50 bg-white/80 backdrop-blur-sm p-2 rounded-full shadow-md"
                onClick={toggleAudio}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
            >
                <Music className={`h-6 w-6 ${isAudioPlaying ? "text-pink-500" : "text-gray-400"}`} />
            </motion.button>

            <motion.div
                className="max-w-5xl mx-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
            >
                <motion.div
                    className="text-center mb-12 relative"
                    initial={{ y: -50 }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <motion.div
                        className="absolute -inset-10 rounded-full bg-pink-200/30 blur-3xl"
                        animate={{
                            scale: [1, 1.1, 1],
                            opacity: [0.3, 0.5, 0.3],
                        }}
                        transition={{
                            duration: 5,
                            repeat: Number.POSITIVE_INFINITY,
                            repeatType: "reverse",
                        }}
                    />

                    <motion.div
                        className="relative"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                    >
                        <PartyPopper className="inline-block h-12 w-12 text-pink-500 mb-2" />
                    </motion.div>

                    <h1 className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 mb-4">
                        Happy Birthday Kajal!
                    </h1>

                    <p className="text-xl text-purple-700 max-w-2xl mx-auto relative z-10">
                        Wishing you a day filled with happiness and a year filled with joy, success, and beautiful moments!
                    </p>
                </motion.div>

                <motion.div
                    className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 1 }}
                >
                    {images.map((img, index) => (
                        <motion.div
                            key={index}
                            className="overflow-hidden rounded-xl shadow-lg relative group cursor-pointer"
                            whileHover={{ scale: 1.03 }}
                            transition={{ duration: 0.3 }}
                            onClick={() => setActiveMemory(index)}
                        >
                            <motion.div className="absolute inset-0 bg-gradient-to-t from-pink-500/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                                {/* <div className="p-4 text-white">
                                    <h3 className="font-bold text-lg">{memories[index].title}</h3>
                                    <p className="text-sm">{memories[index].description}</p>
                                </div> */}
                            </motion.div>
                            <img
                                src={img || "/placeholder.svg"}
                                alt={`Memory with Kajal ${index + 1}`}
                                className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                        </motion.div>
                    ))}
                </motion.div>

                <motion.div
                    className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl mb-12 border border-pink-100"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.8 }}
                >
                    <h2 className="text-2xl font-bold text-pink-600 mb-6 flex items-center">
                        <PartyPopper className="mr-3 text-pink-500" /> Birthday Wishes
                    </h2>
                    <div className="text-lg text-gray-700 leading-relaxed">
                        <p className="mb-4">Hey Kajal,</p>
                        <p className="mb-4">
                            Just wanted to take a moment to celebrate you and all the incredible things about you. Your kindness, your smile,
                            and the way you spread joy to everyone around you — you're such a light in this world!
                        </p>
                        <p className="mb-4">
                            I hope this year brings you endless happiness, success, and beautiful memories. May all your dreams come true,
                            and may you find joy in the little moments that life offers.
                        </p>
                        <p className="mb-4">Enjoy your special day to the fullest! 🎂🎈</p>
                        <p className="mb-4">Kal chup chap party de dena 😜🎉</p>
                    </div>

                </motion.div>

                <motion.div
                    className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2, duration: 0.8 }}
                >
                    <Card className="p-6 bg-gradient-to-br from-pink-50 to-pink-100 border-pink-200 shadow-md overflow-hidden relative group">
                        <motion.div
                            className="absolute -right-8 -top-8 w-16 h-16 rounded-full bg-pink-200 opacity-50"
                            animate={{
                                scale: [1, 1.2, 1],
                            }}
                            transition={{
                                duration: 3,
                                repeat: Number.POSITIVE_INFINITY,
                                repeatType: "reverse",
                            }}
                        />
                        <div className="flex flex-col items-center text-center relative z-10">
                            <motion.div whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }} transition={{ duration: 0.5 }}>
                                <Gift className="h-14 w-14 text-pink-500 mb-4" />
                            </motion.div>
                            <h3 className="text-xl font-semibold text-pink-600 mb-2">Gifts & Surprises</h3>
                            <p className="text-gray-600">Special surprises are coming your way today!</p>
                        </div>
                    </Card>

                    <Card className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200 shadow-md overflow-hidden relative group">
                        <motion.div
                            className="absolute -left-8 -bottom-8 w-16 h-16 rounded-full bg-purple-200 opacity-50"
                            animate={{
                                scale: [1, 1.2, 1],
                            }}
                            transition={{
                                duration: 4,
                                repeat: Number.POSITIVE_INFINITY,
                                repeatType: "reverse",
                            }}
                        />
                        <div className="flex flex-col items-center text-center relative z-10">
                            <motion.div whileHover={{ rotate: [0, 10, -10, 10, 0], scale: 1.1 }} transition={{ duration: 0.5 }}>
                                <Camera className="h-14 w-14 text-purple-500 mb-4" />
                            </motion.div>
                            <h3 className="text-xl font-semibold text-purple-600 mb-2">Memories</h3>
                            <p className="text-gray-600">Celebrating all our wonderful memories</p>
                        </div>
                    </Card>

                    <Card className="p-6 bg-gradient-to-br from-pink-50 to-pink-100 border-pink-200 shadow-md overflow-hidden relative group">
                        <motion.div
                            className="absolute -right-8 -bottom-8 w-16 h-16 rounded-full bg-pink-200 opacity-50"
                            animate={{
                                scale: [1, 1.2, 1],
                            }}
                            transition={{
                                duration: 3.5,
                                repeat: Number.POSITIVE_INFINITY,
                                repeatType: "reverse",
                            }}
                        />
                        <div className="flex flex-col items-center text-center relative z-10">
                            <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 1 }}>
                                <Stars className="h-14 w-14 text-pink-500 mb-4" />
                            </motion.div>
                            <h3 className="text-xl font-semibold text-pink-600 mb-2">Celebration</h3>
                            <p className="text-gray-600">Let's make this birthday your most memorable one yet!</p>
                        </div>
                    </Card>
                </motion.div>

                <motion.div
                    className="mt-12 text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5, duration: 0.8 }}
                >
                    <Button
                        variant="outline"
                        className="border-pink-500 text-pink-600 hover:bg-pink-50 px-6 py-2 text-lg"
                        onClick={() => setStep(0)}
                    >
                        <span className="mr-2">Back to Start</span>
                        <Heart className="h-4 w-4" />
                    </Button>
                </motion.div>
            </motion.div>

            <AnimatePresence>
                {activeMemory !== null && (
                    <motion.div
                        className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setActiveMemory(null)}
                    >
                        <motion.div
                            className="bg-white rounded-xl overflow-hidden max-w-3xl w-full"
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <img
                                src={images[activeMemory] || "/placeholder.svg"}
                                alt={memories[activeMemory].title}
                                className="w-full h-[400px] object-cover"
                            />
                            <div className="p-6">
                                {/* <h3 className="text-2xl font-bold text-pink-600 mb-2">{memories[activeMemory].title}</h3>
                                <p className="text-gray-700">{memories[activeMemory].description}</p>  */}
                                <Button className="mt-4 bg-pink-500 hover:bg-pink-600" onClick={() => setActiveMemory(null)}>
                                    Close
                                </Button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>,
    ]

    return steps[step]
}
