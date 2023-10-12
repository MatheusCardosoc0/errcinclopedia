import { filterForTypeOptions } from "@/constants/filterForTypeOptions";
import { Select } from "../Inputs";

interface SearchBarProps {
    onChange: (e: any) => void
    setFilterForType: (e: any) => void
    currentFilterForType: string
}

const SearchBar: React.FC<SearchBarProps> = ({
    onChange,
    setFilterForType,
    currentFilterForType
}) => {
    return (
        <div
            className="
                w-full
                flex
                items-center
                flex-wrap
                gap-4
                justify-center
            "
        >
            <label
                htmlFor='search'
                className='
                    w-[90%]
                    max-w-[500px]
                    rounded-full
                    bg-orange-500
                    p-2
                    cursor-text
                    '
            >
                <input
                    id='search'
                    placeholder='Buscar...'
                    onChange={onChange}
                    className='
                        w-full
                        rounded-full
                        p-2
                        focus:outline-none
                        text-lg
                        text-neutral-500
                    '
                />
            </label>
            <div
                className="
                    flex
                    justify-center
                    flex-col
                    items-center
                    gap-1
                    my-[10px]
                    border-2
                    border-black
                    rounded-xl
                    p-2
                    bg-white
                "
            >
                <b
                    className="
                        w-full
                        text-center
                        text-2xl
                        text-black
                    "
                >
                    Filtros:
                </b>
                <div
                    className="
                    w-full
                    justify-center
                    gap-4
                    flex
                    max-w-[420px]
                    items-center
                "
                >
                    <Select
                        options={filterForTypeOptions}
                        onChange={setFilterForType}
                        value={currentFilterForType}
                    />
                </div>
            </div>
        </div>
    );
}

export default SearchBar;