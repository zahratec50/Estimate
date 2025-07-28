"use client"
import React from 'react'
import { useAppStore } from '@/store/useAppStore';
import Topbar from '@/components/modules/Topbar/Topbar';

export default function Header() {
  const {
      isHelpOpen,
      toggleSidebar,
      toggleHelp,
      
    } = useAppStore();
  return (
    <div>
      <Topbar
        isHelpOpen={isHelpOpen}
        onHelpToggle={toggleHelp}
        onMenuClick={toggleSidebar}
        isHome={true}
      />
    </div>
  )
}
