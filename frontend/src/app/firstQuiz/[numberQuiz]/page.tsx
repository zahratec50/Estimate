'use client';

import ClientShell from '@/components/modules/ClientShell/ClientShell';
import { redirectLogic } from '@/hooks/helpers';

export default function FirstQuizPage({ params }: { params: { step: string } }) {
  const step = parseInt(params.step, 10);

  redirectLogic(step)

  return <ClientShell />;
}