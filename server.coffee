port = process.argv[2] || 3000 # Default to port 3000
staticDir = if port % 2 is 0 then 'dev' else 'stage' # If the port is an even number go to dev/, if odd, go to stage/

_ = require 'underscore'

express = require('express')
app = express()

app.use express.static __dirname + '/' + staticDir
app.use express.bodyParser()
app.use express.compress()

app.all '/*', (req, res) ->
  res.sendfile 'index.html', root: __dirname+'/'+staticDir	

app.listen port, 'localhost'
console.log "Server running #{staticDir}/ on http://localhost:#{port}"