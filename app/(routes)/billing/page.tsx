import { PricingTable } from '@clerk/nextjs'
import React from 'react'

const Billing = () => {
  return (
    <div className='mt-5'>
        <h2 className='font-bold text-3xl text-center'>Choose Your Plan</h2>
        <p className='text-lg text-center mb-7'>Select a Subscription Plan to get All AI tools at your fingertips</p>
        <PricingTable/>
    </div>
  )
}

export default Billing