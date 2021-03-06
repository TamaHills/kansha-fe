import React, { useState, useEffect, useMemo } from 'react';
import { Container, Typography, Card, Box, Paper, Badge } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import 'typeface-montserrat';
import 'typeface-roboto';
import { Cropper } from '../FileUpload/FileCrop'
import { RecognitionCard } from './RecognitionCard';
import { axiosWithAuth } from '../../utils/axiosWithAuth';
import RecogModal from '../RecogModal/RecogModal'

const useStyles = makeStyles(theme => ({
	profileDiv: {
		backgroundColor: '#26242D',
		overflowX: 'hidden',
	},
	root: {
		[theme.breakpoints.down('sm')]: {
			display: 'flex',
			flexDirection: 'column',
			width: '100vw',
			paddingTop: '4rem',
			paddingLeft: '0',
			
				'@global': {
					'*::-webkit-scrollbar': {
						width: '.5rem',
					},
					'*::-webkit-scrollbar-corner': {
						backgroundColor: 'transparent',
					},
					'*::-webkit-scrollbar-thumb': {
						backgroundColor: '#3A3845',
						borderRadius: '10px',
					},
				},
		},

		[theme.breakpoints.up('md')]: {
			display: 'flex',
			flexDirection: 'column',
			width: '100vw',
			paddingTop: '2.5rem',
				'@global': {
					'*::-webkit-scrollbar': {
						width: '.5rem',
					},
					'*::-webkit-scrollbar-corner': {
						backgroundColor: 'transparent',
					},
					'*::-webkit-scrollbar-thumb': {
						backgroundColor: '#3A3845',
						borderRadius: '10px',
					},
				},
		},

		[theme.breakpoints.up('lg')]: {
			display: 'flex',
			flexDirection: 'row',
			width: '100vw',
			height: 'auto',
			maxHeight: '150vh',
			paddingTop: '2.5rem',
				'@global': {
					'*::-webkit-scrollbar': {
						width: '.5rem',
					},
					'*::-webkit-scrollbar-corner': {
						backgroundColor: 'transparent',
					},
					'*::-webkit-scrollbar-thumb': {
						backgroundColor: '#3A3845',
						borderRadius: '10px',
					},
				},
			
		}
		
	},
	leftContainer: {
		[theme.breakpoints.down('sm')]: {
			display: 'flex',
			flexDirection: 'column',
			width: '90%',
			marginLeft: '3rem',
			
			
			

		},

		[theme.breakpoints.up('md')]: {
			display: 'flex',
			flexDirection: 'column',
			width: '50%',
			

		},

		[theme.breakpoints.up('lg')]: {
			display: 'flex',
			flexDirection: 'column',
			width: '50%',
			
		}
		
	},
	userInfo: {
		[theme.breakpoints.down('sm')]: {
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center',
			width: '100%',
			height: 'auto',
			backgroundColor: '#2D2C35',
			paddingTop: '3rem',
			overflow: 'visible'
		},

		[theme.breakpoints.up('md')]: {
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center',
			width: '100%',
			height: '500px',
			backgroundColor: '#2D2C35',
			paddingTop: '3rem',
			overflow: 'visible'
		},

		[theme.breakpoints.up('lg')]: {
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center',
			width: '100%',
			height: 'auto',
			backgroundColor: '#2D2C35',
			padding: '3rem 0',
			overflow: 'visible'
		}
		
	},
	pictureContainer: {
		[theme.breakpoints.down('sm')]: {
			position: 'relative',
			width: '50%',
			display: 'flex',
			justifyContent: 'center',
			borderRadius: '100%',
			'&:hover': {
				cursor: 'pointer',
			},

		},

		[theme.breakpoints.up('md')]: {
			position: 'relative',
			width: '50%',
			display: 'flex',
			justifyContent: 'center',
			borderRadius: '100%',
			'&:hover': {
				cursor: 'pointer',
			},

		},

		[theme.breakpoints.up('lg')]: {
			position: 'relative',
			width: '50%',
			borderRadius: '100%',
			'&:hover': {
				cursor: 'pointer',
			},
			
		}
		
	},
	profilePic: {
		[theme.breakpoints.down('sm')]: {
			borderRadius: '100%',
			// Hard coding until we can make a circle img cropper for users
			width: '150px',
			height: '150px',
			background: 'linear-gradient(135deg, #EE4D71 0%, #F15A3F 100%)',
			objectFit: 'cover',
			objectPosition: '50% 50%',

		},

		[theme.breakpoints.up('md')]: {
			borderRadius: '100%',
			// Hard coding until we can make a circle img cropper for users
			width: '250px',
			height: '250px',
			background: 'linear-gradient(135deg, #EE4D71 0%, #F15A3F 100%)',
			objectFit: 'cover',
			objectPosition: '50% 50%',

		},

		[theme.breakpoints.up('lg')]: {
			borderRadius: '100%',
			// Hard coding until we can make a circle img cropper for users
			width: '272px',
			height: '272px',
			background: 'linear-gradient(135deg, #EE4D71 0%, #F15A3F 100%)',
			objectFit: 'cover',
			objectPosition: '50% 50%',
			
		}
		
	},
	camera: {
		width: '100%',
		height: 'auto',
	},
	addPic: {
			opacity: 0,
			borderRadius: '100%',
			position: 'absolute',
			// transform: 'translate(0, -100%)',
			'&:hover': {
				opacity: 1,
				transition: '0.5s ease',

		}
	},
	name: {
		[theme.breakpoints.down('sm')]: {
			paddingTop: '1.5rem',
			color: '#FFFFFF',
			fontFamily: 'Montserrat',
			fontStyle: 'normal',
			fontWeight: 'bold',
			fontSize: '16px',
			lineHeight: '20px',
			textAlign: 'center',

		},

		[theme.breakpoints.up('md')]: {
			paddingTop: '1.5rem',
			color: '#FFFFFF',
			fontFamily: 'Montserrat',
			fontStyle: 'normal',
			fontWeight: 'bold',
			fontSize: '16px',
			lineHeight: '20px',
			textAlign: 'center',

		},

		[theme.breakpoints.up('lg')]: {
			paddingTop: '1.5rem',
			color: '#FFFFFF',
			fontFamily: 'Montserrat',
			fontStyle: 'normal',
			fontWeight: 'bold',
			fontSize: '24px',
			lineHeight: '29px',
			textAlign: 'center',
			
		}
		
	},
	jobTitle: {
		[theme.breakpoints.down('sm')]: {
			paddingTop: '.5rem',
			color: 'rgba(255, 255, 255, 0.7)',
			fontFamily: 'Montserrat',
			fontStyle: 'normal',
			fontWeight: 'normal',
			fontSize: '16px',
			lineHeight: '20px',
			textAlign: 'center',

		},

		[theme.breakpoints.up('md')]: {
			paddingTop: '.5rem',
			color: 'rgba(255, 255, 255, 0.7)',
			fontFamily: 'Montserrat',
			fontStyle: 'normal',
			fontWeight: 'normal',
			fontSize: '16px',
			lineHeight: '20px',
			textAlign: 'center',

		},

		[theme.breakpoints.up('lg')]: {
			paddingTop: '.5rem',
			color: 'rgba(255, 255, 255, 0.7)',
			fontFamily: 'Montserrat',
			fontStyle: 'normal',
			fontWeight: 'normal',
			fontSize: '24px',
			lineHeight: '29px',
			textAlign: 'center',
			
		}
		
	},
	department: {
		[theme.breakpoints.down('sm')]: {
			paddingTop: '.5rem',
			color: 'rgba(255, 255, 255, 0.5)',
			fontFamily: 'Montserrat',
			fontStyle: 'normal',
			fontSize: '16px',
			lineHeight: '20px',
			fontWeight: 'normal',
			textAlign: 'Center',
			verticalAlign: 'Top',
			paddingBottom: '3rem',

		},

		[theme.breakpoints.down('md')]: {
			paddingTop: '.5rem',
			color: 'rgba(255, 255, 255, 0.5)',
			fontFamily: 'Montserrat',
			fontStyle: 'normal',
			fontSize: '16px',
			lineHeight: '20px',
			fontWeight: 'normal',
			textAlign: 'Center',
			verticalAlign: 'Top',
			paddingBottom: '3rem',

		},

		[theme.breakpoints.up('lg')]: {
			paddingTop: '.5rem',
			color: 'rgba(255, 255, 255, 0.5)',
			fontFamily: 'Montserrat',
			fontStyle: 'normal',
			fontSize: '24px',
			lineHeight: '29px',
			fontWeight: 'normal',
			textAlign: 'Center',
			verticalAlign: 'Top',
			paddingBottom: '3rem',
			
		}
		
	},
	badgeCard: {
		[theme.breakpoints.down('sm')]: {
			marginTop: '2.5rem',
			backgroundColor: '#2D2C35',
			height: '44%',

		},

		[theme.breakpoints.up('md')]: {
			marginTop: '2.5rem',
			backgroundColor: '#2D2C35',
			height: '44%',

		},

		[theme.breakpoints.up('lg')]: {
			marginTop: '2.5rem',
			backgroundColor: '#2D2C35',
			height: '220px',
			
		}
	},
	typo: {
		display: 'flex',
		justifyContent: 'center',
		padding: '1rem 2rem',
		color: '#FFFFFF',
		fontFamily: 'Montserrat',
	},
	header: {
		display: 'flex',
		justifyContent: 'flex-start',
		padding: '1rem 2rem',
		color: '#FFFFFF',
		fontFamily: 'Montserrat',
		fontStyle: 'Bold',
		fontSize: '25px',
	},
	badgeContainer: {
		height: '100%',
		display: 'flex',
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'center',
		overflow: 'scroll',
		padding: '0 0 50px 0',
	},
	badgeImage: {
		backgroundColor: '#2D2C35',
		width: '90%',
		height: 'auto',
		paddingTop: '.5rem',
	},
	badgeDiv: {
		width: '33%',
	},
	badgeCount: {
		color: '#FFFFFF',
		
	},
	rightContainer: {
		[theme.breakpoints.down('sm')]: {
			width: '87%',
			height: 'auto',
			paddingRight: '0',
			margin: '2rem 0 0 3rem'
			

		},

		[theme.breakpoints.up('md')]: {
			width: '50%',
			height: 'auto',
			marginTop: '2rem'
			

		},

		[theme.breakpoints.up('lg')]: {
			width: '50%',
			height: 'auto',
			maxHeight: '95vh',
			margin: '0',
			
			
			
		},

		[theme.breakpoints.up('xl')]: {
			width: '50%',
			height: 'auto',
			margin: '0'
		}
		
	},
	activityInfo: {
		display: 'flex',
		flexDirection: 'column',
		width: '100%',
		height: '100%',
		backgroundColor: '#2D2C35',
	},
	activityContainer: {
		overflow: 'scroll',
	},
}));

