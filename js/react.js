class SearchBar extends React.Component{
	constructor(props){
		super(props);
		this.state={
			movies: ''
		}
	}
	render(){
		return(
				<form>
					<input type="text" />
				</form>
			);
	}
}

class Movies extends React.Component{
	render(){
		return(
				<div className="movieInfo">
					<p className="boxTitle">{this.props.title}</p>
					<p className="boxOverview">{this.props.overview	}</p>
				</div>
			);
	}
}

class UpcomingMovies extends React.Component{
constructor(props){
		super(props);
		this.state={
			movieList: []
		}
	}
  componentDidMount(){
		this.ajaxCall();
	}
	render(){
		let resultLink = this.state.movieList.slice(0,5);
		const upcomingMovieList = resultLink.map((movies) => {
			const backgroundImage = {
				backgroundImage: `url(http://image.tmdb.org/t/p/w185/${movies.backdrop_path})`,
				backgroundPosition: "center",
				backgroundRepeat: "no-repeat",
				width: "180px",
				height: "180px"	
			};
			return(
			<li className="movieList">
				<a href="#" className="moviesBox" style={backgroundImage} >
				<Movies 
					title={movies.title}
					overview={movies.overview.substr(0, 30)} />
				</a>
			</li>
			);
		});
		return(
				<div>
					<ul className="cfix">{upcomingMovieList}</ul>
				</div>
			);
	}
  
  ajaxCall(){
		let movieLink = "https://api.themoviedb.org/3/movie/" 
						+ this.props.url + "?api_key=ff9d34ddaaebff2b1a6100d54346c1a7&language=en-US&page=1";
		/**$.ajax({
			method: 'GET',
			url: movieLink,
			success: (movieList) => {
				console.log(movieList);
				this.setState({movieList: movieList.results});
			}
		});**/

		fetch(movieLink).
		then((Response) => Response.json()).
		then((findmovie) => {
			this.setState({movieList: findmovie.results});
		});
	}
  
}

class MovieApp extends React.Component{
	constructor(props){
		super(props);
		this.state={
			movieList: [],
		}
	}
	render(){
		return(
				<div>
          <h2 className="title">Movies</h2>
          <SearchBar />
	<h2>Upcoming</h2>
          <UpcomingMovies url="upcoming"  />
	<h2>Popular</h2>
	<UpcomingMovies url="popular"  />		
	<h2>Top Rated</h2>
	<UpcomingMovies url="top_rated"  />
          		</div>
          
			);
	}
	getUpcomingMovie(){

	}
	getPopularMovie(){

	}
	//Not sure
	

}

ReactDOM.render(<MovieApp  />, document.getElementById("main"));
