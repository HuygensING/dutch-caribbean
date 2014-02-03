# Dutch Caribbean

This document describes how get a copy of Dutch Caribbean up and running.

## Modules

Install the node and bower modules:

	$ npm install
	$ bower install

## Running grunt

	grunt watch

## Backend

Ensure there's a Timbuctoo backend available with which the frontend
can communicate. Set the URL for this file in the `src/coffee/config.coffee`
file.
