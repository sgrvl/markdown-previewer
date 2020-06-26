import React, { Component } from "react";
import "./App.css";

class Editor extends Component {
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
			<div>
				<h1>Editor</h1>
				<textarea
					name="editor"
					id="editor"
					cols="100"
					rows="20"
					value={this.state.input}
					onChange={this.handleChange}
				></textarea>
				<Previewer input={window.marked(`${this.state.input}`)} />
			</div>
		);
	}
}

class Previewer extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	render() {
		return (
			<div>
				<h1>Preview</h1>
				<div
					id="preview"
					dangerouslySetInnerHTML={{ __html: `${this.props.input}` }}
				/>
			</div>
		);
	}
}

export default Editor;
