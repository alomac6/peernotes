import { Link } from '@tanstack/react-router'
import { useState } from 'react'
import ClassesQuery from './ClassesQuery.tsx'
import Searchbar from './Searchbar.tsx'
export default function Classes() {
    return(
        <div className='w-[70vw] h-full border-2-black m-auto'>
            <Searchbar/>
            <div className='mt-[5vh]'></div>
        </div>
    );
}