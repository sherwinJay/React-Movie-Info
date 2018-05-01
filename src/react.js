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
	render(){
		return(	
			<Router>
				<div>
					<AppHeader/>	
					<Switch>	
						<Route exact path="/" component={HomePage} />
						<Route path="/movie/:movieId" component={MovieInfo} />	
					</Switch>
				</div>
			</Router>		 
		);
	}
}
ReactDOM.render(<MovieApp  />, document.getElementById("main"), console.timeEnd("app"));
