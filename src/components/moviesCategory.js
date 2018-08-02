import React from 'react';
import $ from 'jquery';
import axios from 'axios';
window.jQuery = $;
window.$ = $;
import {
	Link
  } from 'react-router-dom';	

class Movies extends React.Component{
	render(){
		let bodyText = this.props.overview.substr(0, 120);
		bodyText = bodyText.substr(0, bodyText.lastIndexOf(" ")).concat("...");
		
		return(
				<div className="movieBoxInfo">
					<div className="infoWrapper">
						<p className="boxTitle">{this.props.title}</p>
						<p className="boxRating">Rating: {this.props.rating}</p>
						<p className="boxOverview">{bodyText}</p>
					</div>
				</div>
			);
	}
}

export default class MovieCategory extends React.Component{
constructor(props){
		super(props);
		this.state={
			movieList: []
		}
	}
  	componentDidMount(){
		this.fetchMovie();
	}
	render(){
		console.log(this.props.movieList);
		let resultLink = this.state.movieList.slice(0,5);
		const upcomingMovieList = resultLink.map((movies) => {
			const backgroundImage = {
				backgroundImage: `url(https://image.tmdb.org/t/p/w300/${movies.backdrop_path})`,
				backgroundPosition: "center",
				backgroundRepeat: "no-repeat",
				width: "220px",
				height: "220px"	
			};
			return(
			<li className="movieCategoryList">
				
				<Link to={`/movie/${movies.id}`} className="moviesBox" style={backgroundImage}><Movies 
					title={movies.title}
					overview={movies.overview}
					rating={movies.vote_average} />
				</Link>
				
			</li>
			);
		});
		return(
				<div>
					<ul className="cfix">{upcomingMovieList}</ul>
				</div>
			);
	}
  
  	fetchMovie(){
  		const categoryName = this.props.url; 
  		const apiKey = "ff9d34ddaaebff2b1a6100d54346c1a7";
		let movieLink = "https://api.themoviedb.org/3/movie/" 
						+ categoryName + "?api_key=" + apiKey + "&language=en-US&page=1";
		
		/**fetch(movieLink).
		then((Response) => Response.json()).
		then((findmovie) => {
			this.setState({movieList: findmovie.results});
		});**/
		axios({
			method: 'GET',
			url: movieLink
		}).then( (findmovie) => {
			this.setState({movieList: findmovie.data.results});
		}).catch(function(error){
			console.log(error);
		});
	}
}