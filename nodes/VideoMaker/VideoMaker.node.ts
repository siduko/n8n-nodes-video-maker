import {IExecuteFunctions, INodeExecutionData, INodeType, INodeTypeDescription} from "n8n-workflow";
const etroNode = require('etro-node');
import {nodeDescription} from "./VideoMaker.node.options";
import puppeteer from 'puppeteer';

export class VideoMaker implements INodeType {
	description: INodeTypeDescription = nodeDescription;

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();

		const parameters = this.getNodeParameter('parameters', 0) as Object;
		const movieWidth = this.getNodeParameter('width', 0) as number;
		const movieHeight = this.getNodeParameter('height', 0) as number;

		let returnData: INodeExecutionData[] = [];

		for (let i = 0; i < items.length; i++) {
			const newItem: INodeExecutionData = {
				json: {},
				binary: {},
				pairedItem: {
					item: i,
				},
			};

			const browser = await puppeteer.launch({
				args: ['--no-sandbox'],
				headless: true
			})
			const page = await browser.newPage()

			const movie = await new Promise((resolve, reject) => {
				etroNode(function() {
					const canvas = document.createElement('canvas')
					document.body.appendChild(canvas);
					// @ts-ignore
					const movie = new etro.Movie({
						canvas
					});
				
					movie.width = movieWidth;
					movie.height = movieHeight;

					// @ts-ignore
					movie.layers.push(new etro.layer.Image({
						startTime: 0,
						duration: 5,
						source: new Image(),
						sourceX: 0, // default: 0
						sourceY: 0, // default: 0
						sourceWidth: 400, // default: null (full width)
						sourceHeight: 400, // default: null (full height)
						x: 0, // default: 0
						y: 0, // default: 0
						width: 400, // default: null (full width)
						height: 400, // default: null (full height)
						opacity: 1, // default: 1
					}))

					movie.record({
						frameRate: 30,
						// @ts-ignore
					}).then(window.done);
				}, parameters, resolve, page)
			});

			// @ts-ignore
			newItem.binary!['data'] = movie;

			returnData.push(newItem)
		}


		return this.prepareOutputData(returnData);
	}
}
