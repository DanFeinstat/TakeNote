
import  express  from 'express';
import cors from 'cors';
import notesRoutes from './routes/notesRoutes';
import path from 'path';

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());
app.use(cors());
app.use('/api', notesRoutes);

app.use(express.static(path.join(__dirname, 'build')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });



app.listen(PORT, ()=>{console.log(`Server is running on port ${PORT}`)});