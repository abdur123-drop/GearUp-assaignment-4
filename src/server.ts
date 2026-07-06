import app from "./app"
import config from "./config";
import { prisma } from "./lib/prisma";

const port = config.port;

async function main() {
    try {
        app.listen(port, async()=>{
            // await prisma.$connect()
            // console.log('Client connected');
            console.log(`server is running on post ${port}`);
        })
    } catch (error) {
        console.error("Error starting the server:", error)
        // await prisma.$disconnect()
        process.exit(1)
    }
}

main()