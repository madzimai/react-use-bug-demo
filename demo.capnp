using Workerd = import "/workerd/workerd.capnp";

const demo :Workerd.Worker = (
  modules = [
    (name = "index.js", esModule = embed "dist/index.js"),
    (name = "page.js", esModule = embed "dist/page.js"),
  ],
  compatibilityDate = "2023-10-30",
  compatibilityFlags = ["nodejs_compat"],
);

const demoExample :Workerd.Config = (
  services = [(name = "demo", worker = .demo)],
  sockets = [
    ( name = "http", address = "*:8080", http = (), service = "demo" ),
  ],
);
