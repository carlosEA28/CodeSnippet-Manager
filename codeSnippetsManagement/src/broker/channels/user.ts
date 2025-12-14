import { broker } from "../broker";

export const user = await broker.createChannel();

await user.assertQueue("user");
