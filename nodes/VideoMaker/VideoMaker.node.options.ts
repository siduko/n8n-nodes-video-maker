import {INodeProperties, INodeTypeDescription} from 'n8n-workflow';

const defaultParameters: INodeProperties[] = [
	{
		displayName: 'Duration',
		name: 'duration',
		type: 'number',
		default: 4,
	},
];

/**
 * Options to be displayed
 */
export const nodeDescription: INodeTypeDescription = {
	displayName: 'Video Maker',
	name: 'VideoMaker',
	group: ['VideoMaker'],
	version: 1,
	description: 'Video maker',
	defaults: {
		name: 'Video maker',
		color: '#125580',
	},
	icon: 'file:node-icon.svg',
	inputs: ['main'],
	outputs: ['main'],
	properties: [
		{
			displayName: 'Output Path',
			name: 'outputPath',
			type: 'string',
			default: '',
		},
		{
			displayName: 'Width',
			name: 'width',
			type: 'number',
			default: 1024,
		},
		{
			displayName: 'Height',
			name: 'height',
			type: 'number',
			default: 768,
		},
		{
			displayName: 'Enable Ffmpeg log',
			name: 'enableFfmpegLog',
			type: 'boolean',
			default: false,
		},
		{
			displayName: 'Default',
			name: 'default',
			type: 'collection',
			default: {},
			options: [...defaultParameters],
		},
		{
			displayName: 'Clips',
			name: 'clips',
			placeholder: 'Add Clip',
			type: 'fixedCollection',
			typeOptions: {
				multipleValues: true,
			},
			default: {},
			options: [
				{
					name: 'item',
					displayName: 'Item',
					values: [
						{
							displayName: 'Duration',
							name: 'duration',
							type: 'number',
							default: 4,
						},
						{
							displayName: 'Transition',
							name: 'transition',
							type: 'fixedCollection',
							default: {},
							options: [
								{
									name: 'item',
									displayName: 'Item',
									values: [
										{
											displayName: 'Duration',
											name: 'duration',
											type: 'number',
											default: 0.5,
										},
										{
											displayName: 'Name',
											name: 'name',
											type: 'string',
											default: 'random',
										},
										{
											displayName: 'Audio out Curve',
											name: 'audioOutCurve',
											type: 'string',
											default: 'tri',
										},
										{
											displayName: 'Audio In Curve',
											name: 'audioInCurve',
											type: 'string',
											default: 'tri',
										},
									],
								},
							],
						},
						{
							displayName: 'Layers',
							name: 'layers',
							type: 'fixedCollection',
							typeOptions: {
								multipleValues: true,
							},
							default: {},
							options: [
								{
									name: 'item',
									displayName: 'Item',
									values: [
										{
											displayName: 'Type',
											name: 'type',
											type: 'string',
											default: '',
										},
										{
											displayName: 'Start',
											name: 'start',
											type: 'number',
											default: 0,
										},
										{
											displayName: 'Stop',
											name: 'stop',
											type: 'number',
											default: 0,
										},
										{
											displayName: 'Path',
											name: 'path',
											type: 'string',
											default: '',
										},
										{
											displayName: 'Resize Mode',
											name: 'resizeMode',
											type: 'options',
											default: 'contain-blur',
											options: [
												{
													name: 'Contain',
													value: 'contain',
												},
												{
													name: 'Contain Blur',
													value: 'contain-blur',
												},
												{
													name: 'Cover',
													value: 'cover',
												},
												{
													name: 'Stretch',
													value: 'stretch',
												},
											],
										},
									],
								},
							],
						},
					],
				},
			],
		},
	],
};
