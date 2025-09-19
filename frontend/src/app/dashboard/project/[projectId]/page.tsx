import React from 'react';
import ProjectDetails from '@/components/templates/Dashboard/ProjectDetail/ProjectDetail';

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const { projectId } = await params;

  return (
    <div>
      <ProjectDetails projectId={projectId} />
    </div>
  );
}

