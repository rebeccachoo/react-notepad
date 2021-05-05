import "./App.css";
import db from "./firebase";
import React from "react";
import ReactQuill from "react-quill"; // ES6
import "react-quill/dist/quill.snow.css";

class App extends React.Component {
	state = {
		body: "",
		title: "",
	};

	handleChange(value) {
		this.setState({ body: value });
	}

	handleTitleChange(e) {
		this.setState({
			[e.target.name]: e.target.value,
		});
	}
	handleSubmit(e) {
		e.preventDefault();
		db.collection("notes")
			.add({
				...this.state,
				timestamp: new Date(),
			})
			.then(() => {
				console.log("Document successfully updated!");
			})
			.catch((error) => {
				console.error("Error updating document: ", error);
			});
	}
	render() {
		return (
			<div>
				<header>
					<div className="wrapper"></div>
				</header>
				<div className="container">
					<section className="add-item">
						<form onSubmit={(e) => this.handleSubmit(e)}>
							<input
								type="text"
								name="title"
								placeholder="What are you bringing?"
								value={this.state.title}
								onChange={(e) => this.handleTitleChange(e)}
							/>
							<button>Add Item</button>
						</form>
					</section>
					<section className="display-item">
						<div className="wrapper">
							<ul></ul>
						</div>
					</section>
					<ReactQuill
						name="body"
						value={this.state.body}
						onChange={(e) => this.handleChange(e)}
					/>
				</div>
			</div>
		);
	}
}

export default App;
