# Dutch Caribbean

This document describes how get a copy of Dutch Caribbean up and running.

## Modules

Install the node and bower modules:

	$ npm install

## compile the code

	export server=localhost:8080
	export NODE_ENV=development
	npm run-script build

## run a server

	npm start

## Backend

Ensure there's a Timbuctoo backend available with which the frontend
can communicate. Set the URL for this file in the `src/config.js` file.
