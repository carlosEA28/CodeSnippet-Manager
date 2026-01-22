import dotenv from 'dotenv'
dotenv.config()


import {app} from "./app";
import RabbitMQServer from "./lib/broker/rabbitmqServer";
import {sendWelcomeEmail} from "./use-cases/sendWelcomeEmail";
import {sesService} from './lib/aws'


async function start() {
    const rabbitmq =  new RabbitMQServer("amqp://guest:guest@localhost:5672/")
    await rabbitmq.start()

   const oi = await rabbitmq.consume("user.created.queue", async (message)=>{
        console.log(message.content.toString());

        const event = JSON.parse(message.content.toString());

        await sendWelcomeEmail(event.Email);
    })



    app.listen(process.env.HTTP_PORT, () => {
        console.log("Server started on port: " + process.env.HTTP_PORT);
    })
}

start().catch(console.error);