'use strict';

const data = require('./db/notes');

console.log('hello world!');

const express = require('express');
const app = express();

app.use(express.static('public'));




app.listen(8080, () => console.log('server working'));
// INSERT EXPRESS APP CODE HERE...

// Noteful App Challenge: This afternoonyou will create a Node / Express app to host a client and serve an API to the client.Specifically, you will add a static.server() along with 2 GET endpoints, one to return a list of notes, another to return details on a specific note.Continue working with your partner this afternoon, but not in driver / navigator pairing mode.You will each create and work on your own version of the challenge, but you should stay in close contact helping each other as you work.