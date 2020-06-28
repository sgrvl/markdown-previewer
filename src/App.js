import React, { Component } from "react";
import "./App.css";
import move from "./move.svg";
import minimize from "./minimize.svg";
import sun from "./favicon-32x32.png";

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			input: "",
		};
		this.handleChange = this.handleChange.bind(this);
	}
	handleChange(e) {
		this.setState({ input: e.target.value });
	}

	componentDidMount() {
		fetch("/sample.txt")
			.then((r) => r.text())
			.then((text) => {
				this.setState({ input: text });
			});
	}

	render() {
		return (
			<div className="wrap">
				<Editor value={this.state.input} onChange={this.handleChange} />
				<Previewer input={window.marked(`${this.state.input}`)} />
			</div>
		);
	}
}

class Editor extends Component {
	constructor(props) {
		super(props);
		this.state = { active: false };
		this.toggleClass = this.toggleClass.bind(this);
	}

	toggleClass() {
		this.setState({ active: !this.state.active });
	}

	render() {
		return (
			<div
				className={this.state.active ? "editor-wrap changeSize" : "editor-wrap"}
			>
				<label htmlFor="editor">
					<img src={sun} alt="sunrise over mountains" id="test" />
					Editor
					<img
						id="arrow"
						src={this.state.active ? minimize : move}
						alt="size arrow"
						onClick={this.toggleClass}
					/>
				</label>
				<textarea
					name="editor"
					id="editor"
					cols="100"
					//rows="20"
					value={this.props.value}
					onChange={this.props.onChange}
				></textarea>
			</div>
		);
	}
}

class Previewer extends Component {
	constructor(props) {
		super(props);
		this.state = { active: false };
		this.toggleClass = this.toggleClass.bind(this);
	}

	toggleClass() {
		this.setState({ active: !this.state.active });
	}

	render() {
		return (
			<div
				className={
					this.state.active ? "preview-wrap changeSizeP" : "preview-wrap"
				}
			>
				<label htmlFor="previewer">
					<img src={sun} alt="sunrise over mountains" id="test" />
					Previewer
					<img
						id="arrow"
						src={this.state.active ? minimize : move}
						alt="size arrow"
						onClick={this.toggleClass}
					/>
				</label>
				<div
					id="preview"
					dangerouslySetInnerHTML={{ __html: `${this.props.input}` }}
				/>
			</div>
		);
	}
}

export default App;
