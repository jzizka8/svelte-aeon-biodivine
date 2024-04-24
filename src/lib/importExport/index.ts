import { exportAeon } from './exportModel';
import { importAeon } from './importModel';

export { importAeon, exportAeon };

export function downloadFile(name: string, content: string) {
	const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
	const href = URL.createObjectURL(blob);
	const link = document.createElement('a');
	link.href = href;
	link.download = name;
	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);
}