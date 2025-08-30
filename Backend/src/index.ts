import express, {Request, Response} from 'express';

// routes
import authRoutes from './routes/auth.routes';
import productRoutes from './routes/product.routes'; 
import wishlistRoutes from './routes/wishlist.routes';

//libraries
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import cookieParser from 'cookie-parser';

dotenv.config();

const app = express();
app.use(express.json());


app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);
app.use(cookieParser());

const PORT = process.env.PORT || 5000;

if (!process.env.MONGO_URL) {
  console.error("MONGO_URL not defined in .env");
  process.exit(1);
}
mongoose.connect(process.env.MONGO_URL)
.then(()=>{console.log(("mongodb connected"))})
.catch((error)=>{console.log("mongodb connection error",error)});

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use('/account', authRoutes);
app.get('/', (req: Request, res: Response) => {
    res.send('Hello, World!');
});

app.use('/categories', productRoutes);
app.use('/wishlist', wishlistRoutes);

 

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});