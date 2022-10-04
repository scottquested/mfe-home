import { Header as Head, Button } from "components/Components";

import "./Body.scss";

const Body = () => {
	return (
		<div className="mfe-dashboard-body">
			This is the Home MFE
			<Head someText="A header component in Home" />
			<Button text="A button component in Home" />
		</div>
	);
};

export default Body;
