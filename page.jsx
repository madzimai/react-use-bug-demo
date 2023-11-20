import { use } from "react";
import { usePromise } from "./index.jsx";

export default function Page({ children }) {
  return (
    <div>
      {usePromise("page")}
    </div>
  );
}
