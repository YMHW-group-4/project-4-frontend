const express = require('express')
const cors = require('cors');

const app = express()
app.use(cors());

const port = 3000;
var availableNodes = [];

app.get('/register_node', (req, res) => {
	const port = req.query.port
	const host = req.query.host
	const ipString = req.headers['x-forwarded-for'] || req.socket.remoteAddress
	const ipSplit = ipString.split(':');
	const ip = ipSplit[ipSplit.length - 1];

	if (port != null && host != null) {
		const url = `http://${host}${port}`;
		const alreadyRegistered = availableNodes.find((node) => node.url === url);
		if (alreadyRegistered == null) {
			availableNodes.push({host, port, url, connections: 0, ip});
		}
		const success = {success: `Node: ${host}:${port} is now registered.`, ip};
		res.send(JSON.stringify(success));
	} else {
		const error = {
			error: '`Missing the host and or port parameters', body: `received, host: ${host} and port: ${port}`
		}
		res.send(JSON.stringify(error));
	}
})

app.get('/get_node', (req, res) => {
	try {
		const node = availableNodes.reduce((prev, curr) => prev.connections < curr.connections ? prev : curr);
		node.connections++;
		res.send(JSON.stringify(node));
	} catch (_) {
		const error = {error: 'No nodes registered, Register a node using /register_node?host=[HOST]&port=[PORT]'}
		res.send(JSON.stringify(error));
	}
})

app.get('/get_all_nodes', (req, res) => {
	try {
		res.send(JSON.stringify(availableNodes));
	} catch (_) {
		const error = {error: 'No nodes registered, Register a node using /register_node?host=[HOST]&port=[PORT]'}
		res.send(JSON.stringify(error));
	}
})


app.get('/clear', (req, res) => {
	availableNodes = [];
	try {
		res.send("All nodes are cleared");
	} catch (_) {
		const error = {error: 'Something whened wrong'}
		res.send(JSON.stringify(error));
	}
})

app.listen(port);
console.log(`listening on http://localhost:${port}`);
