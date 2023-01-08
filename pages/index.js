import { useEffect, useState } from "react";
import CardsGrid from "../components/Home/CardsGrid";
import { DUMMY_ANNOUNCES } from "../data/data";
import SearchBar from "../components/Home/SearchBar";
import { toast } from "react-toastify";
import PagesPagination from "../components/Home/PagesPagination";
import cookie from "js-cookie";
import axios from "axios";
import annonceCrud from "../utils/services/annonce";

const wait_function_test = async function test() {
	console.log("start timer");
	await new Promise((resolve) => setTimeout(resolve, 1000));
	console.log("after 1 second");
};

export default function Explore({ toasting }) {
	const [pageCount, setPageCount] = useState(1);
	const [announces, setAnnounces] = useState(DUMMY_ANNOUNCES);
	const [maxPages, setMaxPages] = useState(1);
	const [lastSearch, setLastSearch] = useState("");
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		setIsLoading(true);
		setTimeout(() => {
			setIsLoading(false);
		}, "1500");

		// axios
		// 	.get(`http://192.168.145.12:5000/annonces?page=${pageCount}`)
		// 	.then((res) => {
		// 		setAnnounces(res.data.data);
		// 		setMaxPages(res.data.max_pages);
		// 		console.log(res.data);
		// 	})
		// 	.catch((err) => {
		// 		console.log(err);
		// 	});
	}, [pageCount]);

	if (toasting === "true") {
		toast.error("vous devez entre authentifiee");
	}

	//search bar handler :

	const searchHandler = (e, searchText) => {
		e.preventDefault();
		// axios
		// 	.get(
		// 		`http://192.168.145.12:5000/annonces/search?q=${searchText}&page=${pageCount}`
		// 	)
		// 	.then((res) => {
		// 		if (res.data.data) {
		// 			setAnnounces(res.data.data);
		// 			setPageCount(1);
		// 			setLastSearch(searchText);
		// 		}
		// 		setMaxPages(res.data.max_pages);

		// 		console.log(res.data);
		// 	})
		// 	.catch((err) => {
		// 		console.log(err);
		// 	});
	};

	const filterHandler = (e, filterData) => {
		e.preventDefault();
		// axios
		// 	.get(
		// 		`http://192.168.145.12:5000/annonces/search?q=${lastSearch}&min_date=${filterData.dateDebut}&max_date=${filterData.dateFin}&wilaya=${filterData.wilaya}&commune=${filterData.commune}&type=${filterData.typeAnnonce}&page=${pageCount}`
		// 	)
		// 	.then((res) => {
		// 		setAnnounces(res.data.data);
		// 		setMaxPages(res.data.max_pages);
		// 		console.log(res.data);
		// 	})
		// 	.catch((err) => {
		// 		console.log(err);
		// 	});
	};

	// pages navigation handlers :

	const nextPageHandler = (e) => {
		e.preventDefault();
		if (pageCount < maxPages) {
			setPageCount((prevPageCount) => prevPageCount + 1);
			window.scrollTo({
				top: 0,
				behavior: "smooth",
			});
		}
	};
	const previousPageHandler = (e) => {
		e.preventDefault();
		if (pageCount > 1) {
			setPageCount((prevPageCount) => prevPageCount - 1);
			window.scrollTo({
				top: 0,
				behavior: "smooth",
			});
		}
	};
	const selectPageHandler = (e, num) => {
		e.preventDefault();
		if (num != pageCount) {
			setPageCount(num);
			window.scrollTo({
				top: 0,
				behavior: "smooth",
			});
		}
	};

	return (
		<div className="flex flex-col justify-center  mx-4 sm:mx-10 md:mx-[3vw] lg:mx-[10vw]">
			<div className="my-4 relative z-1">
				<h1 className="font-bold text-[32px]">Explorer nos annonces</h1>
				{/* Search Bar + Filter Bar */}
				<SearchBar onSearch={searchHandler} onFilter={filterHandler} />

				{/*Cards*/}
				<CardsGrid annouces={announces} isLoading={isLoading} />
				{/*Cards pages slider*/}
				<PagesPagination
					maxPages={maxPages}
					currentPage={pageCount}
					onNextPageClick={nextPageHandler}
					onPreviousPageClick={previousPageHandler}
					onSelectionPageClick={selectPageHandler}
				/>
			</div>
		</div>
	);
}

export async function getServerSideProps(ctx) {
	// const toasting = req.headers['toasting'] || false
	const toasting = ctx.query.login || false;
	console.log(toasting);

	return {
		props: { toasting },
	};
}
