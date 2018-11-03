import React from 'react';

import Channel from '../Channel/Channel';

const Favorites = (props) => Array.from(props.favorites).map( ( favoriteChannel, i ) => {
	return <Channel number={i} key={favoriteChannel.id} isFavorite={true} channel={favoriteChannel} />;
});

export default Favorites;