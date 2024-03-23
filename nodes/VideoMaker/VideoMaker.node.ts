import {IExecuteFunctions, INodeExecutionData, INodeType, INodeTypeDescription} from 'n8n-workflow';

import {getEditly} from './libs/editly';
import {nodeDescription} from './VideoMaker.node.options';


export class VideoMaker implements INodeType {
	description: INodeTypeDescription = nodeDescription;

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();

		const width = this.getNodeParameter('width', 0) as number;
		const height = this.getNodeParameter('height', 0) as number;
		const enableFfmpegLog = this.getNodeParameter('enableFfmpegLog', 0) as boolean;
		const defaultParams = this.getNodeParameter('default', 0) as object;
		const clipParams = this.getNodeParameter('clips', 0) as object;

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

			//@ts-ignore
			const clips = (clipParams['item']).map((item: object) => {
				return {
					...item,
					// @ts-ignore
					layers: item['layers'].item?? [],
				};
			});

			console.log(JSON.stringify(clips), 'clipParams');

			await editly({
				outPath: 'home/node/data/audio2.mp4',
				width,
				height,
				enableFfmpegLog,
				defaults: defaultParams,
				clips,
			});

			// await editly({
			// 	enableFfmpegLog: true,
			// 	outPath: '/home/node/data/audio2.mp4',
			// 	width: movieWidth, height: movieHeight,
			// 	defaults: {
			// 		layer: {fontPath: '/home/node/data/PatuaOne-Regular.ttf'},
			// 	},
			// 	clips: [
			// 		{duration: 15, layers: {type: 'title-background', text: 'Audio track'}},
			// 		{layers: [{type: 'image', path: '/home/node/data/1.png'}]},
			// 		{layers: [{type: 'image', path: '/home/node/data/2.png'}]},
			// 		{layers: [{type: 'fill-color', color: 'white'}, {type: 'image', path: '/home/node/data/3.png', resizeMode: 'contain'}]},
			// 		{layers: [{type: 'fill-color', color: 'white'}, {type: 'image', path: '/home/node/data/4.png', resizeMode: 'contain'}]},
			// 		{layers: [{type: 'image', path: '/home/node/data/5.png', resizeMode: 'cover'}]},
			// 		{layers: [{type: 'image', path: '/home/node/data/6.png', resizeMode: 'cover'}]},
			// 		{layers: [{type: 'image', path: '/home/node/data/1.png', resizeMode: 'stretch'}]},
			// 		{layers: [{type: 'image', path: '/home/node/data/2.png', resizeMode: 'stretch'}]},
			// 	],
			// 	audioNorm: {enable: true, gaussSize: 3, maxGain: 100},
			// 	clipsAudioVolume: 50,
			// 	audioTracks: [
			// 		{path: '/home/node/data/futuristic-beat-146661.mp3', cutFrom: 18},
			// 	],
			// });

			// @ts-ignore
			newItem.binary!['data'] = movie;

			returnData.push(newItem);
		}


		return this.prepareOutputData(returnData);
	}
}
