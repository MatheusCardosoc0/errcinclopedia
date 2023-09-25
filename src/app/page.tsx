'use client'

import { data } from '@/@types/dataType'
import axios from 'axios'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Plus } from 'lucide-react'
import ErrorLayout from '@/components/ErrorLayout'

export default function Home() {

  const [data, setData] = useState<data[]>([])
  const [searchTerm, setSearchTerm] = useState<string>("")
  const [filteredData, setFilteredData] = useState<data[]>([])

  async function getValuesForSheet() {
    try {
      const response = await fetch('/api/get', {
        method: 'GET',
        next: { revalidate: 0.1 }
      })

      const data = await response.json()

      setData(data.values.slice(1))
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (searchTerm === "") {
      setFilteredData(data)
    } else {
      setFilteredData(data.filter(item =>
        item[1].includes(searchTerm)
      ))
    }
  }, [searchTerm, data])

  useEffect(() => {
    getValuesForSheet()
  }, [])

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div
        className='
          w-full
          text-start
          p-2
          mb-[20px]
        '
      >
        <h2 className='
          flex
          text-6xl
          font-black
        '>
          <b
            className='
              text-transparent
              bg-clip-text
              bg-gradient-to-tr from-orange-500 via-red-500 to-orange-500
            '
          >Err</b>
          <p
            className='
              text-white
              drop-shadow-[1px_0px_2px_black]
            '
          >
            Cinclopédia
          </p>
        </h2>
      </div>
      <label
        htmlFor='search'
        className='
          w-[90%]
          max-w-[500px]
          rounded-full
          bg-orange-500
          p-2
          mb-[20px]
          cursor-text
        '
      >
        <input
          id='search'
          placeholder='Buscar...'
          onChange={e => setSearchTerm(e.target.value)}
          className='
            w-full
            rounded-full
            p-2
            focus:outline-none
            text-lg
            text-neutral-500
          '
        />
      </label>
      <div
        className='
          flex
          flex-wrap
          gap-[12px]
          w-full
          max-w-[720px]
          justify-center
          items-center
          h-full
          max-h-[70vh]
          overflow-y-scroll
          py-12
        '
      >
        {filteredData.length === 0 && (
          <div className='
            rounded-full
            w-[220px]
            h-[220px]
            border-r-8
            border-t-8
            border-b-8
            border-blue-600
            bg-transparent
            animate-spin
          ' />
        )}
        {filteredData.map((item) => (
          <ErrorLayout key={item[0].toString()} item={item} />
        ))}
      </div>


      <Link
        href={"/record"}
        title='Gravar novo erro'
        className='
          fixed
          bg-gradient-to-tr from-green-400 to-lime-500
          text-white
          rounded-full
          p-4
          bottom-4
          right-4
        '
      >
        <Plus size={60} />
      </Link>
    </main>
  )
}
