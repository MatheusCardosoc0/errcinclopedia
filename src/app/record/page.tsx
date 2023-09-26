"use client"

import Input from '@/components/Input'
import Textarea from '@/components/Textarea'
import ImageUpload from '@/components/Upload'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FormEvent, useEffect, useState } from 'react'

export default function Home() {

    const [title, setTitle] = useState("")
    const [resolution, setResolution] = useState("")
    const [infoExtra, setInfoExtra] = useState("")
    const [Context, setContext] = useState("")
    const [image, setImage] = useState('')

    const router = useRouter()

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()

        const Data = {
            ID: 'ssss',
            Title: title,
            Resolution: resolution,
            InfoExtra: infoExtra,
            Image: image,
            Context
        }

        try {
            const response = await axios.post('/api/send', Data)

            console.log(response.data)
            alert('ok')

            router.push('/')
            router.refresh()
        } catch (error) {
            alert('error')
        }
    }

    async function getValuesForSheet() {
        try {
            const response = await axios.get('/api/get')

            console.log(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getValuesForSheet()
    }, [])

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <form
                onSubmit={handleSubmit}
                className='
                    w-[90%]
                    h-[90%]
                    max-w-[640px]
                    flex
                    flex-col
                    items-center
                    justify-center
                    gap-8
                    p-4
                    bg-white
                    drop-shadow-[0px_0px_2px_black]
                    rounded-xl
                '
            >
                <h2
                    className='
                    text-2xl
                    font-bold
                    w-full
                    text-start
                  '
                >
                    Adicione as informações do erro
                </h2>
                <div
                    className='
                        w-full
                        flex
                        flex-col
                        items-center
                        gap-[6px]
                    '
                >
                    <ImageUpload
                        onChange={(value) => setImage(value)}
                        value={image}
                    />

                    <Input
                        id='Title'
                        label='Titulo'
                        onChange={(e) => setTitle(e.target.value)}
                        type='text'
                    />

                    <Textarea
                        id='Context'
                        label='Contexto'
                        onChange={(e) => setContext(e.target.value)}
                    />

                    <Textarea
                        id='Resolution'
                        label='Resolução'
                        onChange={(e) => setResolution(e.target.value)}
                    />

                    <Textarea
                        id='Info.Extra'
                        label='Informação extra'
                        onChange={(e) => setInfoExtra(e.target.value)}
                    />
                </div>
                <div
                    className='
                      w-full
                      flex
                      items-center
                      gap-8
                  '
                >
                    <button
                        className='
                        text-xl
                        font-bold
                        p-4
                        rounded-xl
                        bg-gradient-to-tr from-lime-400 to-green-500
                        text-white
                        w-full
                        max-w-[160px]
                    '
                        type='submit'
                    >
                        Enviar
                    </button>

                    <Link
                        href={"/"}
                        className='
                        text-xl
                        font-bold
                        p-4
                        rounded-xl
                        bg-gradient-to-tr from-orange-500 to-red-500
                        text-white
                        w-full
                        max-w-[160px]
                        text-center
                    '
                        type='submit'
                    >
                        Cancelar
                    </Link>
                </div>
            </form>
        </main>
    )
}
