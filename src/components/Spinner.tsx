import { useUIContext } from "../context/UIContext";
import "./Spinner.scss";

function Spinner() {
	const { isLoading, loadingText } = useUIContext();

	return (
		<>
			{isLoading ? (
				<div className="Spinner">
					<i className="fa-solid fa-book-skull fa-spin fa-8x text-slate-50"></i>
					<h1 className="text-slate-50 text-3xl mt-8 font-extrabold uppercase tracking-widest">
						{loadingText}
					</h1>
				</div>
			) : null}
		</>
	);
}

export default Spinner;
