import React from 'react';

import Channel from './Channel/Channel';

const channels = (props) => props.channels.map( ( channel, i ) => {
	console.log(i)
	return <Channel number={i} key={channel.id} channel={channel} isActive={channel.id === props.activeChannel} />;
});

export default channels;