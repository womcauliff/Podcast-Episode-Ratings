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
				<div className="row">
					<div className="col-md-12">
						<div className="panel panel-default">
							<div className="panel-heading">
								<h1>{this.state.episode.title}</h1>
							</div>
							{this.props.children}
						</div>
					</div>
				</div>
			</div>
    )
  }
});