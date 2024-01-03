import { useQuery } from "react-query";
import { getItems } from "./api";

export function useGetItems() {
    return useQuery({
        queryKey: ["items"],
        queryFn: () => getItems()
    })
}