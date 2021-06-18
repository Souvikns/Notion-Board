import * as core from '@actions/core';
import * as github from '@actions/github';

const token = core.getInput('token') || process.env.GH_PAT || process.env.GITHUB_TOKEN;

export const run = async () => {
	if(!token) throw new Error("Github token not found");
	const payload = JSON.stringify(github.context.payload, undefined, 2)
	console.log(payload);
}

run()
	.then(() => { })
	.catch((err) => {
		console.log("ERROR", err);
		core.setFailed(err.message);
	})