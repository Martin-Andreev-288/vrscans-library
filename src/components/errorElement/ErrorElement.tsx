import { useRouteError } from "react-router";

export default function ErrorElement() {
  const error = useRouteError();
  console.log(error);

  return <h4 className="font-bold text-4xl">there was an error</h4>;
}
