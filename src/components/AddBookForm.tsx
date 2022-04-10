import React, { useState } from "react";
import { useBooksContext } from "../context/BooksContext";
import "./AddBookForm.scss";
import { useForm } from "react-hook-form";
import { addBook } from "../context/BooksActions";
import { TAddBookForm, TBook } from "../types";
import { toast } from "react-toastify";
import { useUIContext } from "../context/UIContext";

function AddBookForm() {
	const { dispatch } = useBooksContext();
	const { setIsLoading, setLoadingText } = useUIContext();
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
		setValue,
	} = useForm<TAddBookForm>({
		defaultValues: {
			title: "",
			author: "",
		},
	});

	const [isActive, setIsActive] = useState(false);

	async function onSubmit(data: TBook) {
		setLoadingText("Adding Book...");
		setIsLoading(true);
		const newBook = {
			title: data.title.trim(),
			author: data.author.trim(),
		};

		const book = await addBook(newBook as TBook);
		dispatch({ type: "ADD_BOOK", payload: book });
		toast.success(`Successfully added ${book.title} to your shelve!`);
		reset();
		setIsLoading(false);
	}

	return (
		<div className="flex flex-col items-center mx-5 max-w-screen-md w-10/12">
			<h1
				className="  text-xl font-semibold uppercase tracking-wide cursor-pointer text-slate-50 bg-purple-700 py-3 px-5 rounded-lg"
				onClick={() => {
					setIsActive(!isActive);
				}}
			>
				Add Book{" "}
				<i
					className={`fa-solid ml-3 ${
						isActive ? "fa-chevron-up" : "fa-chevron-down"
					}`}
				></i>
			</h1>
			{isActive && (
				<form
					className="add-form"
					onSubmit={handleSubmit((data) => onSubmit(data as TBook))}
				>
					<div className="flex flex-col mb-3 w-full">
						<input
							className="edit text-center"
							type="text"
							placeholder="Book Title"
							{...register("title", {
								onBlur: (e: React.FormEvent) => {
									const target = e.target as HTMLInputElement;
									setValue("title", target.value.trim());
								},
								required: "Please provide a book title",
								minLength: {
									value: 3,
									message:
										"The title needs at least 3 characters.",
								},
							})}
						/>
						{errors.title && <span>{errors.title.message}</span>}
					</div>
					<div className="flex flex-col w-full">
						<input
							className="edit text-center"
							type="text"
							placeholder="Author Name"
							{...register("author", {
								onBlur: (e: React.FormEvent) => {
									const target = e.target as HTMLInputElement;
									setValue("author", target.value.trim());
								},
								required: "Please provide an author name.",
								minLength: {
									value: 3,
									message:
										"The author needs at least 3 characters.",
								},
							})}
						/>
						{errors.author && <span>{errors.author.message}</span>}
					</div>

					<button type="submit" className="block">
						<i className="fa-solid fa-plus mr-2"></i>Add Book
					</button>
				</form>
			)}
		</div>
	);
}

export default AddBookForm;
