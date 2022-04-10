import axios from "axios";
import { TBook } from "../types";

const BASE_URL: string = import.meta.env.VITE_API_BASE_URL + "/books";

const books = axios.create({
	baseURL: BASE_URL,
	headers: {
		"Content-Type": "application/json",
	},
});

export async function fetchBooks() {
	const response = await books.get("/", { withCredentials: true });
	return response;
}

export async function editBook(id: string, updatedBook): Promise<void> {
	const response = await books.patch(`/${id}`, JSON.stringify(updatedBook), {
		withCredentials: true,
	});
	return response.data;
}

export async function deleteBook(id: number | string) {
	const book = await books.delete(`/${id}`, { withCredentials: true });
	return book.data.id;
}

export async function addBook(newBook: TBook): Promise<TBook> {
	const response = await books.post("/", JSON.stringify(newBook), {
		withCredentials: true,
	});
	return response.data;
}
