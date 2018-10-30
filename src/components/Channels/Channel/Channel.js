import React from 'react';
import classes from './Channel.css'

const channel = ( props ) => {
	return (
		<div className={classes.Channel + ' col-6 ' + (props.isFocused ? classes.focused : '')}>

			<span className={classes.Channel_number}>{String(props.number + 1).padStart(3, '0')}</span>
			<img className={classes.Channel_image} src={`https://images.zattic.com/${props.channel.bestAvailableQuality.logo_black_84}`} alt="props.channel.title}" />
			<span className={classes.Channel_title}>{props.channel.title}</span>
			<span className={classes.Channel_level}>{props.channel.bestAvailableQuality.level}</span>
			<span className={classes.Channel_favorite}></span>
		</div>
	)
};

export default channel;