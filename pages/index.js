import Head from 'next/head'
import React, { useState } from 'react'
import { main } from '../services/reservations'

export default function Home() {
  const [N, setN] = useState()
  const [M, setM] = useState('')
  const [answer, setAnswer] = useState()

  const handleNChange = (e) => {
    setN(e.target.value) 
  }

  const handleMChange = (e) => {
    setM(e.target.value)
  }

  return (
    <div className='w-auto h-screen'>

      <div className='flex justify-center font-bold text-2xl'>
        ✈ Reservations
      </div>

      <div className='flex justify-center'>
        <div className='flex-col mt-10'>
          <div className='border rounded-sm p-1'>
            <input type='text' value={N} onChange={handleNChange} placeholder='number of seat rows'>
            </input>
          </div>
          <div className='mt-2 border rounded-sm p-1'>
            <input type='text' value={M} onChange={handleMChange} placeholder='reservation string'>
            </input>
          </div>
        </div>
      </div>


      <div className='flex justify-center w-auto h-auto mt-14'>
          <div>
            maximum number of family allocations <p className='font-bold inline-block'>{main(N, M)}</p>
          </div>
      </div>

    </div>
  )
}
