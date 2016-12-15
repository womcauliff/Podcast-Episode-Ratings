// Include the axios package for performing HTTP requests (promise based alternative to request)
import 'whatwg-fetch';
import Promise from 'promise-polyfill'; 

// To add to window
if (!window.Promise) {
  window.Promise = Promise;
}

// Helper Functions (in this case the only one is runQuery)
var APIUtils = {

	getAllPodcasts: function() {
		return fetch("/api/podcast", {
		  method: "GET",
		  credentials: "same-origin"
		}).then(function(response) {
		  response.status     //=> number 100–599
		  response.statusText //=> String
		  response.headers    //=> Headers
		  response.url        //=> String

		  return response.json()
		}, function(error) {
		  error.message //=> String
		});
	},
}

export { APIUtils as default };