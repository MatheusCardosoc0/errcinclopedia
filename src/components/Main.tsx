"use client"

import { data } from "@/@types/dataType";
import { useEffect, useState } from "react";
import ErrorLayout from "./ErrorLayout";

interface MainProps {
    errors: data[]
}

const Main = ({
    errors
}: MainProps) => {

    const data = errors
    const [searchTerm, setSearchTerm] = useState<string>("")
    const [filteredData, setFilteredData] = useState<data[]>([])

    console.log(errors[0][2].toString())


    useEffect(() => {
        const lowercasedSearchTerm = searchTerm.toLowerCase();

        if (searchTerm === "") {
            setFilteredData(errors);
        } else {
            setFilteredData(data.filter(item =>
                item[1].toString().toLowerCase().includes(lowercasedSearchTerm)
            ))
        }
    }, [searchTerm, errors, data])

    return (
        <>
            <div
                className='
          w-full
          text-start
          p-2
          mb-[20px]
        '
            >
                <h2 className='
          flex
          text-6xl
          font-black
        '>
                    <b
                        className='
              text-transparent
              bg-clip-text
              bg-gradient-to-tr from-orange-500 via-red-500 to-orange-500
            '
                    >Err</b>
                    <p
                        className='
              text-white
              drop-shadow-[1px_0px_2px_black]
            '
                    >
                        Cinclopédia
                    </p>
                </h2>
            </div>
            <label
                htmlFor='search'
                className='
          w-[90%]
          max-w-[500px]
          rounded-full
          bg-orange-500
          p-2
          mb-[20px]
          cursor-text
        '
            >
                <input
                    id='search'
                    placeholder='Buscar...'
                    onChange={e => setSearchTerm(e.target.value)}
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
                className='
          flex
          flex-wrap
          gap-[12px]
          w-full
          max-w-[720px]
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

        </>
    );
}

export default Main;