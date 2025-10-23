import dotenv from 'dotenv'
import app from './app'
import config from './config';

dotenv.config()

app.listen(config.PORT,() => {
    console.log(`[⚡ INFO] Server running on http://localhost:${config.PORT}`);
})