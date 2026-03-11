import dotenv from "dotenv/config";
import {Ratelimit} from "@upstash/ratelimit";
import {Redis} from "@upstash/redis";



// create a ratelimiter that allows 10 request per 20 seconds
const rateLimit = new Ratelimit ({
    redis: Redis.fromEnv(),
    limiter: Ratelimit.slidingWindow(10, "20 s"),
});

export default rateLimit;