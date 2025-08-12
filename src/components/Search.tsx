import { useState } from 'react'

const Search = ({ setSearchTerm }: { setSearchTerm: (val: string) => void }) => {
    const [handleInput, setHanleInput] = useState("")

    const handleSearch = () => {
        setSearchTerm(handleInput)
    }

    return (
        <div className='text-white w-full max-w-md mx-auto'>
            <input onKeyDown={(e) => e.key === "Enter" && handleSearch()} onChange={(e) => setHanleInput(e.target.value)}  type="text" name="" className="text-white " placeholder='Search for A job...' />
        </div>
    )
}

export default Search