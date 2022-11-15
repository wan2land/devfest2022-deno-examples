"use strict";

module.exports.hello = async (event) => {
  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message:
        event.queryStringParameters && event.queryStringParameters.message ||
        null,
      version: "v1",
    }),
  };
};
