import React from 'react';

import Channel from './Channel/Channel';

const channels = (props) => props.channels.map( ( channel, i ) => {
	// console.log(el)
	return <Channel key={channel.id} channel={channel} />;
});

export default channels;