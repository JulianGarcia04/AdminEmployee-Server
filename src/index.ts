import Config from "./app";
import "./db/connection";

class Server extends Config {

    private PORT:number;

    constructor() {
        super();
        this.PORT = this.app.get('PORT')
    }

    listen(){
        this.app.listen(this.PORT, ()=>{
            console.log('this server is founding in the port '+this.PORT);
        })
    }
}

new Server().listen();