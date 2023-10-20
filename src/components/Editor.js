
import React, { useEffect, useState } from "react";
import CodeEditor from "./CodeEditor/CodeEditor";
import CodeOutput from "./CodeOutput/CodeOutput";
import CodeInput from "./CodeInput/CodeInput";
import Navbar from "./Navbar/Navbar";
import {boilerCodes} from "../boilerCodes";
import { useAuth0 } from "@auth0/auth0-react";
import LogoutButton from "./LogoutButton";

function Editor() {
	const [output, setOutput] = useState("");
	const [language, setLanguage] = useState({
		label: "JavaScript",
		value: "javascript",
		id:63,
		name: "JavaScript",
	});
	const { user, isAuthenticated, isLoading } = useAuth0();
	
	const [code, setCode] = useState(boilerCodes(language.id));
	const [toggled, setToggled] = useState(true);
	const [testInput, setTestInput] = useState("");
	const [theme, setTheme] = useState("vs-dark");
	const [status, setStatus] = useState(null);

	useEffect(() => {
		setCode(boilerCodes(language.id));
	}, [language]);
	
	return (
		<div>
		<nav className="navbar navbar-light navbar-expand-lg">
        <div className="container d-flex flex-row">
          <a className="navbar-brand" href="#">StudyBuddies</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarScroll">
            <ul className="navbar-nav m-auto my-2 my-lg-0 ">
              <li className="nav-item">
                <a className="nav-link active" href="/classes">StudyRoom</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/todos">Study Goals</a>
              </li>
              <li className="nav-item">
                <a className="nav-link " href="/whiteboard" >
                  Whiteboard
                </a>
               
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/ide">Code Editor</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/files">Files</a>
              </li>
			  {isAuthenticated?<LogoutButton/>:null}
            </ul>
           
          </div>
        </div>
      </nav>
		<div className="h-50 w-100">
  <div className="d-flex flex-md-row flex-column h-100 w-100">
    <div className="d-flex flex-column h-90 flex-md-grow-2 w-100">
					<Navbar
						setLanguage={setLanguage}
						language={language}
						setTheme={setTheme}
						theme={theme}
						setOutput={setOutput}
						setStatus={setStatus}
						testInput={testInput}
						code={code}
					/>

					<CodeEditor
						theme={theme}
						code={code}
						setCode={setCode}
						language={language}
					/>
				</div>
				<div className="d-flex flex-column  w-100">
					<CodeOutput output={output} toggled={toggled} status={status} />
					<CodeInput
						testInput={testInput}
						setTestInput={setTestInput}
						setToggled={setToggled}
					/>
				</div>
			</div>
		</div>
		</div>
	);
}

export default Editor;
