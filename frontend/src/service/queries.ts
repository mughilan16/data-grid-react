import { useQuery } from "react-query";
import { getStudents } from "./api";

export function useGetItems() {
    return useQuery({
        queryKey: ["items"],
        queryFn: () => getStudents()
    })
}