import React from 'react'
import Quiz from "@/components/templates/Quiz/Quiz"

export default async function MainQuizPage() {
  return (
    <div>
      <Quiz isFirstQuiz={false} />
    </div>
  )
}
