import PageContent from "../components/PageContent";
import { useRouteError } from "react-router";
function Error() {
  const error = useRouteError();
  let title = "Error Occourd";
  let message = "whoops ajaja";
  if (error.status === 500) {
    message = error.data.message;
  }
  return (
    <PageContent title={title}>
      <p>{message}</p>
    </PageContent>
  );
}

export default Error;
