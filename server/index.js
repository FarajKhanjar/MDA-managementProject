const express = require('express');
const cors = require('cors');
const connectDB = require('./configs/db');
var bodyParser = require('body-parser');

//const authRouter = require('./routers/authRouter');
const employeesRouter = require('./routers/employeesRouter');
const departmentsRouter = require('./routers/departmentsRouter');
const shiftsRouter = require('./routers/shiftsRouter');

const app = express();
const port = 8080;

connectDB();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(express.json());

// routers
//app.use('/auth', authRouter);
app.use('/employees', employeesRouter);
app.use('/departments', departmentsRouter);
app.use('/shifts', shiftsRouter);


app.listen(port, () => {
  console.log(`app is listening at http://localhost:${port}`);
});