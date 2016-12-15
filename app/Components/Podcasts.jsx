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
        {podcast.title} - {podcast.description}
        </NavLink>
      </li>)
    });
    return (
      <div>
        <h2>Podcasts</h2>
        <pre><code>{JSON.stringify(this.state)}</code></pre>
        <ul>
          {podastNavLinks}
        </ul>
        {this.props.children}
      </div>
    )
  }
})
