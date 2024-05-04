class IdCounter {
	currentId: number;
	constructor() {
		this.currentId = 0;
	}
	getNextId() {
		return this.currentId++;
	}
}
const idCounter = new IdCounter();
export default idCounter;
