import {
	useRouteLoaderData,
	json,
	redirect,
	defer,
	Await,
} from "react-router-dom";
import { Suspense } from "react";

import EventsList from "../components/EventsList";

import EventItem from "../components/EventItem";

export const EventDetailPage = () => {
	const { event, events } = useRouteLoaderData("event-detail");

	return (
		<>
			<Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
				<Await resolve={event}>
					{(loadedEvent) => <EventItem event={loadedEvent} />}
				</Await>
			</Suspense>
			<Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
				<Await resolve={events}>
					{(loadedEvents) => <EventsList events={loadedEvents} />}
				</Await>
			</Suspense>
		</>
	);
};

const loadEvent = async (id) => {
	const response = await fetch(`http://localhost:8080/events/${id}`);

	if (!response.ok) {
		json(
			{ message: "Could not fetch details for selected event" },
			{ status: 500 }
		);
	} else {
		const data = await response.json();
		return data.event;
	}
};

const loadEvents = async () => {
	const response = await fetch("http://localhost:8080/events");

	if (!response.ok) {
		return json(
			{ message: "Could not fetch events" },
			{
				status: 500,
			}
		);
	} else {
		const resData = await response.json();
		return resData.events;
	}
};

export const loader = async ({ request, params }) => {
	const id = params.eventId;

	return defer({
		event: await loadEvent(id),
		events: loadEvents(),
	});
};

export const action = async ({ params, request }) => {
	const eventId = params.eventId;
	const response = await fetch("http://localhost:8080/events/" + eventId, {
		method: request.method,
		action: "",
	});

	if (!response.ok) {
		throw json(
			{ message: "Could not delete event." },
			{
				status: 500,
			}
		);
	}
	return redirect("/events");
};
