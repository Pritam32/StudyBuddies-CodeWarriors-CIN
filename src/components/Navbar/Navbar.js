import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlayCircle } from "@fortawesome/free-solid-svg-icons";
import LanguageDropdown from "../Dropdowns/LanguageDropdown";
import ThemeDropdown from "../Dropdowns/ThemeDropdown";
import { checkStatus, submitCode } from "../../api";

const Navbar = ({
	language,
	setLanguage,
	setTheme,
	theme,
	setOutput,
	setStatus,
	testInput,
	code
}) => {
	const handleSubmit = async () => {
		setStatus("Running");
		const formData={
			language_id: language.id,
      source_code: btoa(code),
      stdin: btoa(testInput),
		}

    try {
      const { data } = await submitCode(formData)
      const { token } = data;
      const {data: output, success, err}  = await checkStatus(token);
      
      if(success) {
        setOutput(output);
        setStatus("Finished");
      }else{
        console.log(err);
        setStatus("Error");
      }
    }
    catch(err){
      let error = err.response ? err.response.data : err;
      console.log(error);
    }
	};

	return (
	
  <div className="row row-cols-1 m-1">

  <button className="btn btn-success border border-success border-1 text-white rounded w-32 btn-sm btn-md"
        style={{ backgroundColor: "#5cb85c" }} onClick={handleSubmit}>
				
				<FontAwesomeIcon
					icon={faPlayCircle}
					className="mr-2"
					color="white"
					size="sm"
				/>
				<span>Run Code</span>
			</button>
			<div className="row  row-cols-2 g-2">
				<LanguageDropdown language={language} setLanguage={setLanguage}/>
				<ThemeDropdown theme={theme} setTheme={setTheme} />
			</div>
			</div>
		
	);
};

export default Navbar;
