import { data } from '@/@types/dataType'
import axios from 'axios'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Plus } from 'lucide-react'
import ErrorLayout from '@/components/Main/ErrorLayout'
import Main from '@/components/Main'
import LinkButton from '@/components/LinkButton'

export default async function Home() {

  //https://errciclopedia.vercel.app


  return (
    <main className="flex min-h-screen flex-col items-center justify-between">

      <Main />

      <LinkButton />
    </main>
  )
}
