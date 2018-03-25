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
					<a href="#">{this.props.title}</a>
				</div>
			);
	}
}

class UpcomingMovies extends React.Component{
	render(){
		const upcomingMovieList = this.props.movieList.map((movies) => {
			<li>
				<Movies 
					title={movies.results.title}
					overview={movies.results.overview} />
			</li>
		});
		return(
				<div>
					<ul>upcomingMovieList</ul>
				</div>
			);
	}
}

class MovieApp extends React.Component{
	constructor(props){
		super(props);
		this.state={
			movieList: [],
			showComments: false
		}
	}
	componentWillMount(){
		this.ajaxCall();
	}
	render(){
		return(
				<div>
          <h2 className="title">Movies</h2>
          <SearchBar />
          <UpcomingMovies movieList={this.props.movieList} />
          		</div>
          
			);
	}
	getUpcomingMovie(){

	}
	getPopularMovie(){

	}
	//Not sure
	ajaxCall(movieType){
		let movieLink = "https://api.themoviedb.org/3/movie/" 
						+ "upcoming" + "?api_key=ff9d34ddaaebff2b1a6100d54346c1a7&language=en-US&page=1";
		$.ajax({
			method: 'GET',
			url: movieLink,
			success: (movieList) => {
				this.setState({movieList});
			}
		});
	}
}

ReactDOM.render(<MovieApp  />, document.getElementById("main"));
