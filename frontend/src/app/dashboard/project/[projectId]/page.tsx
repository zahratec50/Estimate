import React from 'react';
import ProjectDetails from '@/components/templates/Dashboard/ProjectDetail/ProjectDetail';

export default function ProjectDetailPage({
  params,
}: {
  params: { projectId: string };
}) {
  const { projectId } = params;

  return (
    <div>
      <ProjectDetails projectId={projectId} />
    </div>
  );
}

