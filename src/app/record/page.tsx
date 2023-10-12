/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import { Input, Select } from '@/components/Inputs'
import Textarea from '@/components/Textarea'
import ImageUpload from '@/components/Upload'
import { filterForTypeOptions } from '@/constants/filterForTypeOptions'
import { useCurrentCount } from '@/context/currentCount'
import { useCurrentError } from '@/context/currentError'
import { useCurrentMod } from '@/context/currentMod'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { z } from 'zod'

const schema = z.object({
    title: z.string().min(8, "O titulo deve conter pelo menos 8 letras"),
    resolution: z.string().min(10, 'A resolução deve conter ao menos 10 letras'),
    context: z.string().min(10, 'O contexto deve conter pelo menos 10 letras'),
    image: z.string().nonempty("Adicione a imagem do erro"),
    infoExtra: z.string().optional()
})

type FormProps = z.infer<typeof schema>

export default function Home() {

    const { currentMod } = useCurrentMod()
    const [filterForType, setFilterForType] = useState<string>("Notas Fiscais")
    const [currentCount, setCurrentCount] = useState(0)

    const {
        handleSubmit,
        watch,
        setValue,
        formState: { errors },
        register,
    } = useForm<FormProps>({
        resolver: zodResolver(schema),
        reValidateMode: 'onChange',
        mode: 'all',
        defaultValues: {
            context: '',
            resolution: '',
            title: '',
            image: '',
            infoExtra: ''
        }
    })

    const image = watch('image')
    const context = watch('context');
    const resolution = watch('resolution');
    const title = watch('title');
    const infoExtra = watch('infoExtra');

    const { currentError } = useCurrentError()

    const router = useRouter()

    async function onSubmit(data: FormProps) {

        try {
            if (currentMod === 'POST') {
                const id = `Error-${currentCount + 1}-${new Date()}`

                await axios.post('/api/send', { ...data, id, status: filterForType })
            } else {
                const str = currentError[0].toString()
                const regex = /-([0-9]+)-/;
                const match = str.match(regex);

                if (match) {
                    const countId = parseInt(match[1], 10);

                    await axios.put(`/api/update/A${countId}-H${countId}-${filterForType}`, { ...data, id: currentError[0], status: filterForType })

                    console.log(`/api/update/A${countId}-H${countId}-${filterForType}`)
                }
            }

            toast.success("Mensagem de erro registrada!")

            router.push('/')
            router.refresh()
        } catch (error) {
            toast.warning("Erro ao registrar mensagem")
        }
    }

    useEffect(() => {
        if (currentMod === 'PUT') {
            setValue('title', currentError[1].toString())
            setValue('image', currentError[2].toString())
            setValue('context', currentError[3].toString())
            setValue('resolution', currentError[4].toString())
            setFilterForType(currentError[7].toString())
            if (currentError[5]) {
                setValue('infoExtra', currentError[5].toString())
            }
        }
    }, [currentError, setValue, currentMod])

    useEffect(() => {
        if (currentMod === 'NONE') {
            router.replace('/')
        }
    }, [router, currentMod, currentError])

    async function getCurrentCount() {
        try {
            const response = await axios.get(`/api/get/${filterForType}`)

            setCurrentCount(response.data.values.length)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getCurrentCount()
    }, [filterForType])

    console.log(currentCount)

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <form
                onSubmit={handleSubmit(onSubmit)}
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
                    <span
                        className='text-bold text-red-500 text-2xl'
                    >
                        {errors.image?.message}
                    </span>
                    <ImageUpload
                        onChange={(value) => setValue('image', value)}
                        value={image}
                    />

                    {currentMod === 'POST' && (
                        <div
                            className='
                            w-full
                            items-start
                        '
                        >
                            <Select
                                onChange={e => setFilterForType(e.target.value)}
                                options={filterForTypeOptions}
                                value={filterForType}
                            />
                        </div>
                    )}

                    <Input
                        id='title'
                        label='Titulo'
                        register={register}
                        type='text'
                        error={errors.title?.message}
                    />

                    <Textarea
                        id='context'
                        name='context'
                        label='Contexto'
                        register={register}
                        error={errors.context?.message}
                        currentValue={context}
                    />

                    <Textarea
                        id='resolution'
                        name='resolution'
                        label='Resolução'
                        register={register}
                        error={errors.resolution?.message}
                        currentValue={resolution}
                    />

                    <Textarea
                        name='infoExtra'
                        id='infoExtra'
                        label='Informação extra'
                        register={register}
                        currentValue={infoExtra || ''}
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
