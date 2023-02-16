import { useLoaderData, json, defer, Await } from "react-router-dom";
import { Suspense } from "react";

import EventsList from "../components/EventsList";

export const EventsPage = () => {
	const data = useLoaderData();

	return (
		<Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
			<Await resolve={data.events}>
				{(loadedEvents) => <EventsList events={loadedEvents} />}
			</Await>
		</Suspense>
	);
};

const loadEvents = async () => {
	const response = await fetch("http://localhost:8080/events");

	if (!response.ok) {
		// return { isError: true, message: "Could not fetch events" };
		// throw new Response(
		// 	JSON.stringify({ message: "Could not fetch events" }),
		// 	{ status: 500 }
		// );

		// create an error and throw it. method native from react-router
		return json(
			{ message: "Could not fetch events" },
			{
				status: 500,
			}
		);
	} else {
		const resData = await response.json();
		return resData.events
	}
};

export const loader = () => {
	return defer({
		events: loadEvents(),
	});
};
