import express from 'express';
import cors from 'cors';
import userRouter from './router/userRouter.js';
import loginRouter from "./router/loginRouter.js"

const app = express();
const port =  process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use("/users", userRouter);
app.use("/login", loginRouter)


app.listen(port, () =>{
    console.log(`App listening to port ${port}`)
});