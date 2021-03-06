import React from 'react'
import NavLink from './NavLink.jsx'
import APIUtils from './utils/APIUtils.jsx'

export default React.createClass({
  getInitialState: function(){
    return {
      allPodcasts: []
    }
  },
  componentDidMount: function()  {
    APIUtils.getAllPodcasts().then((response)=>{
      this.setState({
        allPodcasts : response.data
      })
    });
  },
  render() {
    var podastNavLinks = this.state.allPodcasts.map(function(podcast, i) {
      return (<li key={i}>
        <NavLink to={`/podcast/${podcast.url_title}`}>
        {podcast.title}
        </NavLink>
      </li>)
    });
    return (
      <div className="container">
       <div className="row">
          <div className="col-md-12">
            <div className="panel panel-default">
              <div className="panel-heading">
                <h1>Podcasts</h1>
              </div>
              <div className="panel-body">
                <ul>
                  {podastNavLinks}
                </ul>
                {this.props.children}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
})
