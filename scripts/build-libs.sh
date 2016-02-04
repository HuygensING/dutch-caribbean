#!/bin/sh

# Create dirs
rm -rf build/development
mkdir -p build/development/js
mkdir build/development/css

# Copy static content
cp -r src/static/* build/development
export NODE_ENV=development
# Bundle React libs
node_modules/.bin/browserify \
	--require classnames \
	--require immutable \
	--require react > build/development/js/react-libs.js
