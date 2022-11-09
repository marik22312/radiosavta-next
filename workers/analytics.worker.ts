
addEventListener('message', (message) =>{
	const string = `Parsed in worker ${message.data}`
	console.log('Got message inside worker', message)
	postMessage(string)
})

export {}