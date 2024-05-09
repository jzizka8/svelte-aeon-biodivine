import type { Writable } from 'svelte/store';

export function hintAction(
	node: HTMLButtonElement,
	props: { hint: Writable<string>; hintText: string }
) {
	const { hint, hintText } = props;
	const setHint = () => hint.set(hintText);
	const unsetHint = () => hint.set('');

	node.addEventListener('mouseover', setHint);
	node.addEventListener('focus', setHint);
	node.addEventListener('mouseout', unsetHint);
	node.addEventListener('blur', unsetHint);

	return {
		update({ hintText: newHintText }: { hintText: string }) {
			hint.set(newHintText);
		},
		destroy() {
			node.removeEventListener('mouseover', setHint);
			node.removeEventListener('focus', setHint);
			node.removeEventListener('mouseout', unsetHint);
		}
	};
}
