import { useRouteLoaderData } from "react-router-dom";

import EventForm from "../components/EventForm";

export const EditEventPage = () => {
	const data = useRouteLoaderData("event-detail");

	return (
		<>
			<h1>Edit Event Page</h1>
			<EventForm event={data.event} method="PATCH" />
		</>
	);
};
