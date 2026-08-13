import { Redis } from "ioredis";
export function createRedisClient(connection) {
    return new Redis({
        host: connection.host,
        port: connection.port
    });
}
