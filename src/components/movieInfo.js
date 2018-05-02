import React from 'react';
import $ from 'jquery';
window.jQuery = $;
window.$ = $;

class ShowInfo extends React.Component{
	constructor(props){
		super(props);
		this.state={
			bgColor: ""
		}
	}
	render(){
		let formatRevenue = this.props.revenue.toLocaleString();
		let listOfCast = this.props.cast.slice(0,5).map( (cast) => {
			return(
				<li>	
					<img src={`https://image.tmdb.org/t/p/w154/${cast.profile_path}`} />
					<p className="name">{cast.name}</p>
					<p>{cast.character}</p>
				</li>
			);
		});
		let listOfCrew = this.props.crew.slice(0,4).map( (crew) => {
			return(
				<li>
					<p className="name">{crew.name}</p>
					<p>{crew.job}</p>
				</li>
			);
		});

		const backgroundImage = {
			backgroundImage: `url(https://image.tmdb.org/t/p/original/${this.props.background})`,
			backgroundSize: 'cover',
			height: "100%"
		};
		return(
		<div>
			<div style={backgroundImage} colorify-main-color>
				<div className='movieInfoWrapper cfix'>
					<img colorify id="moviePoster" src={`https://image.tmdb.org/t/p/w342/${this.props.poster}` } />
					<div className="columnLeft information">
						<h2>{this.props.title}</h2>
						<p className="tagline">{this.props.tagline}</p>
						<p>{this.props.body}</p>
						<div className="moreInfo cfix">
							<div className="columnLeft movieInfoColumn">
							<div className="info">
									<p>Rating: {this.props.rating}</p>
								</div>
								<div className="info">
									<img src="/images/dollar.png" title="Revenue"/>
									<p>${formatRevenue}</p>
								</div>
							</div>
							<div className="columnLeft movieInfoColumn">
								<div className="info">
									<img src="/images/clock.png" title="Runtime"/>
									<p>{this.props.runtime}mins</p>
								</div>
								<div className="info">
									<img src="/images/calendar.png" title="Release Date"/>
									<p>{this.props.releaseDate}</p>
								</div>
							</div>
						</div>
						<div>
							<h3>Featured Crew</h3>
							<ul className="crew">
								<div className="cfix">
									{listOfCrew}
								</div>
							</ul>
						</div>
					</div>
				</div>
			</div>
			<div className="movieInfoWrapper">
			<h3>Starring</h3>
			<ul className="cast">
				<div className="cfix">
					{listOfCast}
				</div>
			</ul>
			</div>
		</div>
		);
	}
}

export default class MovieInfo extends React.Component{
	constructor(props){
		super(props);
		this.state={
			movieList: []
		}
	}
	componentDidMount(){
		const { match: { params } } = this.props
		this.fetchURL(params.movieId);
	}
	componentDidUpdate(prevProps){
		const { match: { params } } = this.props;
		if(prevProps.match.params.movieId !== this.props.match.params.movieId ){
		console.log(params.movieId)
		this.fetchURL(params.movieId);
		}
	}
	render(){
		console.log(this.state.movieList);
		const movieItems = this.state.movieList.map((movie) => {				
			return(
			//put comment here			
				<div className="comment-list">
					<ShowInfo
						title={movie.title}
						body={movie.overview}
						poster={movie.poster_path}
						rating={movie.vote_average}
						runtime={movie.runtime}
						revenue={movie.revenue}
						releaseDate={movie.release_date}
						cast={movie.credits.cast}
						crew={movie.credits.crew}
						tagline={movie.tagline}
						background={movie.backdrop_path}
						/>
				</div>
			);
			
		});
		return(
			<div>
				{movieItems}
			</div>
		);
	}
	fetchURL(url){
		const apiKey = "ff9d34ddaaebff2b1a6100d54346c1a7";
		const newMovieLink = `https://api.themoviedb.org/3/movie/
							${url}?api_key=${apiKey}
							&append_to_response=credits,videos`;
		console.log(newMovieLink);
		$.ajax({
			method: 'GET',
			url: newMovieLink,
			dataType: "jsonp",
			success: (movieList) => {
				//create new movie link here
				this.setState({movieList: [movieList]});
			}
		});
		
	}

}