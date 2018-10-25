import React, { Component } from 'react';
import './App.css';
import Channels from './components/Channels/Channels';
import json from './data/channels.json';

let data = json.channels;

let isBetter = (qa1, qa2) => {
	let qaLvl = {
		'sd': 1
		, 'hd': 2
		,'uhd': 3
	}
	return qaLvl[qa1] > qaLvl[qa2];
}

let getBestQuality = (qualities) => {
	return qualities.reduce((acc, elem) => {
		if( !acc || isBetter(elem.level, acc.level)){
			return elem;
		}
		return acc;
	}, null);
};

let getAvailableQualities = (qualities) => {
	return qualities.filter((element, index) => {
		if (element.availability === 'available') {
			return true;
		}
	})
};

data.forEach((channel) => {
	let qualities = getAvailableQualities(channel.qualities);
	channel.bestAvailableQuality = getBestQuality(qualities);
	delete channel.qualities
})



let chanels = data.reduce((acc, channel) => {
	if (channel.bestAvailableQuality) {
		if (
			!acc[channel.id] 
			|| 
			isBetter(
				channel.bestAvailableQuality.level,
				acc[channel.id].bestAvailableQuality.level
			)
		) {
			acc[channel.id] = channel;
		}
	}

	return acc
}, {});


const channelsArray = Object.keys(chanels).map(key => chanels[key]);



console.log(channelsArray.length);
console.log(data.length);
class App extends Component {
	render() {
		return (
			<div className="App">
				<div className="container">
					<div className="row">
						<div className="col-4"></div>
						<div className="col-8">
							<div className="row">
								<h1>Channels</h1>
								<Channels channels={channelsArray} />
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default App;
