
export const Issues = () => {
	const event = "issues"
	return {
		opened: () => `${event}.opened`,
		edited: () => `${event}.edited`,
		deleted: () => `${event}.deleted`,
		closed: () => `${event}.closed`,
		reopened: () => `${event}.reopened`
	}
}

// export interface Label {
// 	color: string,
// 	default: boolean,
// 	description: string,
// 	name: string,
// 	node_id: string,
// 	url: string
// }

// export class Issue {
// 	private _title: string;
// 	private _body: string;
// 	private _url: string;
// 	private _id: number;
// 	private _labels: Array<Label>
// 	constructor(id: number, title: string, body: string, url: string, labels: Array<Label>) {
// 		this._title = title;
// 		this._body = body;
// 		this._url = url;
// 		this._id = id;
// 		this._labels = labels;
// 	}

// 	get title(): string { return this._title };
// 	get body(): string { return this._body };
// 	get url(): string { return this._url };
// 	get id(): number { return this._id };
// 	get labels(): Array<Label> { return this._labels };

// }