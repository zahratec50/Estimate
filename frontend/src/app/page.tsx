import React from 'react'
import Link from 'next/link'

export default function HomePage() {
  return (
    <div className='flex items-center justify-center mt-10'>
      <Link href='/signup' className='w-32 p-2 rounded-md flex items-center justify-center bg-newGray-greige'>Get Start</Link>
    </div>
  )
}
