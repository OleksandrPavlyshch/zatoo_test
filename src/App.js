import React, { Component } from 'react';
import './App.css';
import Channels from './components/Channels/Channels';
import Favorites from './components/Favorites/Favorites';
import channelsApi from './api/channels';
import { isArrayEnd } from './utils/utils';
import keyCodes from './utils/keyCodes';

const { ARROW_DOWN, ARROW_UP, ARROW_RIGHT, ARROW_LEFT, ENTER } = keyCodes;

class App extends Component {

	state = {
		focusedIndex: 0,
		favorites: new Set(),
		channels: []
	};


	isBetter(level1, level2) {
		const qaLvl = {
			'sd': 1,
			'hd': 2,
			'uhd': 3
		}
		return qaLvl[level1] > qaLvl[level2];
	}

	getBestQuality(qualities) {
		return qualities.reduce((acc, elem) => {
			if (!acc || this.isBetter(elem.level, acc.level)) {
				return elem;
			}
			return acc;
		}, null);
	};

	getAvailableQualities(qualities) {
		return qualities.filter((element) => element.availability === 'available');
	};

	cleanChannels(channels) {
		const cleanedChannels = channels.map((channel, i) => {
			let qualities = this.getAvailableQualities(channel.qualities);
			channel.bestAvailableQuality = this.getBestQuality(qualities);
			delete channel.qualities
			return channel;
		}).reduce((acc, channel) => {
			if (channel.bestAvailableQuality) {
				if (
					!acc[channel.id] ||
					this.isBetter(
						channel.bestAvailableQuality.level,
						acc[channel.id].bestAvailableQuality.level
					)
				) {
					acc[channel.id] = channel;
				}
			}
			return acc
		}, {});

		return Object.keys(cleanedChannels).map(key => cleanedChannels[key]);
	}


	handleKey(e) {
		let channels = this.state.channels,
			focusedIndex = this.state.focusedIndex;

		if (e.keyCode === ARROW_DOWN && !isArrayEnd(channels, focusedIndex + 2)) {
			let index = focusedIndex + 2;
			this.setState({
				focusedChannel: channels[index].id,
				focusedIndex: index
			});
		}

		if (e.keyCode === ARROW_UP && !isArrayEnd(channels, focusedIndex - 2)) {
			let index = focusedIndex - 2;
			this.setState({
				focusedIndex: index
			});
		}

		if (e.keyCode === ARROW_LEFT && !isArrayEnd(channels, focusedIndex - 1)) {
			let index = focusedIndex - 1;
			this.setState({
				focusedIndex: index
			});
		}

		if (e.keyCode === ARROW_RIGHT && !isArrayEnd(channels, focusedIndex + 1)) {
			let index = focusedIndex + 1;
			this.setState({
				focusedIndex: index
			});
		}

		if (e.keyCode === ENTER) {
			let favorites = this.state.favorites;

			if (channels[focusedIndex].isSelected) {
				favorites.delete(channels[focusedIndex]);
				delete channels[focusedIndex].isSelected;

			} else {
				favorites = favorites.add(channels[focusedIndex]);
				channels[focusedIndex].isSelected = true;
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
		channelsApi.getAllChannels().then((channels) => {
			this.setState({
				channels: this.cleanChannels(channels)
			})
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
								<Channels channels={this.state.channels} focusedIndex={this.state.focusedIndex} />
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default App;