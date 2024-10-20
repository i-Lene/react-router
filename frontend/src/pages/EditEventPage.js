import { useRouteLoaderData } from "react-router";
import EventForm from "../components/EventForm";
function EditEventPage() {
  const data = useRouteLoaderData("details");
  const event = data.event;
  return <EventForm event={event} method="patch" />;
}

export default EditEventPage;
