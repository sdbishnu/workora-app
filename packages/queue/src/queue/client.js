import { Queue } from "bullmq";
export function createQueue(name, connection) {
    return new Queue(name, { connection });
}
export function createQueueFromRedisConfig(name, config) {
    if (!config.configured) {
        throw new Error("Workora Redis configuration is not configured.");
    }
    return createQueue(name, {
        host: config.host,
        port: config.port
    });
}
