import React, { useState } from 'react';
import { useHistory, Redirect } from 'react-router-dom';
import { onboard } from './store/actions/user-actions';
import { connect } from 'react-redux';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles, withStyles, createStyles } from '@material-ui/core/styles';
import logo from './assets/logo38.png';
import kanshaLogo from './assets/logo39.png';
import {
	Container,
	Typography,
	Paper,
	Button,
	FormControl,
	TextField,
	MenuItem,
	Select,
	Box,
	InputBase,
} from '@material-ui/core';
import 'typeface-montserrat';
import 'typeface-roboto';
import Loader from 'react-loader-spinner';

const StyledBase = withStyles(theme =>
	createStyles({
		input: {
			width: '100%',
			height: '53%',
			marginTop: '.3rem',
			border: '1px solid rgba(255, 255, 255, 0.7)',
			padding: '1rem',
			color: '#FFFFFF',
			borderRadius: '0',
			fontFamily: 'Montserrat',
			fontStyle: 'normal',
			fontWeight: 'normal',
			fontSize: '24px',
			lineHeight: '20px',
		},
	}),
)(InputBase);

const useStyles = makeStyles(theme => ({
	root: {
		[theme.breakpoints.down('sm')]: {
			display: 'flex',
			flexDirection: 'column',
			backgroundColor: '#26242D',
			padding: '0 1rem'
		},

		[theme.breakpoints.up('md')]: {
			display: 'flex',
			flexDirection: 'column',
			backgroundColor: '#26242D',
			padding: '0 1rem'
		},

		[theme.breakpoints.up('lg')]: {
			display: 'flex',
			flexDirection: 'row',
			minHeight: '100vh',
			backgroundColor: '#26242D',
		}
		
	},
	imageContainer: {
		[theme.breakpoints.down('sm')]: {
			width: '48%',
			margin: '0',
			padding: '0'
		},

		[theme.breakpoints.up('md')]: {
			width: '48%',
			margin: '0',
			padding: '0'
		},

		[theme.breakpoints.up('lg')]: {
			width: '48%'
		}
		
	},
	kanshaLogo: {
		[theme.breakpoints.down('sm')]: {
			width: '100%'
		},

		[theme.breakpoints.up('md')]: {
			width: '50%',
			marginLeft: '1rem'
		},

		[theme.breakpoints.up('lg')]: {
			width: '30%'
		}
		
	},
	logo: {
		[theme.breakpoints.down('sm')]: {
			display: 'none'
		},

		[theme.breakpoints.up('md')]: {
			display: 'none'
		},

		[theme.breakpoints.up('lg')]: {
			display: 'block',
			width: '90%',
			height: 'auto',
			marginTop: '1rem',
			marginLeft: '1rem',
		}
	
	},
	formContainer: {

		[theme.breakpoints.down('sm')]: {
			width: '100%',
			marginTop: '3rem'
		},

		[theme.breakpoints.up('md')]: {
			width: '100%',
			marginTop: '3rem'
		},

		[theme.breakpoints.up('lg')]: {
			width: '50%',
			paddingRight: '4rem'
		}
		
	},
	onboard: {

		[theme.breakpoints.down('sm')]: {
			display: 'flex',
			flexDirection: 'column',
			width: '100%',
			height: '100%',
			backgroundColor: '#2D2C35',
			borderRadius: '2px',

		},

		[theme.breakpoints.up('md')]: {
			display: 'flex',
			flexDirection: 'column',
			width: '100%',
			height: '100%',
			backgroundColor: '#2D2C35',
			borderRadius: '2px',
			
		},

		[theme.breakpoints.up('lg')]: {

			display: 'flex',
			flexDirection: 'column',
			margin: '7rem 3rem 0 3rem',
			height: '80%',
			backgroundColor: '#2D2C35',
			borderRadius: '2px',
			padding: '2rem 2rem',
			
		}
		
	},
	getStarted: {
		display: 'flex',
		justifyContent: 'center',
		padding: '1rem .5rem 3rem .5rem',
		color: '#EE4D71',
		fontFamily: 'Montserrat',
		fontStyle: 'normal',
		fontWeight: '600',
		fontSize: '42px',
		lineHeight: '24px',
		letterSpacing: '0.15px',
	},
	textField: {
		margin: '.5rem',
		width: '100%',
		'& input:valid + fieldset': {
			borderColor: 'rgba(255, 255, 255, 0.7)',
			borderWidth: '2',
		},
		'& input:valid:hover + fieldset': {
			borderColor: '#FFFFFF',
		},
		'& input:valid:focus + fieldset': {
			borderColor: '#EE4D71',
		},
		'& label.Mui-focused': {
			color: '#FFFFFF',
			fontFamily: 'Montserrat',
			fontStyle: 'normal',
			fontWeight: 'normal',
			fontSize: '20px',
			lineHeight: '20px',
		},
	},
	select: {
		border: '1px solid #FFFFFF',
	},
	label: {
		color: 'rgba(255, 255, 255, 0.7)',
		fontSize: '24px',
	},
	input: {
		color: '#FFFFFF',
		borderRadius: '0',
		fontFamily: 'Montserrat',
		fontStyle: 'normal',
		fontWeight: 'normal',
		fontSize: '24px',
		lineHeight: '20px',
	},
	dropdownStyle: {
		backgroundColor: '#3A3845',
		color: '#FFFFFF',
		fontSize: '24px',
	},
	twoInput: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
		width: '100%',
		padding: '1rem',
	},
	oneInput: {
		display: 'flex',
		justifyContent: 'center',
		width: '100%',
		padding: '1rem',
	},
	button: {

		[theme.breakpoints.down('sm')]: {
			
			fontSize: '24px',
			margin: '2rem 6rem',
			borderRadius: '0',
			backgroundColor: '#2D2C35',
			boxShadow: 'none',
			border: '1px solid #EE4D71',
			color: '#EE4D71',
			textDecoration: 'none',
				'&:hover': {
					background: 'linear-gradient(172.54deg, #EE4D71 0%, #F15A3F 100%);',
					color: '#FFFFFF',		
			}
		},

		[theme.breakpoints.up('md')]: {
			
			fontSize: '24px',
			margin: '2rem 6rem',
			borderRadius: '0',
			backgroundColor: '#2D2C35',
			boxShadow: 'none',
			border: '1px solid #EE4D71',
			color: '#EE4D71',
			textDecoration: 'none',
				'&:hover': {
					background: 'linear-gradient(172.54deg, #EE4D71 0%, #F15A3F 100%);',
					color: '#FFFFFF',		
			},
		},

		[theme.breakpoints.up('lg')]: {
			
			fontSize: '24px',
			margin: '2rem 6rem',
			borderRadius: '0',
			backgroundColor: '#2D2C35',
			boxShadow: 'none',
			border: '1px solid #EE4D71',
			color: '#EE4D71',
			textDecoration: 'none',
				'&:hover': {
					background: 'linear-gradient(172.54deg, #EE4D71 0%, #F15A3F 100%);',
					color: '#FFFFFF',		
				}
		},
	},
	paper: {
		marginTop: '1rem',
	},
	typo: {
		display: 'flex',
		justifyContent: 'center',
		padding: '1rem .5rem',
	},
	form: {
		width: '90%',
		marginTop: '1rem',
		marginLeft: '1.5rem',
	},
	loaderContainer: {
		position: 'absolute',
		top: "calc(50% - 50px)",
		left: "calc(50% - 50px)",
		width: 100,
		height: 100
	},
}));

