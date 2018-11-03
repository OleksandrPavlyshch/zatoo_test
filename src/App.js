import React, { Component } from 'react';
import './App.css';
import Channels from './components/Channels/Channels';
import Favorites from './components/Favorites/Favorites';
import json from './data/channels.json';

let data = json.channels;

let isBetter = (level1, level2) => {
	let qaLvl = {
		'sd': 1,
		'hd': 2,
		'uhd': 3
	}
	return qaLvl[level1] > qaLvl[level2];
}

let getBestQuality = (qualities) => {
	return qualities.reduce((acc, elem) => {
		if (!acc || isBetter(elem.level, acc.level)) {
			return elem;
		}
		return acc;
	}, null);
};

let getAvailableQualities = (qualities) => {
	return qualities.filter((element) => element.availability === 'available')
};

data.forEach((channel) => {
	let qualities = getAvailableQualities(channel.qualities);
	channel.bestAvailableQuality = getBestQuality(qualities);
	delete channel.qualities
})



let channels = data.reduce((acc, channel) => {
	if (channel.bestAvailableQuality) {
		if (
			!acc[channel.id] ||
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


const channelsArray = Object.keys(channels).map(key => channels[key]);

let isArrayEnd = (arr, index) => {
	return index < 0 || index >= arr.length;
};


class App extends Component {

	state = {
		focusedIndex: 0,
		favorites: new Set(),
		channelsArray: channelsArray
	};

	handleKey(e) {

		if (e.keyCode === 40 && !isArrayEnd(channelsArray, this.state.focusedIndex + 2)) {
			let index = this.state.focusedIndex + 2;
			this.setState({
				focusedChannel: channelsArray[index].id,
				focusedIndex: index
			});
		}

		if (e.keyCode === 38 && !isArrayEnd(channelsArray, this.state.focusedIndex - 2)) {
			let index = this.state.focusedIndex - 2;
			this.setState({
				focusedIndex: index
			});
		}

		if (e.keyCode === 37 && !isArrayEnd(channelsArray, this.state.focusedIndex - 1)) {
			let index = this.state.focusedIndex - 1;
			this.setState({
				focusedIndex: index
			});
		}

		if (e.keyCode === 39 && !isArrayEnd(channelsArray, this.state.focusedIndex + 1)) {
			let index = this.state.focusedIndex + 1;
			this.setState({
				focusedIndex: index
			});
		}

		if (e.keyCode === 13) {
			let favorites = this.state.favorites;

			if (this.state.channelsArray[this.state.focusedIndex].isSelected) {
				favorites.delete(this.state.channelsArray[this.state.focusedIndex]);
				delete this.state.channelsArray[this.state.focusedIndex].isSelected;

			} else {
				favorites = favorites.add(this.state.channelsArray[this.state.focusedIndex]);
				this.state.channelsArray[this.state.focusedIndex].isSelected = true;
			}

			this.setState({
				favorites: favorites,
			});
		}
	}

	componentDidMount() {
		document.addEventListener('keydown', (event) => {
			this.handleKey(event);
		});
	}

	render() {
		return (
			<div className="App">
				<div className="container-fluid pt-4">
					<div className="row">
						<div className="col-4 px-5">
							<div className="row m-0">
								<h1 className="col-12 mb-3">Favorites</h1>
								<Favorites favorites={this.state.favorites} />
							</div>
						</div>
						<div className="col-8 px-5">
							<div className="row m-0">
								<h1 className="col-12 mb-3">Channels</h1>
								<Channels channels={this.state.channelsArray} focusedIndex={this.state.focusedIndex} />
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default App;