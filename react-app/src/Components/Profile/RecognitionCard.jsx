import React, { useMemo } from 'react';
import { Card, Box, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'
import { timeAgo } from '../../utils/timeago'
import moment from 'moment'


const useStyles = makeStyles(theme => ({
    recCard: {
        display: 'flex',
        backgroundColor: '#3A3845',
        margin: '1rem 1rem 0 1rem',
        height: '13%'
    },
    recCardSent: {
        display: 'flex',
        flexDirection: "row-reverse",
        backgroundColor: '#3A3845',
        margin: '1rem 1rem 0 1rem',
        height: '13%'
    },
    recProfilePic: {
        borderRadius: '100%',
        width: '10%',
        padding: '1rem',
        height: 'auto'
    },
    recSender: {
        display: 'flex',
    },
    recCardUser: {
        padding: '1rem 2rem',
        fontFamily: 'Montserrat',
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: '16px',
        lineHeight: '20px',
        color: '#FFFFFF',
    },
    recCardTime: {
        fontFamily: 'Montserrat',
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: '16px',
        lineHeight: '20px',
        color: 'rgba(255, 255, 255, 0.5)',
        opacity: '0.5',
        padding: '1rem'
    },
    recCardMessage: {
        padding: '0 2rem',
        fontFamily: 'Montserrat',
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: '16px',
        lineHeight: '20px',
        color: 'rgba(255, 255, 255, 0.7)',
    }
}))

export function RecognitionCard({profile, recognition}) {
    const classes = useStyles()

    const createdAt = recognition.date;
    const currentTime = moment();
    const postTime = moment(createdAt);
    let timeDiff;
    if (currentTime.diff(postTime, 'days') < 1) {
      if (currentTime.diff(postTime, 'hours') < 1) {
        if (currentTime.diff(postTime, 'minutes') < 1) {
          timeDiff = 'just now';
        } else {
          if (currentTime.diff(postTime, 'minutes') === 1) {
            timeDiff = `${currentTime.diff(postTime, 'minutes')} MINUTE AGO`;
          } else {
            timeDiff = `${currentTime.diff(postTime, 'minutes')} MINUTES AGO`;
          }
        }
      } else {
        if (currentTime.diff(postTime, 'hours') === 1) {
          timeDiff = `${currentTime.diff(postTime, 'hours')} HOUR AGO`;
        } else {
          timeDiff = `${currentTime.diff(postTime, 'hours')} HOURS AGO`;
        }
      }
    } else {
      if (currentTime.diff(postTime, 'days') === 1) {
        timeDiff = `${currentTime.diff(postTime, 'days')} DAY AGO`;
      } else {
        timeDiff = `${currentTime.diff(postTime, 'days')} DAYS AGO`;
      }
    }

    console.log(createdAt)
	return (
		<Card className={classes.recCard}>
			<img
				src={recognition.profile_pic}
                className={classes.recProfilePic}
                alt="user avatar"
			/>
			<Box>
				<Box className={classes.recSender}>
					<Typography className={classes.recCardUser}>
						{`${recognition.first_name} ${recognition.last_name}`}
					</Typography>
					<Typography className={classes.recCardTime}>
						{timeDiff}
					</Typography>
				</Box>
				<Typography className={classes.recCardMessage}>
					{recognition.message}
				</Typography>
			</Box>
		</Card>
	);
}