export function Profile({ profile, isPeer }) {
	const classes = useStyles();
	const [badges, setBadges] = useState([])

	useEffect(() => {
		axiosWithAuth()
			.get('/badges')
			.then(res => {
				setBadges(res.data);
			})
			.catch(err => {
				console.log(err);
			});
	}, []);

	const userBadges = useMemo(() => profile.rec.reduce((acc, rec) => {
		if(profile.id === rec.sender) {
			return acc
		} else if(rec.badge_id && acc[rec.badge_id]){
			acc[rec.badge_id].count++
		} else if(badges.length && rec.badge_id) {
			acc[rec.badge_id]={badge:badges[rec.badge_id-1].badge_URL, count:1}
		} 
		return acc;
	},{}),[profile, badges])

	console.log(userBadges)

	return (
		//This may need to be refactored in a future build if things are added in order to make it more mobile-friendly
		<div id="Profile" className={classes.profileDiv}>
			{/* <Link to="/workspace">workspace</Link> */}
			<Container fixed className={classes.root}>
				{/* This is the profile card with the image on the top lefthand side, profile picture and "username" are coming from Auth0*/}
				<Container fixed className={classes.leftContainer}>
					<Card className={classes.userInfo}>
						
						<div className={classes.pictureContainer}>
							<img
								src={profile.profile_picture}
								className={classes.profilePic}
								alt="user profile"
							/>
							{ !isPeer &&
							(<div className={classes.addPic}>
								<Cropper />
							</div>)
							}
						</div>
						
						<Typography className={classes.name} variant="h5">
							{profile.first_name} {profile.last_name}
						</Typography>
						<Typography className={classes.jobTitle}>
							{profile.job_title}
						</Typography>
						<Typography className={classes.department}>
							{profile.department}
						</Typography>
						{isPeer && <RecogModal { ...profile} />}
					</Card>
					{/* This is the badges card at the bottom of the lefthand side, and is currently hardcoded with badge pictures */}
					<Card className={classes.badgeCard}>
						<Typography className={classes.header} variant="h5">
							Badges
						</Typography>
						<Container className={classes.badgeContainer}>
						{badges &&
							<>
								{Object.keys(userBadges).map(id => {
									if(userBadges[id].count === 1){
										return (
											<div className={classes.badgeDiv}>
												<img src={userBadges[id].badge} className={classes.badgeImage} />
											</div>
									)} else {
											return ( 
										<div className={classes.badgeDiv}>
												<Badge 
													badgeContent={'x'+ userBadges[id].count} 
													className={classes.badgeCount}
													overlap="circle"
													>
														<img src={userBadges[id].badge} className={classes.badgeImage} />
												</Badge>
										</div>
									)
								}})}
							</>}
						</Container>
					</Card>
				</Container>
				{/* This is the activity container on the righthand side and is currently hardcoded with rewards entries */}
				<Container fixed className={classes.rightContainer}>
					<Card className={classes.activityInfo}>
						<Typography className={classes.header} variant="h5">
							Activity
						</Typography>
						<Box className={classes.activityContainer}>
							{profile &&
								profile.rec
									.sort(function(a,b){
										return new Date(b.date) - new Date(a.date)
									})
									.map(recognition => (
										<RecognitionCard
											key={recognition.id}
											sent={
												profile.id ===
												recognition.sender
											}
											badge={badges[recognition.badge_id-1]}
											profile={profile}
											recognition={recognition}
										/>
									))}
						</Box>
					</Card>
				</Container>
			</Container>
		</div>
	);
}
