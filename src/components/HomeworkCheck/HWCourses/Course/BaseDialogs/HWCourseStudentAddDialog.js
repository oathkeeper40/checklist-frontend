import React, { Component } from "react";
import compose from "recompose/compose";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
//Accessories
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import Grid from "@material-ui/core/Grid";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Paper from "@material-ui/core/Paper";
//Redux
import { handleAddHWStudent } from "../../../../../actions/HomeworkCheck/hwStudents";
import HWCourseStudentAddTable from "./../HWCourseStudentAddTable";

const styles = theme => ({
	root: {
		flexGrow: 1
	},
	tabsPaper: {
		color: theme.palette.primary
	}
});

class HWCourseStudentAddDialog extends Component {
	close = this.props.toggle("student");

	state = {
		firstName: "",
		lastName: "",
		gender: "",
		courseID: this.props.courseID
	};

	handleValue = e => {
		this.setState({
			[e.target.id]: e.target.value
		});
	};

	handleSubmit = e => {
		e.preventDefault();
		this.close();
		this.props.dispatch(handleAddHWStudent(this.state));
	};

	render() {
		const { classes } = this.props;
		return (
			<Dialog open={this.props.open} onClose={this.close}>
				<form onSubmit={this.handleSubmit}>
					<DialogTitle>Add a student</DialogTitle>
					<DialogContent>
						<Grid container spacing={16} justify="center" alignItems="center">
							<Grid item xs={6}>
								<TextField
									required
									label="First Name"
									id="firstName"
									value={this.state.firstName}
									onChange={this.handleValue}
									fullWidth
								/>
							</Grid>
							<Grid item xs={6}>
								<TextField
									required
									label="Last Name"
									id="lastName"
									value={this.state.lastName}
									onChange={this.handleValue}
									fullWidth
								/>
							</Grid>
							<Grid item xs={5}>
								<hr />
							</Grid>
							<Grid item xs={2} align="center">
								<DialogContentText>Optional</DialogContentText>
							</Grid>
							<Grid item xs={5}>
								<hr />
							</Grid>
							<TextField
								label="Gender"
								id="gender"
								value={this.state.gender}
								onChange={this.handleValue}
							/>
						</Grid>
					</DialogContent>
					<DialogActions>
						<Button onClick={this.close}>Cancel</Button>
						<Button color="primary">Add+</Button>
						<Button color="primary" type="submit">
							Add
						</Button>
					</DialogActions>
				</form>
			</Dialog>
		);
	}
}

export default compose(
	withStyles(styles),
	connect()
)(HWCourseStudentAddDialog);

// <Grid container spacing={0} justify="center" alignItems="center">
// <Grid item xs={6}>
// 	<TextField
// 		required
// 		label="First Name"
// 		id="firstName"
// 		value={this.state.firstName}
// 		onChange={this.handleValue}
// 		fullWidth
// 	/>
// </Grid>
// <Grid item xs={6}>
// 	<TextField
// 		required
// 		label="Last Name"
// 		id="lastName"
// 		value={this.state.lastName}
// 		onChange={this.handleValue}
// 		fullWidth
// 	/>
// </Grid>
// <TextField
// 	label="Gender"
// 	id="gender"
// 	value={this.state.gender}
// 	onChange={this.handleValue}
// />
// </Grid>
