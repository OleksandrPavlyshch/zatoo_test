import React from 'react';

import Channel from './Channel/Channel';

const persons = (props) => props.channels.map( ( channel, i ) => {
	// console.log(el)
	return <Channel key={channel.id} channel={channel} />;
});

export default channels;