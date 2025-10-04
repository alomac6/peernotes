import { Link } from '@tanstack/react-router'
import { useState } from 'react'
export default function Searchbar() {
    return(
       <div className='w-full h-fit flex flex-row justify-center border-black border-3 rounded-sm mt-[5vh]'>
            <input placeholder='search your classes p' className='w-full p-1 focus:outline-none'/>
        </div>
    );
}