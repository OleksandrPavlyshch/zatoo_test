import React from 'react';
import classes from './Channel.css'

const channel = ( props ) => {
		return (
				<div className={classes.Channel+' col-6'}>
						{props.channel.title} - has quality {props.channel.bestAvailableQuality.level}
				</div>
		)
};

export default channel;