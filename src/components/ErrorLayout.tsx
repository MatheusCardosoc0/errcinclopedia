import { data } from "@/@types/dataType";
import Image from "next/image";

interface ErrorLayoutProps {
    item: data
}

const ErrorLayout: React.FC<ErrorLayoutProps> = ({
    item
}) => {
    return (
        <div
            key={item[0].toString()}
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
                {item[1]}
            </span>
            <Image
                src={item[2].toString()}
                alt='image'
                className='
              w-full
              h-full
              max-h-[380px]
              rounded-xl
            '
                width={720}
                height={540}
            />
        </div>
    );
}

export default ErrorLayout;