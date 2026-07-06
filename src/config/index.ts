import dotenv from 'dotenv'
import path from 'path'

dotenv.config({path: path.join(process.cwd(), '.env')})


export default {
    port: process.env.PORT || 5000,
    bcrypt_salt_round: process.env.BCRYPT_SALT_ROUNDS,
    jwt_access_token_secret: process.env.JWT_ACCESS_TOKEN_SECRET,
    jwt_access_token_expires_in: process.env.JWT_ACCESS_TOKEN_EXPIRES_IN,

}