"use client"

import { useCurrentError } from "@/context/currentError";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Fragment } from "react";
import { ArrowBigLeft } from "lucide-react"

const Error = () => {

    const { currentError } = useCurrentError()

    const router = useRouter()

    if (currentError[2] === undefined) {
        router.replace('/')
        return null;
    }

    function transformText(input: string): JSX.Element {
        const segments = input.split('-');
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
                    src={currentError[2].toString()}
                    alt="image"
                    width={580}
                    height={740}
                    className="
                      h-[320px]
                      w-[440px]
                    "
                />
                <div
                    className="
                      flex
                      flex-col
                      gap-4
                      items-center
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
                            {currentError[3]}
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
                            {currentError[5]}
                        </p>
                    </span>
                </div>
            </div>
        </section>
    );
}

export default Error;