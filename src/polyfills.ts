import "core-js/es6";
import "core-js/es7/reflect";
require("zone.js/dist/zone");
require("./assets/js/promise.js");
require("./assets/js/fetch.js");

if (process.env.ENV === "production") {
  // Production
} else {
  // Development and test
  Error["stackTraceLimit"] = Infinity;
  require("zone.js/dist/long-stack-trace-zone");
}
