import axios from "axios"
import { Item } from "../types/Item"

const URL = "http://localhost:3001"
const axiosInstance = axios.create({baseURL: URL})

export type addItemRequest = {
  name: string,
  value: number
}

export type updateItemRequest = {
  id: number,
  updatedValue: number
}

export const addItem = async (newItem: addItemRequest) => {
  return ((await axiosInstance.post<Item>("/add-item", newItem)).data)
}

type getItemResponse = {
  items : Array<Item>
}

export const getItems = async () => {
  return ((await axiosInstance.get<getItemResponse>("/get-items")).data)
}

export const updateItem = async (updateItem: updateItemRequest) => {
  return ((await axiosInstance.post<Item>("/update-item", updateItem)).data)
}
