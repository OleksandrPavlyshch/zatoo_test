import response from '../data/channels.json';

export default {
	getAllChannels () {
		return new Promise( (resolve, reject) => {
			resolve(response.channels);
		})
	}
};