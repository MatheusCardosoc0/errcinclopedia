"use client"

import { data } from "@/@types/dataType";
import { useCurrentError } from "@/context/currentError";
import { useCurrentMod } from "@/context/currentMod";
import { Plus } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const LinkButton = () => {

    const router = useRouter()
    const { setCurrentMod } = useCurrentMod()
    const { setCurrentError } = useCurrentError()

    function prepareToRegister() {
        setCurrentMod('POST')
        router.push('/record')
    }

    return (
        <button
            onClick={() => prepareToRegister()}
            title='Gravar novo erro'
            className='
                fixed
                bg-gradient-to-tr from-green-400 to-lime-500
                text-white
                rounded-full
                p-4
                bottom-4
                right-4
            '
        >
            <Plus size={80} />
        </button>
    );
}

export default LinkButton;