import bcrypt from "bcrypt"
import { prisma } from "../src/lib/prisma"

async function main() {
    const hashedPassword = await bcrypt.hash("Jannatul321", 10)
    await prisma.user.upsert({
        where: {
            email: "jannatul321@gmail.com"
        },
        update:{

        },
        create:{
            name: "Jannatul",
            email: "jannatul321@gmail.com",
            password: hashedPassword,
            role: "ADMIN"
        }
    }
)
}

main()
    .then(()=> prisma.$disconnect())
    .catch(async(e)=>{
        console.log(e);
        await prisma.$disconnect();
        process.exit(1)
    })