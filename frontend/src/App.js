import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Homepage from "./pages/Homepage";
import EventsPage from "./pages/EventsPage";
import EventDetailsPage, { actionDeatils } from "./pages/EventDetailPage";
import NewEventPage from "./pages/NewEventPage";
import EditEventPage from "./pages/EditEventPage";
import RootLayout from "./pages/Root";
import EventsRoot from "./pages/EventsRoot";
import { loader as eventloader } from "./pages/EventsPage";
import Error from "./pages/Error";
import { loader as loaderdetais } from "./pages/EventDetailPage";
import { actionNew } from "./components/EventForm";
import NewsletterPage from "./pages/Newsletter";
import { action as newsletterAction } from "./pages/Newsletter";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Homepage />,
      },
      {
        path: "events",
        element: <EventsRoot />,
        children: [
          {
            index: true,
            element: <EventsPage />,
            loader: eventloader,
          },
          {
            path: ":someId",
            loader: loaderdetais,
            id: "details",
            children: [
              {
                index: true,
                element: <EventDetailsPage />,
                action: actionDeatils,
              },
              {
                path: "edit",
                element: <EditEventPage />,
                action: actionNew,
              },
            ],
          },
          {
            path: "new",
            element: <NewEventPage />,
            action: actionNew,
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
