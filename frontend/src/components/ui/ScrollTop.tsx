export default function ScrollTop({onScrollTop}:{onScrollTop: () => void}) {
    return ( 
        <div onClick={onScrollTop}>  
            <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 8">
                <path stroke="#056cf2" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7 7.674 1.3a.91.91 0 0 0-1.348 0L1 7"/>
            </svg>
        </div> )
}