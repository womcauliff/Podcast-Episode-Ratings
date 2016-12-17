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

	getPodcast: function(podcast_url_title) {
		return fetch("/api/podcast/" + podcast_url_title, {
			method: "GET",
			credentials: "same-origin"
		}).then(function(response){
		  response.status     //=> number 100–599
		  response.statusText //=> String
		  response.headers    //=> Headers
		  response.url        //=> String

		  return response.json()
		}, function(error) {
			error.message //=> String
		});
	},

	getEpisode: function(episode_id) {
		console.log("APIUtils episode_id: " + episode_id);
		return fetch("/api/episode/" + episode_id, {
			method: "GET",
			credentials: "same-origin"
		}).then(function(response) {
			response.status     //=> number 100–599
		  response.statusText //=> String
		  response.headers    //=> Headers
		  response.url        //=> String

			return response.json()
		}, function(error) {
			error.message
		});
	}
}

export { APIUtils as default };