import React from 'react';
import ProjectDetails from '@/components/templates/Dashboard/ProjectDetail/ProjectDetail';

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const { projectId } = await params;

  return (
    <div className='flex justify-center mt-10 mb-20 px-4'>
      <ProjectDetails projectId={projectId} />
    </div>
  );
}

