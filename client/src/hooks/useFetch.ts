import { useState, useEffect, useCallback } from 'react';

interface UseFetchResponse<T> {
    data: T | null;
    error: Error | null;
    loading: boolean;
    refetch: ()=> void;
}

export default function useFetch<T>(url: string, options?: RequestInit): UseFetchResponse<T> {
    // This useFetch hook is a custom hook that fetches data from the given url and returns the data, error, loading state and a refetch function.
    // In a production application we would likely want to replace this with a more robust solution like axios or SWR to support features such as caching.
    const [data, setData] = useState<T | null>(null);
    const [error, setError] = useState<Error | null>(null);
    const [loading, setLoading] = useState(false);

    const fetchData = useCallback(async () =>{
        const controller = new AbortController();
        const signal = controller.signal;
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(url, {...options, signal});
            if(!response.ok){
                throw new Error(`Error: ${response.statusText}`)
            };
            const result = await response.json();
            setData(result);
        } catch(err) {
            if((err as Error).name !== 'AbortError'){
                setError(err as Error);
            }
        } finally {
            setLoading(false);
        }

        return () => {
            controller.abort()
        }
    },[url, options]);

    useEffect(()=>{
       const abortFetch = fetchData();
       return () => {
        abortFetch.then((abort)=> abort()).catch(console.error);
       }
    }, [fetchData]);

    return {data, error, loading, refetch: fetchData}
}