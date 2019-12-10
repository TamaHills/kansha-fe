import React from 'react'
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import RecogModal from './Components/RecogModal/RecogModal'

const useStyles = makeStyles(theme => ({
	card_container: {
		display: 'flex',
		flexWrap: 'wrap',
	},
	card: {
		position: 'relative',
		minWidth: 275,
		margin: 10,
		backgroundColor: '#2D2C35',
		color: 'white',
		width: '30%',
	},
	vert_icon: {
		position: "absolute",
		top: '10px',
		right: '10px'
	},
	card_content: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	title: {
		fontSize: 14,
	},
	job_title: {
		fontFamily: 'Roboto',
		fontSize: '1.3em'
	},
	department: {
		fontFamily: 'Roboto',
		fontWeight: '300',
		marginBottom: 12,
		color: 'white',
	},
	avatar: {
		margin: 10,
		width: 100,
		height: 100,
		borderRadius: '100%',
		background: 'linear-gradient(135deg, #EE4D71 0%, #F15A3F 100%)',
		objectFit: 'cover',
  		objectPosition: '50% 50%',
	},
	card_actions: {
		display: 'flex',
		justifyContent: 'center'
	},
	button_dark: {
		backgroundColor: '#575757',
		color: 'white',
	},
}));

export default function Workspace_Card(props) {
	const classes = useStyles();
	return (
		<div>
			<div className={classes.card_container} >
				{props.team.map(user => (
					<Card className={classes.card} key={user.id}>
						<CardContent className={classes.card_content} >
							<Avatar
								alt="profile picture"
								src={user.profile_picture}
								className={classes.avatar}
							/>
							<MoreVertIcon className={classes.vert_icon} />
							<Typography variant="h5" component="h2">
								{user.first_name} {user.last_name}
							</Typography>
							<Typography className={classes.job_title}>
								{user.job_title}
							</Typography>
							<Typography
								className={classes.department}
								color="textSecondary">
								{user.department}
							</Typography>
						</CardContent>
						<CardActions className={classes.card_actions}>
							<RecogModal {...user} />
							{/* <Button
									variant="contained"
									className={classes.button}>
									View Profile
								</Button> */}
						</CardActions>
					</Card>
				))}
			</div>
		</div>
	)
}