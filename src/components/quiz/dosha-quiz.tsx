"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { DOSHA_QUESTIONS, QuizQuestion, Dosha } from "@/lib/quiz-data"
import Link from "next/link"

const QUESTIONS_PER_QUIZ = 5

export function DoshaQuiz() {
  const [questions, setQuestions] = useState<QuizQuestion[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState<Dosha[]>([])
  const [isFinished, setIsFinished] = useState(false)
  const [result, setResult] = useState<{ dosha: Dosha, details: string } | null>(null)

  // Initialize quiz with 5 random unique questions
  const startQuiz = () => {
    const shuffled = [...DOSHA_QUESTIONS].sort(() => 0.5 - Math.random())
    const selected = shuffled.slice(0, QUESTIONS_PER_QUIZ)
    
    // Shuffle the options within each question so Vata isn't always first
    const randomizedQuestions = selected.map(q => ({
      ...q,
      options: [...q.options].sort(() => 0.5 - Math.random())
    }))

    setQuestions(randomizedQuestions)
    setCurrentIndex(0)
    setAnswers([])
    setIsFinished(false)
    setResult(null)
  }

  // Start on mount
  useEffect(() => {
    startQuiz()
  }, [])

  const handleAnswer = (dosha: Dosha) => {
    const newAnswers = [...answers, dosha]
    setAnswers(newAnswers)

    if (currentIndex < QUESTIONS_PER_QUIZ - 1) {
      setCurrentIndex(currentIndex + 1)
    } else {
      calculateResult(newAnswers)
    }
  }

  const calculateResult = (finalAnswers: Dosha[]) => {
    const scores = {
      Vata: 0,
      Pitta: 0,
      Kapha: 0
    }
    
    finalAnswers.forEach(ans => scores[ans]++)
    
    let maxDosha: Dosha = 'Vata'
    let maxScore = -1
    
    Object.entries(scores).forEach(([dosha, score]) => {
      if (score > maxScore) {
        maxScore = score
        maxDosha = dosha as Dosha
      }
    })

    const details = getDoshaDetails(maxDosha)
    setResult({ dosha: maxDosha, details })
    setIsFinished(true)
  }

  const getDoshaDetails = (dosha: Dosha) => {
    switch (dosha) {
      case 'Vata':
        return "You are primarily Vata (Air & Space). Focus on grounding routines, warm and nourishing foods, and deeply hydrating botanicals."
      case 'Pitta':
        return "You are primarily Pitta (Fire & Water). Focus on cooling herbs, moderation in intense activities, and calming rituals to soothe heat."
      case 'Kapha':
        return "You are primarily Kapha (Earth & Water). Focus on stimulating movement, light and warming spices, and invigorating botanical formulations."
    }
  }

  if (questions.length === 0) return null

  if (isFinished && result) {
    return (
      <Card className="max-w-2xl mx-auto bg-[var(--forest-950)] border-transparent text-center py-12">
        <CardContent className="space-y-6">
          <p className="text-xs font-bold uppercase tracking-widest text-[var(--terracotta-400)]">Your Primary Dosha is</p>
          <h2 className="font-serif text-5xl md:text-6xl text-[var(--gold-400)]">{result.dosha}</h2>
          <p className="text-lg opacity-80 leading-relaxed px-6 py-4">
            {result.details}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8 border-t border-[var(--border-subtle)]">
            <Link href={`/shop?rituals=${result.dosha}`}>
              <Button size="lg" className="bg-[var(--terracotta-400)] text-[var(--forest-950)] hover:bg-[var(--terracotta-500)] w-full sm:w-auto">
                Shop {result.dosha} Rituals
              </Button>
            </Link>
            <Button size="lg" variant="outline" onClick={startQuiz} className="border-[var(--border-subtle)] text-[var(--ink-50)] hover:bg-[var(--forest-900)] w-full sm:w-auto">
              Retake Quiz
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  const currentQuestion = questions[currentIndex]
  const progress = ((currentIndex) / QUESTIONS_PER_QUIZ) * 100

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="space-y-2">
        <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-[var(--sage-tint)]">
          <span>Question {currentIndex + 1} of {QUESTIONS_PER_QUIZ}</span>
        </div>
        <div className="h-1 w-full bg-[var(--forest-950)] rounded-full overflow-hidden">
          <div 
            className="h-full bg-[var(--terracotta-400)] transition-all duration-500 ease-out" 
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <Card className="bg-[var(--forest-950)] border-transparent p-6 sm:p-10">
        <h3 className="font-serif text-2xl sm:text-3xl text-[var(--gold-400)] mb-8 text-center leading-relaxed">
          {currentQuestion.question}
        </h3>
        
        <div className="space-y-4">
          {currentQuestion.options.map((option, idx) => (
            <button
              key={idx}
              onClick={() => handleAnswer(option.dosha)}
              className="w-full text-left p-4 rounded-xl border border-[var(--border-subtle)] hover:border-[var(--terracotta-400)] hover:bg-[var(--forest-900)] transition-all flex items-center group"
            >
              <div className="w-8 h-8 shrink-0 rounded-full border border-[var(--border-subtle)] flex items-center justify-center mr-4 group-hover:border-[var(--terracotta-400)] text-sm opacity-50 group-hover:opacity-100 transition-colors">
                {String.fromCharCode(65 + idx)}
              </div>
              <span className="opacity-90 leading-relaxed text-sm sm:text-base">
                {option.text}
              </span>
            </button>
          ))}
        </div>
      </Card>
    </div>
  )
}
