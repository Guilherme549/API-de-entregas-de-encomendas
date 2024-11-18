import { app } from "@/app"
import dotenv from 'dotenv';
import { env } from './env';

dotenv.config();

const PORT = env.PORT

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))