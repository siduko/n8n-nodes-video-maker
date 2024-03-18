import {IExecuteFunctions, INodeExecutionData, INodeType, INodeTypeDescription} from 'n8n-workflow';

import {getEditly} from './libs/editly';
import {nodeDescription} from './VideoMaker.node.options';



export class VideoMaker implements INodeType {
	description: INodeTypeDescription = nodeDescription;

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();

		const movieWidth = this.getNodeParameter('width', 0) as number;
		const movieHeight = this.getNodeParameter('height', 0) as number;

		const returnData: INodeExecutionData[] = [];

		for (let i = 0; i < items.length; i++) {
			const newItem: INodeExecutionData = {
				json: {},
				binary: {},
				pairedItem: {
					item: i,
				},
			};

			const editly = await getEditly();

			await editly({
				enableFfmpegLog: true,
				outPath: '/home/node/data/audio2.mp4',
				width: movieWidth, height: movieHeight,
				defaults: {
					layer: {fontPath: '/home/node/data/PatuaOne-Regular.ttf'},
				},
				clips: [
					{duration: 15, layers: {type: 'title-background', text: 'Audio track'}},
					{layers: [{type: 'image', path: '/home/node/data/1.jpg'}]},
					{layers: [{type: 'image', path: '/home/node/data/2.jpg'}]},
					{layers: [{type: 'fill-color', color: 'white'}, {type: 'image', path: '/home/node/data/3.jpg', resizeMode: 'contain'}]},
					{layers: [{type: 'fill-color', color: 'white'}, {type: 'image', path: '/home/node/data/4.jpg', resizeMode: 'contain'}]},
					{layers: [{type: 'image', path: '/home/node/data/5.jpg', resizeMode: 'cover'}]},
					{layers: [{type: 'image', path: '/home/node/data/6.jpg', resizeMode: 'cover'}]},
					{layers: [{type: 'image', path: '/home/node/data/1.jpg', resizeMode: 'stretch'}]},
					{layers: [{type: 'image', path: '/home/node/data/2.jpg', resizeMode: 'stretch'}]},
				],
				audioNorm: {enable: true, gaussSize: 3, maxGain: 100},
				clipsAudioVolume: 50,
				audioTracks: [
					{path: '/home/node/data/futuristic-beat-146661.mp3', cutFrom: 18},
				],
			});

			// @ts-ignore
			newItem.binary!['data'] = movie;

			returnData.push(newItem);
		}


		return this.prepareOutputData(returnData);
	}
}
