import { data } from "@/@types/dataType";
import { useCurrentError } from "@/context/currentError";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface ErrorLayoutProps {
    item: data
}

const ErrorLayout: React.FC<ErrorLayoutProps> = ({
    item
}) => {

    const router = useRouter()

    const { setCurrentError } = useCurrentError()

    function SetCurrentFunction() {
        setCurrentError(item)

        router.push(`/error/${item[1]}`)
    }

    function truncateString(str: string) {
        return str.length > 26 ? str.substring(0, 26) + '...' : str;
    }

    console.log(item[2])

    return (
        <button
            onClick={SetCurrentFunction}
            className='
            bg-gradient-to-tr from-yellow-500 via-amber-500 to-orange-500
            rounded-lg
            p-2
            w-full
            max-w-[280px]
            text-xl
            font-bold
            text-white
            flex
            flex-col
            gap-[8px]
            cursor-pointer
          '
        >
            <span>
                {truncateString(item[1].toString())}
            </span>
            <Image
                src={item[2].toString()}
                alt='image'
                className='
                    w-full
                    h-[280px]
                    rounded-xl
                '
                width={720}
                height={540}
            />
        </button>
    );
}

export default ErrorLayout;