import app from './app.js';
import { connectDB } from './config/db.js';
import { env } from './config/env.js';

// Establish Mongoose Database Connection
connectDB();

const PORT = env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Invitely Server is listening on port ${PORT}`);
});
