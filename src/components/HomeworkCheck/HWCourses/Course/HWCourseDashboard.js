import React, { Component } from "react";
import compose from "recompose/compose";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
//Accessories
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
//Redux
import {
	loadDefaultHWStudents,
	loadHWStudents,
} from "../../../../actions/HomeworkCheck/hwStudents";
import {
	loadDefaultHWUnits,
	loadHWUnits,
} from "../../../../actions/HomeworkCheck/hwUnits";
import {
	loadDefaultHomeworks,
	loadHomeworks,
} from "../../../../actions/HomeworkCheck/homeworks";
import {
	loadDefaultHWStatus,
	loadHWStatus,
} from "../../../../actions/HomeworkCheck/hwStatus";
import { loadingAPI } from "../../../../api";
//Components
import HWCourseStudentAddDialog from "./BaseDialogs/HWCourseStudentAddDialog";
import HWCourseHWAddDialog from "./BaseDialogs/HWCourseHWAddDialog";
import HWCourseUnitAddDialog from "./BaseDialogs/HWCourseUnitAddDialog";
import HWStatusAddDialog from "./Status/HWStatusAddDialog";
import HWCourseUnitTabs from "./HWCourseUnitTabs";
import HWStatusBar from "./Status/HWStatusBar";
//Redux
import { loadDefaultStudentStatus } from "../../../../actions/HomeworkCheck/studentHWStatus";
import { changeNavbarTitle } from "../../../../actions/navbar";
import { loadDefaultHWCourses } from "../../../../actions/HomeworkCheck/hwCourses";
import { changeViewState } from "../../../../actions/PageStates/page_hwCheckCourse";
import HWImportMain from "./Importing/HWImportMain";
import { loadDefaultSeatingPositions } from "../../../../actions/HomeworkCheck/seatingPositions";

const styles = theme => ({
	root: {
		flexGrow: 1,
		height: 850,
	},
	unitBar: {
		position: "static",
	},
});

const HWCourseDashboard = props => {
	const { id } = props.match.params;
	const { dispatch } = props;
	if (props.hwUnits === null || props.hwStudents === null) {
		loadingAPI(dispatch, [
			[
				{ action: loadDefaultHWStudents, condition: id },
				{ action: loadDefaultHWUnits, condition: id },
				{ action: loadDefaultHWStatus, condition: id },
				{ action: loadDefaultHomeworks, condition: id },
				{ action: loadDefaultHWCourses },
			],
			[
				{ action: loadDefaultStudentStatus, condition: id },
				{ action: loadDefaultSeatingPositions, condition: id },
			],
		]);

		return null;
	} else {
		return <RenderDashBoard {...props} />;
	}
};

class RenderDashBoard extends Component {
	componentDidMount() {
		const { id } = this.props.match.params;
		const { dispatch } = this.props;
		dispatch(
			changeNavbarTitle({
				value: [this.props.hwCourses[id].courseTitle],
				location: "HWCheck Course",
			}),
		);
		dispatch(changeViewState("Table View"));
	}

	componentWillUnmount() {
		this.props.dispatch(loadHWStudents(null));
		this.props.dispatch(loadHWUnits(null));
		this.props.dispatch(loadHWStatus(null));
		this.props.dispatch(loadHomeworks(null));
		this.props.dispatch(loadHWStatus(null));
	}
	state = {
		studentDialog: false,
		hwDialog: false,
		unitDialog: false,
		statusDialog: false,
		unitID: Object.keys(this.props.hwUnits)[0],
	};

	toggleUnitID = unitID => {
		this.setState({ unitID });
	};

	toggleDialogOpen = type => () => {
		const target = `${type}Dialog`;
		this.setState({
			[target]: true,
		});
	};

	toggleDialogClose = type => () => {
		const target = type + "Dialog";
		this.setState({
			[target]: false,
		});
	};

	render() {
		const { id } = this.props.match.params;
		const { classes } = this.props;

		return (
			<Paper className={classes.root}>
				{this.state.studentDialog ? (
					<HWCourseStudentAddDialog
						open={this.state.studentDialog}
						toggle={this.toggleDialogClose}
						courseID={id}
					/>
				) : null}

				<HWCourseHWAddDialog
					open={this.state.hwDialog}
					toggle={this.toggleDialogClose}
					courseID={id}
					unitID={this.state.unitID}
				/>

				<HWCourseUnitAddDialog
					open={this.state.unitDialog}
					toggle={this.toggleDialogClose}
					courseID={id}
				/>

				<HWStatusAddDialog
					open={this.state.statusDialog}
					toggle={this.toggleDialogClose}
					courseID={id}
				/>

				<HWImportMain courseID={id} />

				<Grid container spacing={0}>
					<Grid item xs={12}>
						<HWStatusBar add={this.toggleDialogOpen("status")} />
					</Grid>
					<Grid item xs={12} style={{ height: 700 }}>
						<HWCourseUnitTabs
							toggleHWDialogOpen={this.toggleDialogOpen("hw")}
							toggleUnitDialogOpen={this.toggleDialogOpen("unit")}
							toggleUnitID={this.toggleUnitID}
							courseID={id}
						/>
					</Grid>
				</Grid>
				<Button onClick={this.toggleDialogOpen("student")}>
					Add a Student
				</Button>
			</Paper>
		);
	}
}

function mapStateToProps({ hwUnits, hwStudents, hwCourses }) {
	return {
		hwUnits,
		hwStudents,
		hwCourses,
	};
}

export default compose(
	withStyles(styles),
	connect(mapStateToProps),
)(HWCourseDashboard);
