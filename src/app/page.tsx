'use client'

import { data } from '@/@types/dataType'
import Input from '@/components/Input'
import ImageUpload from '@/components/Upload'
import axios from 'axios'
import Image from 'next/image'
import Link from 'next/link'
import { FormEvent, useEffect, useState } from 'react'
import { Plus } from 'lucide-react'
import ErrorLayout from '@/components/ErrorLayout'

export default function Home() {

  const [data, setData] = useState<data[]>([])

  async function getValuesForSheet() {
    try {
      const response = await axios.get('/api/get')

      setData(response.data.values.slice(1))
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getValuesForSheet()
  }, [])

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {data.map((item) => (
        <ErrorLayout key={item[0].toString()} item={item} />
      ))}

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
