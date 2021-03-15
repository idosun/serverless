/**
 *******************************************************************************
 * File name   : handled_exception.js
 * Description : This file contains code that instruments handled exception.
 *
 *******************************************************************************
 **/

// Import the Sentry module.
const Sentry = require("@sentry/serverless");

Sentry.AWSLambda.init({
  dsn: 'https://b1b587b16c334d40934eb9a1602b211d@o87286.ingest.sentry.io/5522728',
  tracesSampleRate: 1.0,

  request_bodies: "always"
});

let env_value = process.env.ENV_VAR; // Fetching value of Environment variable set in Lambda function.

Sentry.configureScope(function (scope) {
  scope.setLevel("error");
  scope.setTag("custom_tag", "custom_tag_value");
  scope.setExtra("extra_context", "extra_context_value");
  scope.setExtra("ENV_VAR", env_value);
});

// below is the faulty code, undefinedFun() function is not exist.

exports.handler = Sentry.AWSLambda.wrapHandler(async (event, context, callback) => {
  try {
    undefinedFunCall(); // call undefined function.
  } catch (e) {
    Sentry.captureException(e); // Capture the exception in the Sentry dashboard.
  }

  const response = {
    statusCode: 200,
    body: "Handled exception",
  };

  callback(null, response); 
 
},{
  //Sentry reports timeout warning when the function is within 500ms of it's execution time. 
  captureTimeoutWarning: true,
  timeoutWarningLimit: 300
  //flushTimeout: 2500  <-- Sentry holds the thread for up to 2 seconds to report errors.  
});
