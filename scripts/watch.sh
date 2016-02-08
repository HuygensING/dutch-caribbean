#!/bin/sh

./node_modules/.bin/stylus \
	--use nib \
	--compress \
	--sourcemap \
	--out build/development/css/style.css \
	--watch \
	src/stylus/index.styl &

node_modules/.bin/watchify src/index.jsx \
	--extension=.jsx \
	--external classnames \
	--external immutable \
	--external react \
	--outfile build/development/js/react-src.js \
	--standalone WomenWritersEdit \
	--transform [ babelify --plugins object-assign ] \
	--verbose
