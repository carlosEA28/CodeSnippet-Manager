import {app} from "./app";
import RabbitMQServer from "./lib/broker/rabbitmqServer";


async function start() {
    const rabbitmq =  new RabbitMQServer("amqp://guest:guest@localhost:5672/")
    await rabbitmq.start()

   await rabbitmq.consume("user.created.queue", (message)=>{
        console.log(message.content.toString());
    })


    app.listen(process.env.HTTP_PORT, () => {
        console.log("Server started on port: " + process.env.HTTP_PORT);
    })
}

start().catch(console.error);