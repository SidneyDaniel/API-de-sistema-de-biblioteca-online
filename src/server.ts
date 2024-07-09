import { SetupAplication } from "./app";

class Server {
    static start(): void {
        const aplication = new SetupAplication(3000);
        aplication.init();
        aplication.start();

    }
}

Server.start();