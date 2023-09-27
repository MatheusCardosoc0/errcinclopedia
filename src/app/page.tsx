import { data } from '@/@types/dataType'
import axios from 'axios'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Plus } from 'lucide-react'
import ErrorLayout from '@/components/ErrorLayout'
import Main from '@/components/Main'

export default async function Home() {

  const response = await fetch(`https://errciclopedia.vercel.app/api/get`, {
    next: { revalidate: 0 }
  })

  const data = await response.json()


  return (
    <main className="flex min-h-screen flex-col items-center justify-between">

      <Main errors={data.values.slice(1)} />

      {/* {data.values.slice(1).map((item: any) => (
        <ErrorLayout key={item[0].toString()} item={item} />
      ))} */}

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
