import React from 'react';

import Channel from './Channel/Channel';

const channels = (props) => props.channels.map( ( channel, i ) => {
	return <Channel number={i} key={channel.id} channel={channel} isFocused={channel.id === props.focusedChannel} />;
});

export default channels;