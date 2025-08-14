import MainQuiz from '@/components/templates/mainQuiz/MainQuiz'
import React from 'react'
type Params = {
  id: string;
};

export default async function MainQuizPage({params}: {params: Params}) {
  const { id } = await params;
  return (
    <div>
      <MainQuiz  />
    </div>
  )
}
