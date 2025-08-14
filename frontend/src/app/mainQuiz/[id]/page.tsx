import ClientShell from '@/components/templates/Quiz/ClientShell/ClientShell';
import React from 'react'
type Params = {
  id: string;
};

export default async function MainQuizPage({params}: {params: Params}) {
  const { id } = await params;
  return (
    <div>
      <ClientShell isFirstQuiz={false} />
    </div>
  )
}
