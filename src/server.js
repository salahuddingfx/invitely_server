import app from './app.js';
import { connectDB } from './config/db.js';
import { env } from './config/env.js';

// Establish Mongoose Database Connection
connectDB();

const PORT = env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`\x1b[36m
  ___             _ _   _       
 |_ _|_ __ __   _(_) |_| | _   _ 
  | || '_ \\\\ \\ / /| | __| | | | |
  | || | | |\\ V / | | |_| | |_| |
 |___|_| |_| \\_/  |_|\\__|_|\\__, |
                           |___/ 
\x1b[33m ══════════════════════════════════════════════════════════════
  ► INVITELY API SERVER : \x1b[32mActive & Listening\x1b[33m
  ► PORT                : \x1b[32m${PORT}\x1b[33m
  ► DEVELOPER           : \x1b[35mSalah Uddin Kader & Nextora Studio\x1b[33m
  ► ENGINE              : \x1b[32mAntigravity AI (Pair Programming)\x1b[33m
 ══════════════════════════════════════════════════════════════\x1b[0m`);
});
