const { API } = require("./src/constants");

module.exports = {
  client: {
    includes: ["./src/**/*{.tsx,.ts}"],
    tagName: "gql",
    service: {
      name: "uber-eats-backend",
      url: API,
    },
  },
};
