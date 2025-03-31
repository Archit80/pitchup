import React from 'react'
import Form from "next/form";
import SearchFormReset from './SearchFormReset';
// import Link from 'next/link';
import { SearchIcon } from 'lucide-react';

const SearchForm = ({query}: {query?: string}) => {
 
  return (
    <div>
       <Form action="/" scroll={false} className='search-form'>
            <input type="text" name="query" defaultValue={query} placeholder="Search Startups" className='search-input' />


            <div className='flex gap-2'>
                {query && (<SearchFormReset />)}

                <button type="submit" className='search-btn text-white' title="Search">
                    <SearchIcon className='size-5'/>
                </button>
            </div>

       </Form>
    </div>
  )
}

export default SearchForm