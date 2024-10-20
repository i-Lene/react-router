import { Await, defer, json, useLoaderData } from "react-router";
import EventsList from "../components/EventsList";
import { Suspense } from "react";

function EventsPage() {
  const { events } = useLoaderData();

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Await resolve={events}>
        {(loaderEvents) => <EventsList events={loaderEvents} />}
      </Await>
    </Suspense>
  );
}

export default EventsPage;

async function loadEvents() {
  const response = await fetch("http://localhost:8080/events");

  if (!response.ok) {
    throw json({ message: "Events out" }, { status: 500 });
  } else {
    const resdata = await response.json();
    return resdata.events;
  }
}

export function loader() {
  return defer({
    events: loadEvents(),
  });
}
