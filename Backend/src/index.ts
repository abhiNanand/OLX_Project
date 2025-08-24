import express, {Request, Response} from 'express';
import authRoutes from './routes/auth.routes';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;

if (!process.env.MONGO_URL) {
  console.error("MONGO_URL not defined in .env");
  process.exit(1);
}
mongoose.connect(process.env.MONGO_URL)
.then(()=>{console.log(("mongodb connected"))})
.catch((error)=>{console.log("mongodb connection error",error)});


app.use('/account',authRoutes);
app.get('/', (req: Request, res: Response) => {
    res.send('Hello, World!');
});



app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});