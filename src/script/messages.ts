const Messages = {
	removeNodeCheck(name: string) {
		return "Dou you really want to remove '" + name + "'?";
	},
	invalidVariableName(name: string) {
		return "Cannot use '" + name + "' as variable name.";
	},
	invalidUpdateFunction(name: string) {
		return "Cannot set update function for '" + name + "'.";
	},
	modelEmpty: 'Cannot export an empty model.',
	modelWillBeErased: 'This operation will overwrite your current model. Do you want to continue?',
	closePrompt: 'There may be unsaved changes. Close window?'
};
export default Messages;
