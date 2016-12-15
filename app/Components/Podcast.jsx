import React from 'react'

export default React.createClass({
	/*fetch(this.props.params.url_title).then(
	set the results to the state of this component

	use lifecycle update this component with a list of child components for episodes

	)

	*/
  render() {
    return (
      <div>
        <h2>{this.props.params.url_title}</h2>
      </div>
    )
  }
})
