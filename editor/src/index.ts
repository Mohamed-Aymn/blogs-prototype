import express from 'express';
import path from 'path';

const app = express();
const port = process.env.PORT || 3000;

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, '../ui/dist')));

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});