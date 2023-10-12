'use client'

import { HTMLInputTypeAttribute, useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { UseFormRegister } from 'react-hook-form'

interface SelectProps {
    options: string[],
    onChange: (e: any) => void,
    value: string
}

const Select: React.FC<SelectProps> = ({
    onChange,
    options,
    value
}) => {
    return (
        <select
            autoComplete={'off'}
            className="
                peer
                w-full
                rounded-lg
                bg-white
                p-2
                text-black
                outline-none
                drop-shadow-[0px_0px_1px_black]
                max-w-[200px]
            "
            value={value}
            onChange={onChange}
        >
            {options.map((item, i) => (
                <option
                    key={i}
                >
                    {item}
                </option>
            ))}
        </select>

    )
}

export default Select