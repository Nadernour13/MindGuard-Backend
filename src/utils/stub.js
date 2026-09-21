const { failure } = require("./response");

// Placeholder for routes that are defined (so Flutter can code against them)
// but not implemented yet. Swap this out with the real controller function.
function notImplemented(routeName) {
  return (req, res) => failure(res, 501, `${routeName} is not implemented yet`);
}

module.exports = { notImplemented };
