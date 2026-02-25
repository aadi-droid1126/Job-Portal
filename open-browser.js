import open from "open";
import waitOn from "wait-on";

(async () => {
  await waitOn({ resources: ["tcp:5173"] });
  await open("http://localhost:5173");
})();