function Onboarding({ onboard, profile, isOnboarding, isOnboardingLoading }) {
	const classes = useStyles();

	const history = useHistory();

	const [form, setForm] = useState({});

	const handleChange = event => {
		setForm({ ...form, [event.target.name]: event.target.value });
	};

	const handleSubmit = event => {
		onboard(form);
		history.push('/profile');
	};

	if (!isOnboarding && profile) return <Redirect to="profile" />;

	return (
		<div id="App" className={classes.root}>
			<CssBaseline />
			<Container className={classes.imageContainer}>
				<img
					src={kanshaLogo}
					alt="Kansha Logo"
					className={classes.kanshaLogo}
				/>
				<img
					src={logo}
					alt="Kansha Logo People"
					className={classes.logo}
				/>
			</Container>
			<Container className={classes.formContainer}>
				<Paper className={classes.onboard}>
					{isOnboardingLoading ? (
						<>
							<Box className={classes.loaderContainer}>
								<Loader
									type="Rings"
									color="#EE4D71"
									height={100}
									width={100}
								/>
							</Box>
						</>
					) : (
						<>
							<Typography
								className={classes.getStarted}
								variant="h5">
								Let's Get Started!
							</Typography>
							<FormControl>
								<Box className={classes.twoInput}>
									<TextField
										label="First Name*"
										placeholder="e.g. Jane"
										className={classes.textField}
										variant="outlined"
										name="first_name"
										margin="normal"
										onChange={handleChange}
										InputProps={{
											className: classes.input,
										}}
										InputLabelProps={{
											className: classes.label,
										}}
									/>
									<TextField
										label="Last Name*"
										placeholder="e.g. Doe"
										className={classes.textField}
										variant="outlined"
										name="last_name"
										margin="normal"
										onChange={handleChange}
										InputProps={{
											className: classes.input,
										}}
										InputLabelProps={{
											className: classes.label,
										}}
									/>
								</Box>
								<Box className={classes.twoInput}>
									<TextField
										label="Job Title*"
										placeholder="e.g. Manager"
										className={classes.textField}
										variant="outlined"
										name="job_title"
										margin="normal"
										onChange={handleChange}
										InputProps={{
											className: classes.input,
										}}
										InputLabelProps={{
											className: classes.label,
										}}
									/>
									<FormControl className={classes.textField}>
										<Select
											variant="outlined"
											defaultValue="standard"
											value={form.user_Type}
											onChange={handleChange}
											name="user_type"
											margin="normal"
											MenuProps={{
												classes: {
													paper:
														classes.dropdownStyle,
												},
											}}
											input={<StyledBase />}
											InputProps={{
												className: classes.input,
											}}
											InputLabelProps={{
												className: classes.label,
											}}>
											<MenuItem value="standard">
												Standard
											</MenuItem>
											<MenuItem value="mod">Mod</MenuItem>
											<MenuItem value="admin">
												Admin
											</MenuItem>
										</Select>
									</FormControl>
								</Box>
								<Box className={classes.oneInput}>
									<TextField
										label="Organization*"
										placeholder="Organization Name"
										className={classes.textField}
										variant="outlined"
										name="org_name"
										margin="normal"
										onChange={handleChange}
										InputProps={{
											className: classes.input,
										}}
										InputLabelProps={{
											className: classes.label,
										}}
									/>
								</Box>
								<Box className={classes.oneInput}>
									<TextField
										label="Department"
										placeholder="e.g. Marketing Department"
										className={classes.textField}
										variant="outlined"
										name="department"
										margin="normal"
										onChange={handleChange}
										InputProps={{
											className: classes.input,
										}}
										InputLabelProps={{
											className: classes.label,
										}}
									/>
								</Box>
								<Button
									className={classes.button}
									variant="contained"
									color="primary"
									onClick={handleSubmit}>
									Confirm
								</Button>
							</FormControl>
						</>
					)}
				</Paper>
			</Container>
		</div>
	);
}

const mapStateToProps = ({ user }) => {
	return {
		...user,
	};
};

export default connect(mapStateToProps, { onboard })(Onboarding);
