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

class UpcomingMovies extends React.Component{
	render(){
		return(
				<div></div>
			);
	}
}

class MovieApp extends React.Component{
	constructor(props){
		super(props);
		this.state={
			listOfComments: [],
			showComments: false
		}
	}
	render(){
		return(
				<div>
          <h2 className="title">Movies</h2>
          <SearchBar />
          <UpcomingMovies />
          		</div>
          
			);
	}

}

ReactDOM.render(<MovieApp  />, document.getElementById("main"));