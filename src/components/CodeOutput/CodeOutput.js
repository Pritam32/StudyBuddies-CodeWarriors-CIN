import React from "react";
import { getOutput } from "../../utils/codeOutput.utils";

const CodeOutput = ({ output, toggled, status }) => {
	return (
		<div
			className={`d-flex flex-column overflow-hidden bg-gray-100 p-4 h-64 w-50 ${toggled ? 'h-100' : 'h-75'}`}>
			<label className="d-flex align-items-center text-lg border-bottom border-2 border-gray-200 pb-4 text-gray-600">
				Output:{" "}
				{status && (
					<span
						className={`ml-2 d-inline-block w-28 font-weight-bold text-center rounded-circle text-white p-1 ${
  status === "Running" ? "bg-primary" : "bg-success"
}`}>
						{status}
					</span>
				)}
			</label>
			<div className="w-100 h-100 d-flex flex-column p-2 overflow-auto">
				 {output ? <>{getOutput(output)}</> : null}
			</div>
		</div>
	);
};

export default CodeOutput;
