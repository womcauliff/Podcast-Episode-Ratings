import React from 'react'
import NavLink from './NavLink.jsx'

export default React.createClass({
  render() {
    return (
      <div>
        <ul role="nav">
          <li><NavLink to="/about">About</NavLink></li>
          <li><NavLink to="/podcast">Podcasts</NavLink></li>
        </ul>
        {this.props.children}
      </div>
    )
  }
})
