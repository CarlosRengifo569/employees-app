let express = require('express');
let path = require('path');
let app = express();
let port = 8089;

app.use(express.static('employees-app'));
app.get('*', (req, res, next) => {
  res.sendFile(path.resolve('employees-app/index.html'));
});
app.listen(port, () => {
  console.log('Express server started in port ' + port);
});
