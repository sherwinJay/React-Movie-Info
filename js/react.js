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
				<div class="movieContainer">
					<p>{this.props.title}</p>
					<p>{this.props.overview	}</p>
				</div>
			);
	}
}

class UpcomingMovies extends React.Component{
	render(){
		let resultLink = this.props.movieList.slice(0,5);
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
				<a style={backgroundImage} >
				<Movies 
					title={movies.title}
					overview={movies.overview} />
				</a>
			</li>
			);
		});
		return(
				<div>
					<h2>Upcoming Movies</h2>
					<ul className="cfix">{upcomingMovieList}</ul>
				</div>
			);
	}
}

class MovieApp extends React.Component{
	constructor(props){
		super(props);
		this.state={
			movieList: [],
		}
	}
	componentDidMount(){
		this.ajaxCall();
	}
	render(){
		return(
				<div>
          <h2 className="title">Movies</h2>
          <SearchBar />
          <UpcomingMovies movieList={this.state.movieList}  />
          		</div>
          
			);
	}
	getUpcomingMovie(){

	}
	getPopularMovie(){

	}
	//Not sure
	ajaxCall(){
		let movieLink = "https://api.themoviedb.org/3/movie/" 
						+ "upcoming" + "?api_key=ff9d34ddaaebff2b1a6100d54346c1a7&language=en-US&page=1";
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

ReactDOM.render(<MovieApp  />, document.getElementById("main"));
