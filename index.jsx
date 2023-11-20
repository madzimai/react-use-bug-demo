import { lazy, Suspense, use } from "react";
import { renderToReadableStream } from "react-dom/server";
import { AsyncLocalStorage } from "node:async_hooks";

const ssrContext = new AsyncLocalStorage();

function pushPromise(key) {
  const thisContext = ssrContext.getStore();
  if (!thisContext.has(key)) {
    thisContext.set(
      key,
      new Promise((resolve) =>
        setTimeout(() => resolve(`${key} resolved`), 500),
      ),
    );
  }
  return thisContext.get(key);
}

export function usePromise(key) {
  return use(pushPromise(key));
}

function App({ children }) {
  return (
    <html>
      <body>
        <div>{usePromise("app")}</div>
        <div>{children}</div>
      </body>
    </html>
  );
}

const Page = lazy(() => import("./page.jsx"));

export default {
  async fetch(request) {
    return ssrContext.run(new Map(), async () => {
      return new Response(await renderToReadableStream(
          <App>
            <Suspense>
              <Page />
            </Suspense>
          </App>
      ), {
        headers: new Headers([
          ["cache-control", "no-store, must-revalidate"],
          ["content-type", "text/html; charset=utf-8"],
        ]),
      });
    });
  },
};
