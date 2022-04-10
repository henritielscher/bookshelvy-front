import React, { FormEvent, useEffect, useState } from "react";
import { TAddBookForm, TBookListItemProps } from "../types";
import { useBooksContext } from "../context/BooksContext";
import { deleteBook, editBook } from "../context/BooksActions";
import "./ListItem.scss";
import { toast } from "react-toastify";
import { useUIContext } from "../context/UIContext";
import { useForm } from "react-hook-form";

function BookListItem({ book }: TBookListItemProps) {
	const { dispatch } = useBooksContext();
	const { setIsLoading, setLoadingText } = useUIContext();
	const {
		formState: { errors },
		handleSubmit,
		register,
		setValue,
		getValues,
		clearErrors,
	} = useForm<TAddBookForm>();

	useEffect(() => {
		setValue("author", book.author);
		setValue("title", book.title);
	}, []);

	const [isDisabled, setDisabled] = useState(true);
	const [currentName, setCurrentName] = useState("");
	const [currentAuthor, setCurrentAuthor] = useState("");

	function handleEditMode() {
		setCurrentName(getValues("title"));
		setCurrentAuthor(getValues("author"));
		setDisabled(!isDisabled);
	}

	function handleCancel() {
		clearErrors();
		setDisabled(true);
		setValue("title", currentName);
		setValue("author", currentAuthor);
	}

	async function onSubmit(data: any, event: React.FormEvent) {
		setLoadingText("Save Update...");
		setIsLoading(true);
		setDisabled(true);
		const updatedBook = {
			author: data.author,
			title: data.title,
		};
		await editBook(book._id, updatedBook);
		dispatch({ type: "UPDATE_BOOK", payload: updatedBook });
		toast.success(`Successfully updated ${updatedBook.title}.`);

		setIsLoading(false);
	}

	async function handleDelete() {
		setLoadingText("Deleting book...");
		setIsLoading(true);
		await deleteBook(book._id);
		dispatch({ type: "DELETE_BOOK", payload: book._id });
		toast.success("Successfully deleted your book.");
		setIsLoading(false);
	}

	return (
		<li className="BookListItem">
			<form
				className="flex flex-col justify-center items-center w-full"
				onSubmit={handleSubmit(onSubmit)}
			>
				<div className="flex content-between w-full items-center">
					<input
						placeholder="Title"
						className={`text-2xl text-center w-4/5 grow ${
							isDisabled ? "" : "edit"
						}`}
						type="text"
						disabled={isDisabled}
						{...register("title", {
							required: "Please provide a title.",
							minLength: {
								value: 3,
								message:
									"The title needs at least 3 characters.",
							},
						})}
					></input>
					{isDisabled ? (
						<i
							className="fa-solid fa-pen bg-yellow-400 cursor-pointer"
							onClick={handleEditMode}
						></i>
					) : (
						<i
							className="fa-solid fa-ban bg-orange-400 text-slate-50 cursor-pointer"
							onClick={handleCancel}
						></i>
					)}
				</div>
				{errors.title && <span>{errors.title.message}</span>}
				<div className="flex content-between w-full items-center">
					<input
						className={`text-lg italic text-center w-4/5 grow ${
							isDisabled ? "" : "edit"
						}`}
						type="text"
						placeholder="Author"
						disabled={isDisabled}
						{...register("author", {
							required: "Please provide the name of the author.",
							minLength: {
								value: 3,
								message:
									"The author needs at least 3 characters.",
							},
						})}
					/>
					<i
						className="fa-solid fa-trash text-slate-50 bg-red-600 cursor-pointer"
						onClick={handleDelete}
					></i>
				</div>
				{errors.author && <span>{errors.author.message}</span>}
				<input type="submit" hidden />
			</form>
		</li>
	);
}

export default BookListItem;
