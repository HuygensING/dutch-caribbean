#!/bin/sh

mkdir -p "build/${NODE_ENV}/js"
cp -R src/static/* "build/${NODE_ENV}/"

if [ "$1" = "--watch" ]; then
	cmd="watchify"
	styluswatch="--watch"
else
	cmd="browserify"
	styluswatch=""
fi

node_modules/.bin/browserify \
	--transform [ envify --NODE_ENV="${NODE_ENV}" ] \
	--require classnames \
	--require react \
	--require react-dom > "build/${NODE_ENV}/js/react-libs.js"


./node_modules/.bin/stylus \
	--use nib \
	--compress \
	--out "build/${NODE_ENV}/css" \
	$styluswatch \
	src/stylus/index.styl &

node_modules/.bin/$cmd src/index.jsx \
	--debug \
	--outfile "build/${NODE_ENV}/js/react-src.js" \
	--extension=.jsx \
	--external react \
	--external react-dom \
	--external classnames \
	--standalone ExcelImportMock \
	--transform [ babelify --presets [ es2015 react ] --plugins [ transform-es2015-destructuring transform-object-rest-spread transform-object-assign] ] \
	--transform [ envify --NODE_ENV="${NODE_ENV}" --server="$server" ] \
	--verbose
