import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { RootLayout } from "./pages/Root";
import { EventsLayout } from "./pages/EventsRoot";
import { HomePage } from "./pages/HomePage";
import { EventsPage, loader as eventsLoader } from "./pages/EventsPage";
import {
	EventDetailPage,
	loader as eventDetailLoader,
	action as deleteEventAction,
} from "./pages/EventDetailPage";
import { NewEventPage } from "./pages/NewEventPage";
import { EditEventPage } from "./pages/EditEventPage";
import { ErrorPage } from "./pages/Error";
import { action as manipulateEventAction } from "./components/EventForm";
import NewsletterPage, {
	action as newsletterAction,
} from "./pages/Newsletter";

const router = createBrowserRouter([
	{
		path: "/",
		element: <RootLayout />,
		errorElement: <ErrorPage />,
		children: [
			{ path: "", element: <HomePage /> },
			{
				path: "events",
				element: <EventsLayout />,
				children: [
					{ path: "", element: <EventsPage />, loader: eventsLoader },
					{
						path: "new",
						element: <NewEventPage />,
						action: manipulateEventAction,
					},
					{
						path: ":eventId",
						id: "event-detail",
						loader: eventDetailLoader,
						action: deleteEventAction,
						children: [
							{
								path: "",
								element: <EventDetailPage />,
							},
							{
								path: "edit",
								element: <EditEventPage />,
								action: manipulateEventAction,
							},
						],
					},
				],
			},
			{
				path: "newsletter",
				element: <NewsletterPage />,
				action: newsletterAction,
			},
		],
	},
]);

function App() {
	return <RouterProvider router={router} />;
}

export default App;
