import React from 'react';
import MovieCategory from './moviesCategory.js';

export default class HomePage extends React.Component{
	render(){
		return(
			<div className="centerWrapper">
				<h2>Upcoming</h2>
				<MovieCategory url="upcoming"  />
				<h2>Popular</h2>
				<MovieCategory url="popular"  />		
				<h2>Top Rated</h2>
				<MovieCategory url="top_rated"  />
			</div>
		);
	}
}