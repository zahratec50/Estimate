import { redirect } from 'next/navigation';

export default function QuizRootRedirect() {
  redirect('/firstQuiz/1');
}