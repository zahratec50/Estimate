'use client';

import { useEffect } from 'react';
import { useAppStore } from '@/store/useAppStore';
import ClientShell from '@/components/modules/ClientShell/ClientShell';

export default function FirstQuizPage({ params }: { params: { step: string } }) {
  const { isRegistered, setCurrentStep } = useAppStore();
  const step = parseInt(params.step, 10);

  useEffect(() => {
    if (isRegistered) {
      window.location.href = '/mainQuiz/1';
    } else if (step >= 1 && step <= 4) {
      setCurrentStep(step);
    } else {
      window.location.href = '/firstQuiz/1';
    }
  }, [step, isRegistered, setCurrentStep]);

  return <ClientShell />;
}