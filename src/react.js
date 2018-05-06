import React from 'react';
import ReactDOM from 'react-dom';
import {
	BrowserRouter as Router,
	Switch,
	Route // for later
  } from 'react-router-dom';	
import  AppHeader from './components/appHeader.js';
import  HomePage from './components/homepage.js';
import  MovieInfo from './components/movieInfo.js';

class MovieApp extends React.Component{
	componentDidMount(){
		var img = document.createElement('img');
		img.setAttribute('src', '/public/images/maxresdefault.jpg');
		
		img.addEventListener('load', function() {
			var vibrant = new Vibrant(img);
			var swatches = vibrant.swatches()
			for (var swatch in swatches)
				if (swatches.hasOwnProperty(swatch) && swatches[swatch])
					console.log(swatch, swatches[swatch].getHex())
		
			/*
			 * Results into:
			 * Vibrant #7a4426
			 * Muted #7b9eae
			 * DarkVibrant #348945
			 * DarkMuted #141414
			 * LightVibrant #f3ccb4
			 */
		});
	}
	render(){
		return(	
			<Router>
				<div>
					<AppHeader/>	
					<Switch>	
						<Route exact path="/React-Movie-Info" component={HomePage} />
						<Route path="/movie/:movieId" component={MovieInfo} />	
					</Switch>
				</div>
			</Router>		 
		);
	}
}
ReactDOM.render(<MovieApp  />, document.getElementById("main"), console.timeEnd("app"));
