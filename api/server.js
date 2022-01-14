const express = require('express');
const server = express();
const actionsRouter = require('./actions/actions-router');
const projectsRouter = require('./projects/projects-router')

server.use(express.json());
server.use('api/actions', actionsRouter);
server.use('api/projects', projectsRouter);

server.get('/', (req, res) => {
    res.send(`
    <h2>Api!!!<h2>
    `)
})

server.use('*', (req, res) => {
    res.status(404).json({ message: `${req.method} ${req.baseUrl} not found!` });
  });

server.use((err, req, res, next) => { // eslint-disable-line
    console.log('terrible')
    res.status(err.status || 500).json({
    message: `Oh Boy: ${err.message}`,
    })
  })
// Configure your server here
// Build your actions router in /api/actions/actions-router.js
// Build your projects router in /api/projects/projects-router.js
// Do NOT `server.listen()` inside this file!

module.exports = server;
