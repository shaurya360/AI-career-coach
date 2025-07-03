import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

const WelcomeBanner = () => {
  return (
    <div className='p-5 bg-gradient-to-r from-[#BE575F] via-[#A338E3] to-[#AC76D6] rounded-xl'>
        <h2 className='font-bols text-3xl text-white'>AI Career Coach Agent</h2>
        <p className='text-white'>Smarter career decisions start here — get tailored advice, real-time market insights, and a roadmap built just for you with the power of AI.</p>
        <Link href={'/ai-tools'}><Button variant={'outline'} className='mt-3'>Lets Get Started</Button></Link>
    </div>
  )
}

export default WelcomeBanner