import React from 'react';
import classes from './Channel.css'

const Channel = ({ isFocused, isFavorite, channel, number }) => {
	return (
		<div className={classes.Channel + ' ' + (isFocused ? classes.focused : '') + ' ' + (isFavorite ? 'col-12' : 'col-6')}>
			<span className={classes.Channel_number}>
				{String(number + 1).padStart(3, '0')}
			</span>
			<img className={classes.Channel_image} src={
				`https://images.zattic.com/${channel.bestAvailableQuality.logo_black_84}`
					} alt="channel.title}" />
			<span className={classes.Channel_title}>
				{channel.title}
			</span>
			<span className={classes.Channel_level}>
				{channel.bestAvailableQuality.level}
			</span>
			{!isFavorite && 
				<span className={
					classes.Channel_favorite + ' ' 
					+ (channel.isSelected ? classes.active : '')
				}></span>
			}
		</div>
	)
};

export default Channel;