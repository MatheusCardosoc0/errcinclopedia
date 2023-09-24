'use client'

import { CldUploadWidget } from 'next-cloudinary'
import Image from 'next/image'
import { useCallback } from 'react'
import { CameraIcon } from 'lucide-react'

interface ImageUploadProps {
    onChange: (value: string) => void
    value: string
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onChange, value }) => {
    const handleUpload = useCallback(
        (result: any) => {
            onChange(result.info.secure_url)
        },
        [onChange],
    )

    return (
        <CldUploadWidget
            onUpload={handleUpload}
            uploadPreset={'pfoyut3r'}
            options={{
                maxFiles: 1,
            }}
        >
            {({ open }) => {
                return (
                    <div
                        onClick={() => open?.()}
                        className="
                            relative
                            flex
                            cursor-pointer
                            flex-col
                            items-center 
                            justify-center 
                            gap-4 
                            border-2
                            border-dashed
                            border-black
                            p-20
                            text-black
                            transition
                            hover:drop-shadow-[1px_1px_20px_red]
                            hover:border-red-500
                            hover:text-red-500
                            duration-1000
                            w-[320px]
                            h-[240px]
                        "
                    >
                        <CameraIcon size={50} />
                        <div className="text-lg font-semibold">Imagem do erro</div>
                        {value && (
                            <div
                                className="
              absolute inset-0 h-full w-full"
                            >
                                {value && (
                                    <Image
                                        fill
                                        style={{ objectFit: 'cover' }}
                                        src={value}
                                        alt="House"
                                    />
                                )}
                            </div>
                        )}
                    </div>
                )
            }}
        </CldUploadWidget>
    )
}

export default ImageUpload