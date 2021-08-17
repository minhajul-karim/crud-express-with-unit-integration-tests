const env = require('dotenv');
const app = require('./app');

env.config();
console.log(process.env.PORT);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});
