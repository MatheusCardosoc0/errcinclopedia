"use client"

import { useCurrentError } from "@/context/currentError";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Fragment, useState } from "react";
import { ArrowBigLeft } from "lucide-react"

const Error = () => {

    const { currentError } = useCurrentError()

    const [large, setLarge] = useState(false)

    const router = useRouter()

    if (currentError[2] === undefined) {
        router.replace('/')
        return null;
    }

    function transformText(input: string): JSX.Element {
        const segments = input.split('*');
        return (
            <>
                {segments.map((segment, index) => (
                    <Fragment key={index}>
                        {index !== 0 && '\u26AB '}{segment}
                        {index < segments.length - 1 && <br />}
                    </Fragment>
                ))}
            </>
        );
    }

    return (
        <section
            className="
                flex
                justify-center
                items-center
                h-full
                w-full
                min-h-screen
                py-12
              "
        >
            <Link
                href={'/'}
                className="
                    rounded-full
                    bg-red-500
                    text-white
                    fixed
                    top-2
                    left-2
                    p-4
                    z-20
                "
            >
                <ArrowBigLeft size={40} />
            </Link>
            <div
                className="
                flex
                flex-col
                gap-8
                items-center
                justify-center
                bg-white
                drop-shadow-[0px_0px_2px_black]
                py-6
                w-[90%]
                max-w-[720px]
                rounded-lg
              "
            >
                <Image
                    onClick={() => setLarge(prev => !prev)}
                    src={currentError[2].toString()}
                    alt="image"
                    width={1080}
                    height={1080}
                    className={`
                      h-[320px]
                      w-[440px]
                      cursor-pointer
                      hover:scale-110
                      ${large && 'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[720px] h-[540px]'}
                    `}
                />
                <div
                    className="
                      flex
                      flex-col
                      gap-4
                      items-center
                      w-full
                      text-start
                    "
                >
                    <h2
                        className="
                          text-xl
                          font-bold
                          text-center
                      "
                    >
                        {currentError[1]}
                    </h2>
                    <span
                        className="
                          w-[90%]
                      "
                    >
                        <b>
                            Contexto:
                        </b>
                        <p
                            className="pl-2"
                        >
                            {transformText(currentError[3].toString())}
                        </p>
                    </span>
                    <span
                        className="
                          w-[90%]
                      "
                    >
                        <b>
                            Resolução:
                        </b>

                        <p
                            className="pl-2"
                        >
                            {transformText(currentError[4].toString())}
                        </p>

                    </span>
                    {currentError[5] && (
                        <span
                            className="
                       w-[90%]
                   "
                        >
                            <b>
                                Informação extra:
                            </b>
                            <p
                                className="pl-2"
                            >
                                {transformText(currentError[5].toString())}
                            </p>
                        </span>
                    )}
                </div>
            </div>
        </section>
    );
}

export default Error;