import React from 'react';

class Main extends React.Component {

	constructor(props) {
		super(props);
	}

	render(){
		return(
			<div className="container">
				<div className="row">
					<div className="jumbotron">
						<h1 className="text-center">Podcast Episode Ratings</h1>
						<p className="text-center"><em>Rate and review all of your favorite podcasts, episode by episode.</em></p>
					</div>
				</div>
			</div>
		)		
	}
}

export default Main;