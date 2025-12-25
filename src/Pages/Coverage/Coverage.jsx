import { useLoaderData } from "react-router";
import CoverageMap from "./CoverageMap";
import { useState } from "react";

const Coverage = () => {
    const deliveryLocation = useLoaderData();

    const [search, setSearch] = useState('');
    const [filterData, setFilteredData] = useState(deliveryLocation);
    const [activePosition, setActivePosition] = useState(null);


    const handleSearch = (e) => {
        e.preventDefault();
        const result = deliveryLocation.filter(item =>
            item.district.toLowerCase().includes(search.toLowerCase())
        );
        if (result.length > 0) {
            setFilteredData(result);
            setActivePosition([result[0].latitude, result[0].longitude]);
        } else {
            alert("District not found");
        }
    }

    return (
        <div className="px-16 mb-20">
            <h1 className="font-extrabold text-[#03373D] py-12 text-5xl">We are available in 64 districts</h1>
            <div className="w-full max-w-xl pb-10">
                <div className="flex items-center bg-base-200 rounded-full px-4 py-2">

                    {/* Search Icon */}
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-gray-500 mr-3"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 21l-4.35-4.35m1.85-5.4a7.25 7.25 0 11-14.5 0 7.25 7.25 0 0114.5 0z"
                        />
                    </svg>

                    {/* Input */}
                    <input
                        type="text"
                        placeholder="Search here"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="flex-1 bg-transparent outline-none text-sm"
                    />

                    {/* Button */}
                    <button onClick={handleSearch} className="btn bg-lime-400 hover:bg-lime-500 text-black rounded-full px-6">
                        Search
                    </button>
                </div>
            </div>
            <div className="divider opacity-50"></div>
            <h2 className="font-extrabold text-3xl text-[#03373D] pb-12">We deliver almost all over Bangladesh</h2>
            <CoverageMap
                activePosition={activePosition}
                deliveryLocation={filterData}
            />
        </div>
    );
};

export default Coverage;