import dotenv from 'dotenv';
dotenv.config();

import { app } from "@/app"

const PORT = 3333

app.listen(PORT, () => console.log(`Server is runningon port ${PORT}`))