import React from 'react';

import Channel from '../Channel/Channel';

const Channels = (props) => props.channels.map( ( channel, i ) => {
	return <Channel number={i} key={channel.id} channel={channel} isFocused={ i === parseInt(props.focusedIndex)} />;
});

export default Channels;