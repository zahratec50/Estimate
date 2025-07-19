"use client"
import React, {useEffect} from 'react'
import { useThemeStore } from '@/components/modules/store/useThemeStore'


export function changeTheme(){
    const { theme } = useThemeStore();

  useEffect(() => {
    if (theme === 'dark') {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [theme]);
}
