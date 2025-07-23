"use client"
import React from 'react'
import Image from 'next/image'

//! to be checked

export default function Error() {
  return (
    <div className='max-w-screen min-h-screen flex items-center justify-center'>
      <section className='flex flex-col items-center justify-center'>
        <Image src='/images/500 Internal Server Error-cuate.png' alt='500 error' width={380} height={380} />
        <p className='text-lg md:text-2xl text-black-50'>Oops! Something went wrong. Don't worry, it's us. Please refresh your browser or check back soon.</p>
      </section>
    </div>
  )
}
