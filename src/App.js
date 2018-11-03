import React, { Component } from 'react';
import './App.css';
import Channels from './components/Channels/Channels';
import Favorites from './components/Favorites/Favorites';
import channelsApi from './api/channels';
import { isArrayEnd } from './utils/utils';

// let data = channelsApi.channels;







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

		if (e.keyCode === 40 && !isArrayEnd(this.state.channels, this.state.focusedIndex + 2)) {
			let index = this.state.focusedIndex + 2;
			this.setState({
				focusedChannel: this.state.channels[index].id,
				focusedIndex: index
			});
		}

		if (e.keyCode === 38 && !isArrayEnd(this.state.channels, this.state.focusedIndex - 2)) {
			let index = this.state.focusedIndex - 2;
			this.setState({
				focusedIndex: index
			});
		}

		if (e.keyCode === 37 && !isArrayEnd(this.state.channels, this.state.focusedIndex - 1)) {
			let index = this.state.focusedIndex - 1;
			this.setState({
				focusedIndex: index
			});
		}

		if (e.keyCode === 39 && !isArrayEnd(this.state.channels, this.state.focusedIndex + 1)) {
			let index = this.state.focusedIndex + 1;
			this.setState({
				focusedIndex: index
			});
		}

		if (e.keyCode === 13) {
			let favorites = this.state.favorites;

			if (this.state.channels[this.state.focusedIndex].isSelected) {
				favorites.delete(this.state.channels[this.state.focusedIndex]);
				delete this.state.channels[this.state.focusedIndex].isSelected;

			} else {
				favorites = favorites.add(this.state.channels[this.state.focusedIndex]);
				this.state.channels[this.state.focusedIndex].isSelected = true;
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