
import  express  from 'express';
import cors from 'cors';
import notesRoutes from './routes/notesRoutes';


const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());
app.use(cors());
app.use('/api', notesRoutes);

app.listen(PORT, ()=>{console.log(`Server is running on port ${PORT}`)});