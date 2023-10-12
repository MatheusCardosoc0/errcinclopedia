"use client"

import { data } from "@/@types/dataType";
import { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import ErrorsContainer from "./ErrorsContainer";
import axios from "axios";

const Main = () => {

    const [searchTerm, setSearchTerm] = useState<string>("")
    const [filteredData, setFilteredData] = useState<data[]>([])
    const [errors, setErrors] = useState<data[]>([])
    const [filterForType, setFilterForType] = useState<string>("Notas Fiscais")

    // function extractDateFromId(id: string) {
    //     const datePattern = /\w{3} \w{3} \d{2} \d{4} \d{2}:\d{2}:\d{2} GMT[+-]\d{4} \(\w+ Standard Time\)/;
    //     const dateMatch = id.match(datePattern);
    //     return dateMatch ? new Date(dateMatch[0]) : null;
    // }

    function sortDataByDateDesc(data: any[]) {
        return data.sort((a, b) => {
            const dateA = parseInt((a[0]).split('-')[1]);
            const dateB = parseInt((b[0]).split('-')[1]);
            return dateB - dateA
        });
    }


    useEffect(() => {
        const lowercasedSearchTerm = searchTerm.toLowerCase();

        if (searchTerm === "") {
            setFilteredData(errors);
        } else {
            setFilteredData(errors.filter(item =>
                item[1].toString().toLowerCase().includes(lowercasedSearchTerm)
            ))
        }
    }, [searchTerm, errors])

    async function getData() {
        try {
            const response = await axios.get(`/api/get/${filterForType}`)

            const sortedErrors = sortDataByDateDesc(response.data.values.slice(1));
            setErrors(sortedErrors);
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filterForType])

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
                    items-end
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
                        Ciclopédia
                    </p>
                    <b
                        className="
                            font-bold
                            text-blue-400
                            text-5xl
                        "
                    >
                        v3
                    </b>
                </h2>
            </div>
            <SearchBar
                onChange={e => setSearchTerm(e.target.value)}
                setFilterForType={e => setFilterForType(e.target.value)}
                currentFilterForType={filterForType}
            />
            <ErrorsContainer
                filteredData={filteredData}
            />
        </>
    );
}

export default Main;