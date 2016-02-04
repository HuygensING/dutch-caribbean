#!/bin/sh

./node_modules/.bin/stylus \
	--use nib \
	--compress \
	--out build/development/css/style.css \
	src/stylus/index.styl

# Build React JS
node_modules/.bin/browserify src/index.jsx \
	--extension=.jsx \
	--external classnames \
	--external immutable \
	--external react \
	--standalone WomenWritersEdit \
	--transform [ babelify --plugins object-assign ] \
	--verbose > build/development/js/react-src.js