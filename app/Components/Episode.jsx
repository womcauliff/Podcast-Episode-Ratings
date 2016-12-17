import React from 'react'
import NavLink from './NavLink.jsx'
import APIUtils from './utils/APIUtils.jsx'

export default React.createClass({
	getInitialState: function(){
    return {
      episode : ""
    }
  },
  componentDidMount: function()  {
  	console.log(this.props.params.ep_id);
    APIUtils.getEpisode(this.props.params.ep_id)
    .then((response)=>{
      this.setState({
      	episode : response.data
      })
    });
  },
  render() {
    return (
      <div className="container">
        <h1>{this.state.episode.title}</h1>
        {this.props.children}
      </div>
    )
  }
});