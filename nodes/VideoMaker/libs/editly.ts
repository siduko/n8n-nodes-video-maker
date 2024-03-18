import type editly from 'editly';

export const getEditly = async (): Promise<typeof editly> => {
	const lib = await (eval(`import('editly')`) as Promise<{
		default: typeof import('editly');
	}>);
	return lib.default;
};
