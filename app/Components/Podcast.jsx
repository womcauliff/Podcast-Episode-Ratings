import React from 'react'
import NavLink from './NavLink.jsx'
import APIUtils from './utils/APIUtils.jsx'

export default React.createClass({
	getInitialState: function(){
    return {
      podcast : {
      	title : "",
			  url_title : "",
			  link : "",
			  description : "",
			  language : ""
      },
      episodes : []
    }
  },
  componentDidMount: function()  {
    APIUtils.getPodcast(this.props.params.url_title)
    .then((response)=>{
      this.setState({
        podcast : {
        	title : response.data.title,
        	url_title : response.data.url_title,
        	link : response.data.link,
        	description : response.data.description,
        	language : response.data.language
        },
        episodes : response.data.episodes
      })
    });
  },
  render() {
  	var episodeNavLinks = this.state.episodes.map(function(episode, i) {
	    return (
	      <li key={i}>
	        <NavLink 
	        	to={`/podcast/${this.props.params.url_title}/${episode._id}`}>
	        	{episode.title}
	        </NavLink>
	      </li>)
    }.bind(this));
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="panel panel-default">
              <div className="panel-heading">
                <h1>{this.state.podcast.title}</h1>
                <p>{this.state.podcast.description}</p>
              </div>
              <div className="panel-body">
                <ul>
                  {episodeNavLinks}
                </ul>
              </div>
            </div>
            {this.props.children}
          </div>
        </div>
      </div>
    )
  }
})
