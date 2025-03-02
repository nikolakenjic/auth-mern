import express from 'express';

const app = express();

app.get('/', (req, res) => {
  res.send('Node auth');
});

app.listen(3500, () =>
  console.log('Listening on port 4004 in dev environment')
);
