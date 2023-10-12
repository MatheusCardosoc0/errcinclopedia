'use client'

import { HTMLInputTypeAttribute, useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { UseFormRegister } from 'react-hook-form'

type fileds =
    | 'title'
    | 'Resolution'
    | 'Context'
    | 'Info.Extra'

interface InputProps {
    label: string
    error?: string | undefined
    register: UseFormRegister<any>
    type: HTMLInputTypeAttribute
    disabled?: boolean
    id: fileds
}

const Input: React.FC<InputProps> = ({
    error,
    label,
    register,
    type,
    disabled,
    id,
}) => {
    const [typeInput, setTypeInput] = useState(type)

    return (
        <div
            className="
                flex
                w-full
                flex-col
                gap-1
            "
        >
            <span
                className="
                    animate-alert
                    text-sm
                    font-semibold
                    text-orange-600
                    transition
                    duration-1000
                "
            >
                {error}
            </span>

            <div className="relative w-full  drop-shadow-[0px_0px_1px_black]">
                <input
                    id={id}
                    {...register(id)}
                    disabled={disabled}
                    type={typeInput}
                    autoComplete={'off'}
                    className="
                        peer
                        w-full
                        rounded-lg
                        bg-white
                        px-2
                        pb-2
                        pt-8
                        text-black
                        outline-none
                        "
                />

                <label
                    htmlFor={id}
                    className="
                        absolute
                        left-2
                        top-6
                        origin-[0]
                        -translate-y-1/2
                        cursor-text
                        font-bold
                        text-neutral-700
                        transition
                        duration-500
                        peer-placeholder-shown:translate-y-12
                        peer-placeholder-shown:scale-100
                        peer-focus:top-2
                        peer-focus:scale-75
                    "
                >
                    {label}
                </label>

                {type === 'password' && (
                    <span
                        onClick={() =>
                            setTypeInput((prev) =>
                                prev === 'password' ? 'text' : 'password',
                            )
                        }
                        className="
                            absolute
                            right-2
                            top-2
                            text-4xl
                            text-black
                            "
                    >
                        {typeInput === 'password' ? (
                            <EyeOff />
                        ) : (
                            <Eye className="text-black" />
                        )}
                    </span>
                )}
            </div>
        </div>
    )
}

export default Input