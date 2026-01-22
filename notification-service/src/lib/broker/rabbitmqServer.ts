import {Connection,Channel,connect,Message } from 'amqplib'

export default class RabbitMQServer {
// @ts-ignore
    private conn: Connection;
    // @ts-ignore
    private channel: Channel;

    constructor(private uri: string) {

    }

    async start(): Promise<void> {
        // @ts-ignore
        this.conn = await connect(this.uri)
        // @ts-ignore
        this.channel = await this.conn.createChannel()
    }

    async publishInQueue(queue:string, message:string) {
        return this.channel.sendToQueue(queue, Buffer.from(message))
    }

    async consume(queue:string, callback:(message:Message)=>void){
        return this.channel.consume(queue, (message)=> {
            // @ts-ignore
            callback(message)
            // @ts-ignore
            this.channel.ack(message)
        })
}}



