import React, { useEffect, useState } from "react";
import { BiChevronDown } from "react-icons/bi";
import { AiOutlineSearch } from "react-icons/ai";

const TypeSelector = ({ label, onChangeValue, open, onOpened }) => {
	const [inputValue, setInputValue] = useState("");
	const [selected, setSelected] = useState("");
	const items = ["Vente", "Echange", "Location", "Location vacances"];

	return (
		<div>
			<h2 className="mb-1 pl-2 text-[14px] font-normal text-purple relative">
				{label}
			</h2>
			<div className="w-32 sm:w-40 md:w-52 font-semibold max-h-[320px]  cursor-pointer relative">
				<div
					className={`text-[14px] sm:text-[16px] bg-white w-full p-2 flex items-center justify-between   placeholder-gray-500 rounded-md border-white ring-1 ring-gray-300 focus:outline-none 	 text-ellipsis ${
						!selected && "text-gray-500 "
					}`}
					onClick={() => {
						onOpened(!open);
					}}
				>
					{selected
						? selected?.length > 11
							? selected?.substring(0, 11) + "..."
							: selected
						: label}
					<BiChevronDown
						size={20}
						className={`${open && "rotate-180"} cursor-pointer`}
						color="#7065F0"
					/>
				</div>
				<ul
					className={`w-full  bg-white mt-2 overflow-y-auto absolute ${
						open
							? "max-h-60 ring-2 ring-gray-300 rounded z-40"
							: "max-h-0"
					} `}
				>
					<li
						className={`p-2 text-sm hover:bg-purple hover:text-white transition-all duration-200 cursor-pointer
            ${"" === selected?.toLowerCase() && "bg-purple text-white"}
            ${
				"Aucun filtre *".toLowerCase().startsWith(inputValue)
					? "block"
					: "hidden"
			}`}
						onClick={() => {
							setSelected("");
							onOpened(false);
							setInputValue("");
							onChangeValue("");
						}}
					>
						Aucun filtre *
					</li>
					{items?.map((item) => (
						<li
							key={item}
							className={` p-2 text-sm hover:bg-purple hover:text-white transition-all duration-200 cursor-pointer
            ${
				item.toLowerCase() === selected?.toLowerCase() &&
				"bg-purple text-white"
			}
            ${item?.toLowerCase().startsWith(inputValue) ? "block" : "hidden"}`}
							onClick={() => {
								if (
									item.toLowerCase() !==
									selected.toLowerCase()
								) {
									setSelected(item);
									onOpened(false);
									setInputValue("");
									onChangeValue(item);
								}
							}}
						>
							{item}
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};

export default TypeSelector;
