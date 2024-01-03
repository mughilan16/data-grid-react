import { useQuery } from "react-query";
import { addItem, addItemRequest, getItems } from "./api";

export function useGetItems() {
    return useQuery({
        queryKey: ["items"],
        queryFn: () => getItems()
    })
}

export function useAddItem(item: addItemRequest | undefined) {
    return useQuery({
        queryKey: ["add-item", item],
        queryFn: () => addItem(item)
    })
}