const indexRoute = require('./routes');
const app = require('./app')
require('dotenv').config();
const { API_PORT } = process.env;
const port = process.env.PORT || API_PORT

app.use(indexRoute);

app.listen(port, () => {
  console.log('Server runing on port '+port)
});
