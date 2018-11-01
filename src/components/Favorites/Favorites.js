import React from 'react';

import Channel from '../Channel/Channel';

const favorites = (props) => props.favorites.map( ( favoriteChannel, i ) => {
	return <Channel number={i} key={favoriteChannel.id} isFavorite={true} channel={favoriteChannel} />;
});

export default favorites;