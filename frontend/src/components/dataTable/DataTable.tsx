'use client';
import { useEffect, useState } from "react"
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import Pagination from "../pagination/Pagination";
import SearchBar from "@/app/components/search/SearchBar";
import { countUrl, dataUrl } from "@/constant/env";

type Filters = {
    limit:number
    page:number
    search: string
}

export type Data = {
    comment: string,
    host: string,
    id: number,
    ip: string,
    owner: string
}[] | null

export default function DataTable () {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();

    const params = new URLSearchParams(searchParams)
    const currentPage = Number(params.get('page')) || 1
    const currentSearchTerm = params.get('search') || ''
    const defaultFilters = {limit: 50, page: currentPage, search:currentSearchTerm}

    const [data, setData] = useState<Data>(null)
    const [error, setError] = useState('')
    const [filters, setFilters] = useState<Filters>(defaultFilters)
    const [itemCount, setItemCount] = useState(0)

    const pagesCount = Math.ceil(itemCount / filters.limit); 

    const handleOnPageNumberClick = (page: number) => {
        params.set('page', String(page))
        router.replace(`${pathname}?${params.toString()}`)
        setFilters({...filters, page})
    }

    const goToNext20pages = () => {
        if (currentPage + 20 > pagesCount) return
        const next20thPage = currentPage + 20
        params.set('page', String(next20thPage))
        router.replace(`${pathname}?${params.toString()}`)
        setFilters({...filters, page: next20thPage})
        console.log(next20thPage)
    }

    const goToPrev20pages = () => {
        if (currentPage - 20 < 1) return
        const prev20thPage = currentPage - 20
        params.set('page', String(prev20thPage))
        router.replace(`${pathname}?${params.toString()}`)
        setFilters({...filters, page: prev20thPage})
    }

    const handleSearch = (searchTerm: string) => { 
        const params = new URLSearchParams(searchParams)
        if (searchTerm) params.set('search', searchTerm)
        else params.delete('search')
        router.replace(`${pathname}?${params.toString()}`)
        setFilters({...filters, search: searchTerm}) 
    }

    useEffect(() => {
        const fetchItemCount = async() => {
            try {
                const response = await fetch(countUrl)
                const responseData = (await response.json()).count
                setItemCount(responseData)
            } catch{(err: any) => setError(err.message)}
        }
        fetchItemCount()
    },[])

   
    useEffect(() => {
        const fetchData = async() => {
           try {
                const response = (await fetch(`${dataUrl}?limit=${filters.limit}&page=${filters.page}&search=${filters.search}`))
                const resPonseData = await response.json()
                if (resPonseData) {
                    setData(resPonseData)
                    setError('')
                }
                else setError('No Data Found. Please search with other keywords')
                
            } catch {(err : any) => setError(err.message)}
        }
        fetchData()
    },[filters])
    
    const dataTable = data?.map(d => (
        <tr key = {d.ip} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <td className="px-6 py-4">{d.comment}</td>
            <td className="px-6 py-4">{d.host}</td>
            <td className="px-6 py-4">{d.id}</td>
            <td className="px-6 py-4">{d.ip}</td>
            <td className="px-6 py-4">{d.owner}</td>
        </tr>))

    return <>
        <SearchBar search = {filters.search} onChange={handleSearch}/>
        { data ? (
            <div className="my-16 overflow-x-auto">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-sm text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">COMMENT</th>
                            <th scope="col" className="px-6 py-3">HOST</th>
                            <th scope="col" className="px-6 py-3">ID</th>
                            <th scope="col" className="px-6 py-3">IP</th>
                            <th scope="col" className="px-6 py-3">OWNER</th>
                        </tr>
                    </thead>
                    <tbody>{dataTable}</tbody>
                </table>
            </div>
        ): <></> }

        {error && <div className = "my-16 text-sm">{error}</div>}

        {data && <Pagination currentPage={filters.page} {...{pagesCount, handleOnPageNumberClick, goToNext20pages, goToPrev20pages}}/>}
    </>
}