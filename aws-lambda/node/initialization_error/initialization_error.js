/**
 *******************************************************************************
 * File name   : initialization_error.js
 * Description : This file contais code that instruments lambda initialization
 *               error
 * Reference   : What is initialization error for lambda function
 *               Lambda functions could fail not because of an error inside your
 *               handler code, but because of an error outside it. In this case,
 *               your Lambda function won’t be invoked.
 *******************************************************************************
 **/

// Import the Sentry module.
const Sentry = require("@sentry/serverless");

// Configure the Sentry SDK.
Sentry.init({
  dsn: 'https://b1b587b16c334d40934eb9a1602b211d@o87286.ingest.sentry.io/5522728',
  tracesSampleRate: 1.0,
  request_bodies: "always"
});

let env_value = process.env.ENV_VAR; // Fetching value of Environment variable set in Lambda function.

Sentry.configureScope(function (scope) {
  scope.setLevel("fatal");
  scope.setTag("custom_tag", "custom_tag_value");
  scope.setExtra("extra_context", "extra_context_value");
  scope.setExtra("ENV_VAR", env_value);
});

// calling an non-existing function this is an error before invoking lambda
// handler
// try {
//   notExistFunction();
// } catch (e) {
//   Sentry.captureException(e);
//   Sentry.flush(2000);
// }

exports.handler = Sentry.AWSLambda.wrapHandler(async (event, context, callback) => {

  notExistFunction();

});

//exports.handler = function (event, context, callback) {};
