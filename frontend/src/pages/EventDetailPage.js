import { Await, defer, json, redirect, useRouteLoaderData } from "react-router";
import EventItem from "../components/EventItem";
import EventsList from "../components/EventsList";
import { Suspense } from "react";

function EventDetailPage() {
  const { event, events } = useRouteLoaderData("details");

  return (
    <>
      <Suspense fallback={<p>Loading Event...</p>}>
        <Await resolve={event}>
          {(loaderEvent) => <EventItem event={loaderEvent} />}
        </Await>
      </Suspense>
      <Suspense fallback={<p>Loading Events...</p>}>
        <Await resolve={events}>
          {(loaderEvents) => <EventsList events={loaderEvents} />}
        </Await>
      </Suspense>
    </>
  );
}

export default EventDetailPage;

async function loadEvent(id) {
  const response = await fetch(`http://localhost:8080/events/${id}`);

  if (!response.ok) {
    throw json({ message: "Events out" }, { status: 500 });
  } else {
    const resdata = await response.json();
    return resdata.event;
  }
}

async function loadEvents() {
  const response = await fetch("http://localhost:8080/events");

  if (!response.ok) {
    throw json({ message: "Events out" }, { status: 500 });
  } else {
    const resdata = await response.json();
    return resdata.events;
  }
}

export async function loader({ request, params }) {
  const id = params.someId;
  return defer({
    event: await loadEvent(id),
    events: loadEvents(),
  });
}

export async function actionDeatils({ request, params }) {
  const id = params.someId;
  const response = await fetch("http://localhost:8080/events/" + id, {
    method: request.method,
  });

  if (!response.ok) {
    throw json({ message: "Events Action out" }, { status: 500 });
  } else {
    return redirect("/events");
  }
}
