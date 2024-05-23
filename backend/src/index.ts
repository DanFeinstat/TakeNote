
import  express  from 'express';
import cors from 'cors';
import notesRoutes from './routes/notesRoutes';

const PORT = process.env.PORT || 3001;

const app = express();

app.get('/', (req, res) => {
    res.sendFile(__dirname + '../../client/build/index.html'),
    function(err: Error) {
        if(err) {
            res.status(500).send(err);
        }
    }
});

app.listen(PORT, ()=>{console.log(`Server is running on port ${PORT}`)});