export type Dosha = 'Vata' | 'Pitta' | 'Kapha'

export interface QuizQuestion {
  id: string
  question: string
  options: {
    text: string
    dosha: Dosha
  }[]
}

export const DOSHA_QUESTIONS: QuizQuestion[] = [
  {
    id: "q1",
    question: "How would you describe your natural physical build?",
    options: [
      { text: "Slender, thin, and I find it hard to gain weight.", dosha: "Vata" },
      { text: "Medium, athletic, and I build muscle easily.", dosha: "Pitta" },
      { text: "Broad, solid, and I tend to gain weight easily.", dosha: "Kapha" }
    ]
  },
  {
    id: "q2",
    question: "What is your typical skin type?",
    options: [
      { text: "Dry, rough, and occasionally flaky.", dosha: "Vata" },
      { text: "Sensitive, warm, and prone to redness or breakouts.", dosha: "Pitta" },
      { text: "Thick, smooth, well-hydrated, or oily.", dosha: "Kapha" }
    ]
  },
  {
    id: "q3",
    question: "How is your digestion on an average day?",
    options: [
      { text: "Irregular; sometimes I'm very hungry, other times not at all. Prone to bloating.", dosha: "Vata" },
      { text: "Strong and intense; I get irritable if I miss a meal. Prone to acidity.", dosha: "Pitta" },
      { text: "Slow and steady; I can easily skip a meal without noticing.", dosha: "Kapha" }
    ]
  },
  {
    id: "q4",
    question: "How do you typically react to stress?",
    options: [
      { text: "I get anxious, worried, and my mind races.", dosha: "Vata" },
      { text: "I get frustrated, impatient, or irritable.", dosha: "Pitta" },
      { text: "I withdraw, avoid the situation, or feel lethargic.", dosha: "Kapha" }
    ]
  },
  {
    id: "q5",
    question: "What is your typical sleep pattern?",
    options: [
      { text: "Light sleeper, easily awakened, or I struggle with insomnia.", dosha: "Vata" },
      { text: "Moderate sleeper, but I might wake up feeling warm or have intense dreams.", dosha: "Pitta" },
      { text: "Deep, heavy sleeper; I find it hard to wake up in the morning.", dosha: "Kapha" }
    ]
  },
  {
    id: "q6",
    question: "How would you describe your energy levels throughout the day?",
    options: [
      { text: "It fluctuates—I have sudden bursts of energy followed by crashes.", dosha: "Vata" },
      { text: "High and focused, though I can push myself to exhaustion.", dosha: "Pitta" },
      { text: "Steady and enduring, but I can feel slow to get started.", dosha: "Kapha" }
    ]
  },
  {
    id: "q7",
    question: "What climate or weather do you prefer?",
    options: [
      { text: "Warm and humid; I easily get cold and dislike windy weather.", dosha: "Vata" },
      { text: "Cool and well-ventilated; I cannot tolerate extreme heat.", dosha: "Pitta" },
      { text: "Warm and dry; I dislike damp, cold, and gloomy weather.", dosha: "Kapha" }
    ]
  },
  {
    id: "q8",
    question: "How do you learn and process new information?",
    options: [
      { text: "I learn quickly but also forget quickly.", dosha: "Vata" },
      { text: "I have sharp focus and understand complex concepts easily.", dosha: "Pitta" },
      { text: "It takes me a while to learn, but once I do, I never forget.", dosha: "Kapha" }
    ]
  },
  {
    id: "q9",
    question: "How would you describe your communication style?",
    options: [
      { text: "Fast-paced, enthusiastic, and I tend to jump between topics.", dosha: "Vata" },
      { text: "Direct, articulate, and sometimes argumentative.", dosha: "Pitta" },
      { text: "Calm, thoughtful, and I prefer to listen more than I speak.", dosha: "Kapha" }
    ]
  },
  {
    id: "q10",
    question: "What is your relationship with routines?",
    options: [
      { text: "I dislike them; I prefer spontaneity and variety.", dosha: "Vata" },
      { text: "I thrive on structure, lists, and clear goals.", dosha: "Pitta" },
      { text: "I easily fall into routines, sometimes getting stuck in ruts.", dosha: "Kapha" }
    ]
  },
  {
    id: "q11",
    question: "How would you describe your appetite?",
    options: [
      { text: "Variable; changes from day to day.", dosha: "Vata" },
      { text: "Strong; I can eat large meals and digest them quickly.", dosha: "Pitta" },
      { text: "Steady but moderate; I don't feel hungry until late morning.", dosha: "Kapha" }
    ]
  },
  {
    id: "q12",
    question: "What are your dreams usually like?",
    options: [
      { text: "Flying, running, or feeling fearful/anxious.", dosha: "Vata" },
      { text: "Action-packed, competitive, or involving fire/heat.", dosha: "Pitta" },
      { text: "Peaceful, romantic, or involving water and nature.", dosha: "Kapha" }
    ]
  },
  {
    id: "q13",
    question: "How do your joints usually feel?",
    options: [
      { text: "Often crack or pop when I move, prone to stiffness.", dosha: "Vata" },
      { text: "Generally flexible, but prone to inflammation or heat.", dosha: "Pitta" },
      { text: "Well-lubricated, strong, and deeply padded.", dosha: "Kapha" }
    ]
  },
  {
    id: "q14",
    question: "How would you describe your hair type?",
    options: [
      { text: "Dry, frizzy, thin, or prone to split ends.", dosha: "Vata" },
      { text: "Fine, soft, prone to early graying or thinning.", dosha: "Pitta" },
      { text: "Thick, lustrous, wavy, or oily.", dosha: "Kapha" }
    ]
  },
  {
    id: "q15",
    question: "When it comes to money, you tend to:",
    options: [
      { text: "Spend it impulsively; wealth fluctuates.", dosha: "Vata" },
      { text: "Invest strategically; I like to accumulate wealth for success.", dosha: "Pitta" },
      { text: "Save it diligently; I prefer financial security and rarely waste money.", dosha: "Kapha" }
    ]
  },
  {
    id: "q16",
    question: "What is your pulse typically like?",
    options: [
      { text: "Fast, faint, or irregular.", dosha: "Vata" },
      { text: "Strong, bounding, and moderate pace.", dosha: "Pitta" },
      { text: "Slow, steady, and broad.", dosha: "Kapha" }
    ]
  },
  {
    id: "q17",
    question: "How do you usually handle conflict?",
    options: [
      { text: "I try to avoid it and often worry about it afterward.", dosha: "Vata" },
      { text: "I face it head-on and fight for my point of view.", dosha: "Pitta" },
      { text: "I act as a peacemaker or simply ignore the conflict.", dosha: "Kapha" }
    ]
  },
  {
    id: "q18",
    question: "Which flavors do you naturally crave most?",
    options: [
      { text: "Sweet, sour, or salty foods.", dosha: "Vata" },
      { text: "Sweet, bitter, or astringent foods.", dosha: "Pitta" },
      { text: "Pungent (spicy), bitter, or astringent foods.", dosha: "Kapha" }
    ]
  },
  {
    id: "q19",
    question: "What is your typical body temperature like?",
    options: [
      { text: "My hands and feet are often cold.", dosha: "Vata" },
      { text: "I run warm and easily overheat.", dosha: "Pitta" },
      { text: "I run cool but generally comfortable.", dosha: "Kapha" }
    ]
  },
  {
    id: "q20",
    question: "What type of exercise do you enjoy most?",
    options: [
      { text: "Fast-paced movement like running, dancing, or cycling.", dosha: "Vata" },
      { text: "Competitive sports, intense workouts, or goal-oriented training.", dosha: "Pitta" },
      { text: "Gentle, steady activities like walking, swimming, or restorative yoga.", dosha: "Kapha" }
    ]
  }
]
