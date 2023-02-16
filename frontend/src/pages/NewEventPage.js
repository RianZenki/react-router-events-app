import EventForm from "../components/EventForm";

export const NewEventPage = () => {
	return (
		<>
			<h1>Register a new event</h1>
			<EventForm method="POST" />
		</>
	);
};
