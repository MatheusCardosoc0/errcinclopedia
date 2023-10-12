import { data } from "@/@types/dataType";
import ErrorLayout from "./ErrorLayout";

interface ErrorsContainerProps {
    filteredData: data[]
}

const ErrorsContainer: React.FC<ErrorsContainerProps> = ({
    filteredData
}) => {
    return (
        <div
            className='
                    flex
                    flex-wrap
                    gap-[12px]
                    w-full
                    max-w-[1080px]
                    justify-center
                    items-center
                    h-full
                    max-h-[70vh]
                    overflow-y-scroll
                    py-12
                '
        >
            {filteredData.length === 0 && (
                <div className='
                        rounded-full
                        w-[220px]
                        h-[220px]
                        border-r-8
                        border-t-8
                        border-b-8
                        border-blue-600
                        bg-transparent
                        animate-spin
                    ' />
            )}
            {filteredData.map((item) => (
                <ErrorLayout key={item[0].toString()} item={item} />
            ))}
        </div>
    );
}

export default ErrorsContainer;