"use client"

import React, { useState } from 'react';
import { UseFormRegister } from 'react-hook-form';

interface TextareaProps {
    label: string;
    name: string;
    error?: string | undefined;
    onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
    register?: UseFormRegister<any>;
    disabled?: boolean;
    id: string;
}

const Textarea: React.FC<TextareaProps> = ({
    name,
    error,
    label,
    disabled,
    id,
    register,
    onChange
}) => {
    const [value, setValue] = useState("");

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newValue = event.target.value
            .split('\n')
            .map((line) => line.trim() === "" ? line : line.startsWith('- ') ? line : '- ' + line)
            .join('\n');

        setValue(newValue);

        if (onChange) onChange(event);
    };

    return (
        <div className="flex w-full flex-col gap-1 ">
            <span className="animate-alert text-sm font-semibold text-orange-600 transition duration-1000">
                {error}
            </span>
            <div className="relative w-full drop-shadow-[0px_0px_1px_black]">
                <textarea
                    {...(register ? register(name) : {})}
                    id={id}
                    value={value}
                    disabled={disabled}
                    onChange={handleChange}
                    autoComplete={'off'}
                    className="peer w-full rounded-lg bg-white px-2 pb-2 pt-8 text-black outline-none"
                />
                <label htmlFor={id} className="absolute left-2 top-6 origin-[0] -translate-y-1/2 cursor-text font-bold text-neutral-700 transition duration-500 peer-placeholder-shown:translate-y-12 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:scale-75">
                    {label}
                </label>
            </div>
        </div>
    )
}

export default Textarea;
