import { useState } from 'react'

interface TextareaProps {
    label: string
    error?: string | undefined
    onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
    disabled?: boolean
    id: string
}

const Textarea: React.FC<TextareaProps> = ({
    error,
    label,
    disabled,
    id,
    onChange
}) => {
    const [value, setValue] = useState("");
    const [prevValue, setPrevValue] = useState("- ");

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newValue = event.target.value
            .split('\n')
            .map((line, index, array) => {
                if (line.trim() === "") return line;
                if (prevValue.split('\n')[index]?.startsWith('-') && !line.startsWith('- ')) return line;
                return line.startsWith('- ') ? line : '- ' + line;
            })
            .join('\n');

        setValue(newValue);
        setPrevValue(newValue);
        onChange({ ...event, target: { ...event.target, value: newValue } });
    };


    return (
        <div className="flex w-full flex-col gap-1 drop-shadow-[0px_0px_1px_black]">
            <span className="animate-alert text-sm font-semibold text-orange-600 transition duration-1000">
                {error}
            </span>
            <div className="relative w-full">
                <textarea
                    id={id.toString()}
                    value={value}
                    disabled={disabled}
                    onChange={handleChange}
                    autoComplete={'off'}
                    className="peer w-full rounded-lg bg-white px-2 pb-2 pt-8 text-black outline-none"
                />
                <label htmlFor={id.toString()} className="absolute left-2 top-6 origin-[0] -translate-y-1/2 cursor-text font-bold text-neutral-700 transition duration-500 peer-placeholder-shown:translate-y-12 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:scale-75">
                    {label}
                </label>
            </div>
        </div>
    )
}

export default Textarea
