import db from "./firebase";
import React from "react";
import ReactQuill from "react-quill"; // ES6
import "react-quill/dist/quill.snow.css";
import Menu from "./components/Menu/Menu";
import { Typography } from "@material-ui/core";
import { Input } from "@material-ui/core";
import { Button } from "@material-ui/core";

class App extends React.Component {
	state = {
		body: "",
		title: "",
		list: [],
		insertOrUpdate: "insert",
		updateId: "",
	};

	cancelUpdate = () => {
		this.setState({ insertOrUpdate: "insert", body: "", title: "" });
	};

	handleChange(value) {
		this.setState({ body: value });
	}

	handleTitleChange(e) {
		this.setState({
			[e.target.name]: e.target.value,
		});
	}
	componentDidMount() {
		db.collection("notes")
			.get()
			.then((querySnapshot) => {
				querySnapshot.forEach((doc) => {
					// console.log(doc.id, " => ", doc.data());
					const newList = { id: doc.id, data: doc.data() };
					this.setState((prevState) => {
						return { list: [...prevState.list, newList] };
					});
				});
			})
			.catch((error) => {
				console.log("Error getting documents: ", error);
			});
	}
	handleSubmit = (e) => {
		e.preventDefault();
		console.log(this.state.insertOrUpdate);

		if (this.state.insertOrUpdate === "insert") {
			let bodyToInsert = this.state.body;
			let titleToInsert = this.state.title;
			db.collection("notes")
				.add({
					body: this.state.body,
					title: this.state.title,
					timestamp: new Date(),
				})
				.then(() => {
					console.log("Document successfully updated!");
					setTimeout(() => {
						this.setState((prevState) => {
							return {
								body: "",
								title: "",
								list: [
									...prevState.list,
									{
										id: this.state.updateId,
										data: { body: bodyToInsert, title: titleToInsert },
									},
								],
								insertOrUpdate: "insert",
							};
						});
					}, 100);
				})
				.catch((error) => {
					console.error("Error updating document: ", error);
				});
		} else {
			// update
			db.collection("notes")
				.doc(this.state.updateId)
				.update({
					body: this.state.body,
					title: this.state.title,
					timestamp: new Date(),
				})
				.then(() => {
					console.log("Document successfully updated!");
					setTimeout(() => {
						const newList = this.state.list.map((li) => {
							if (li.id === this.state.updateId) {
								const newLi = {
									id: this.state.updateId,
									data: {
										body: this.state.body,
										title: this.state.title,
										timestamp: new Date(),
									},
								};
								return newLi;
							} else {
								return li;
							}
						});
						this.setState({
							list: newList,
							title: "",
							body: "",
							insertOrUpdate: "insert",
						});
					}, 100);
				});
		}
	};

	itemClicked = (id) => {
		const selected = this.state.list.filter((li) => li.id === id);
		if (selected)
			this.setState({
				body: selected[0].data.body,
				title: selected[0].data.title,
				insertOrUpdate: "update",
				updateId: id,
			});
	};
	deleteItem = (id) => {
		if (
			window.confirm(
				"Are you sure you want to save this thing into the database?"
			)
		) {
			if (id) {
				db.collection("notes")
					.doc(String(id))
					.delete()
					.then(() => {
						console.log("Document successfully deleted!");
						const newList = this.state.list.filter((li) => li.id !== id);
						this.setState({
							list: newList,
							body: "",
							title: "",
							insertOrUpdate: "insert",
						});
					})
					.catch((error) => {
						console.error("Error removing document: ", error);
					});
			}
		}
	};
	render() {
		return (
			<div style={{ display: "flex", flexDirection: "row", marginTop: "30px" }}>
				<div style={{ width: "22%", paddingRight: "2%" }}>
					<Menu
						list={this.state.list}
						itemClicked={this.itemClicked}
						deleteItem={this.deleteItem}
					/>
				</div>
				<div>
					<header>
						<Typography variant="h4" component="h2">
							Note App
						</Typography>
					</header>
					<div className="container" style={{ paddingTop: "30px" }}>
						<section className="add-item" style={{ marginBottom: "30px" }}>
							<Input
								type="text"
								name="title"
								placeholder="Note Title"
								value={this.state.title}
								onChange={(e) => this.handleTitleChange(e)}
								style={{ width: "500px" }}
							/>
							<Button onClick={(e) => this.handleSubmit(e)}>
								{this.state.insertOrUpdate === "insert"
									? "Add Item"
									: "Update Item"}
							</Button>
							{this.state.insertOrUpdate === "insert" ? (
								""
							) : (
								<Button onClick={this.cancelUpdate}>Cancel Update</Button>
							)}
						</section>

						<ReactQuill
							name="body"
							value={this.state.body}
							onChange={(e) => this.handleChange(e)}
							style={{ width: "800px", height: "500px" }}
						/>
					</div>
				</div>
			</div>
		);
	}
}

export default App;
