class CommentForm extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			newAuthor: '',
			newComment: ''
		}
		this.updateAuthor = this.updateAuthor.bind(this);
		this.updateComment = this.updateComment.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	render(){
		return(
				<form onSubmit={this.handleSubmit} >
					<input  type="text" placeholder="Name" 
							value={this.state.newAuthor} 
							onChange={this.updateAuthor} 
							className="input" 
					/>
					<textarea 	placeholder="Add Comment"  
								value={this.state.newComment} 
								onChange={this.updateComment} 
								className="input" 
					/>
					<input type="submit" value="Submit" />
				</form>	
				//<a href="#">Hide Comments</a>
			);
	}
	//custom methods
	updateAuthor(e){
		this.setState({
			newAuthor: e.target.value
		});
	}
	updateComment(e){
		this.setState({
			newComment: e.target.value
		});
	}
	handleSubmit(e){
		
		let author = this.state.newAuthor;
		let body = this.state.newComment;
		this.props.addNew(author, body);
		this.setState({
			newAuthor:'',
			newComment:''
		});
		e.preventDefault();	
	}
}



class CommentRemoveConfirmation extends React.Component {
  constructor() {
    super();

    this.state = {
      showConfirm: false
    };
  }

  render() {

    let confirmNode;

    if (this.state.showConfirm) {
      return (
        <span>
          <a href="" onClick={this._confirmDelete.bind(this)}>Yes </a> - or - <a href="" onClick={this._toggleConfirmMessage.bind(this)}> No</a>
        </span>
      );
    } else {
      confirmNode = <a href="" onClick={this._toggleConfirmMessage.bind(this)}>Delete comment?</a>;
    }

    return (
      <span>
        {confirmNode}
      </span>
    );
  }

  _toggleConfirmMessage(e) {
    e.preventDefault();

    this.setState({
      showConfirm: !this.state.showConfirm
    });

  }

  _confirmDelete(e) {
    e.preventDefault();
    this.props.onDelete();
  }
}


class Comments extends React.Component{
	render(){
		return(
			<div className="comment">
				<p className="comment-name">{this.props.author}</p>
				<p className="comment-body">{this.props.body}</p>
			</div>
			);
	}
}

class CommentLists extends React.Component{
	render(){


		const commentItems = this.props.listOfComments.map((comment) => {
				return(
			//put comment here
			<div className="comment-list">
				<Comments 
					author={comment.author} 
					body={comment.body} 
					id={comment.id} 
					key={comment.id} 
					onDelete={this.deleteComment.bind(this)}
				/>
				<div className="delete">
					<CommentRemoveConfirmation onDelete={this.handleDelete.bind(this)} />
					
				</div>
			</div>
			);
		});

		let numOfComments = commentItems.length;
		return(
			<div className="comment-container">
				<div className="container">
					<p>{numOfComments}</p>
					{commentItems}
				</div>
			</div>
		);
	}
	//Custom Methods
	handleDelete(){
		this.props.onDelete(this.props.id);
	}
	

}

class CommentSection extends React.Component{
		constructor(props){
			super(props);
			this.state={
				listOfComments: [],
				showComments: false
			}
		}
	componentWillMount(){
		this.fetchComments();
	}
	render(){
		return(
			<div>
				<CommentLists  
					listOfComments={this.state.listOfComments} 
					onDelete={this.deleteComments.bind(this)} 
				/>
				<CommentForm addNew={this.addComment.bind(this)} />
			</div>
		);
	}
	//custom methods
	/**addComment(comment){
   		 this.setState({comments: this.state.comments.concat([comment])});
    }**/
    addComment(author, body, id) {

    	const comment = {
			//id: this.state.comments.length + 1,
			author: author,
			body: body,
			id: id
		};

	    this.setState((state) => ({
	      listOfComments: state.listOfComments.concat([comment])
	    }));
	}

	fetchComments(){
		$.ajax({
			method: 'GET',
			url: 'comments.json',
			success: (listOfComments) => {
				this.setState({listOfComments})
			}

		});
	}
	/**deleteComments(comment){
		$.ajax({
			method: 'DELETE',
			url: 'comments.json'
			});	

		const comments = [...this.state.listOfComments];
		const commentIndex = comments.indexOf(comment);
		comments.splice(commentIndex, 1);

		this.setState({ comments });
	}**/
	deleteComments(commentID) {
	    const comments = this.state.listOfComments.filter(
	      comment => comment.id !== commentID
	    );
	    this.setState({ comments });    
 	}

}

/**const listOfComments = [
	{author: "James", body: "Great Work", id: "123"},
	{author: "Lara", body: "Amazing!!!", id: "234"},
	{author: "Wyane",  body: "Hello World", id: "456"}
];**/

//listOfComments={listOfComments}
ReactDOM.render(<CommentSection  />, document.getElementById("main"));