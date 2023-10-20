import React, { useState,useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useWindowSize } from "../../Hook/windowSize";
import {
	faSquareCaretUp,
	faSquareCaretDown,
} from "@fortawesome/free-solid-svg-icons";
const CodeInput = ({ testInput, setTestInput, setToggled }) => {
	const [toggleInputBar, setToggleInputBar] = useState(true);
	const {width} = useWindowSize();
	useEffect(() => {
		if(width<768){
			setToggleInputBar(false);
		}else{
			setToggleInputBar(true);
		}
	}, [width])
	
	return (
		<div className={`border-sm d-flex flex-column justify-content-end w-50 w-md-100 bg-gray-100 h-64 ${
			toggleInputBar ? 'h-md-16' : 'h-md-33'
		}`}>
			<button
				className="d-flex ml-0 align-items-center bg-gray-200 pt-2 pr-2 rounded-md fs-5 justify-content-center w-16"
				onClick={() => {
					setToggled(!toggleInputBar);
					setToggleInputBar(!toggleInputBar);
				}}>
				stdin{" "}
				<FontAwesomeIcon
					icon={toggleInputBar ? faSquareCaretUp : faSquareCaretDown}
					size="xs"
					className="ml-1"
				/>
			</button>
			<textarea
				name=""
				id=""
				className={`p-2 outline-none border-0 bg-white ${toggleInputBar ? "d-none" : ""}`}
				cols="30"
				rows="15"
				placeholder=""
				value={testInput}
				onChange={(e) => setTestInput(e.target.value)}></textarea>
		</div>
	);
};

export default CodeInput;
