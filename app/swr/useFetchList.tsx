import useSWR from "swr"
import axios from "axios"

const fetcher = (url: string) => axios.get(url).then(res => res.data)


export default function useFetchList (segment: string) {
    const { data: info, error, isLoading } = useSWR(`http://localhost:3000/api/v1/${segment}`, fetcher)
   
    return {
      info,
      isLoading,
      isError: error
    }
  }