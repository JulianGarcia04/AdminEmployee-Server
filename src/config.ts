import {config} from 'dotenv';

config();

export default {
    PORT:process.env.PORT,
    URL: process.env.URL,
    SECRET : process.env.SECRET
}