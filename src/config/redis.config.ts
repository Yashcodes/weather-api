import { createClient, RedisClientType } from "redis";

class Redis {
    private static instance: RedisClientType;

    private constructor() {};
    public static getInstance() : RedisClientType {
        if(!Redis.instance) {
            Redis.instance = createClient({
                url: "redis://localhost:6379"
            });

            Redis.instance.on("error", (error) => console.log(error));
            Redis.instance.on("connect", () => console.log("Redis connected"));
        }

        return Redis.instance;
    }
}

export const redisClient = Redis.getInstance();