import React from 'react';
import classes from './Channel.css'

const channel = ( props ) => {
	return (
		<div className={classes.Channel+' col-6'}>

			<span className={classes.Channel_number}>{String(props.number).padStart(3, '0')}</span>
			<img className={classes.Channel_image} src={`https://images.zattic.com/${props.channel.bestAvailableQuality.logo_black_84}`} alt="props.channel.title}" />
			<span className={classes.Channel_title}>{props.channel.title}</span>
			<span></span>
		</div>
	)
};

export default channel;