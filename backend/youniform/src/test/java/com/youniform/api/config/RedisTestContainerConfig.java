package com.youniform.api.config;

import org.junit.jupiter.api.extension.BeforeAllCallback;
import org.junit.jupiter.api.extension.ExtensionContext;
import org.testcontainers.containers.GenericContainer;
import org.testcontainers.junit.jupiter.Testcontainers;
import org.testcontainers.utility.DockerImageName;

@Testcontainers
public class RedisTestContainerConfig implements BeforeAllCallback {
    private static final String REDIS_IMAGE = "redis:7.0.8-alpine";
    private static final int REDIS_PORT = 6379;
    private GenericContainer<?> redis;

    @Override
    public void beforeAll(ExtensionContext extensionContext) throws Exception {
        redis = new GenericContainer<>(DockerImageName.parse(REDIS_IMAGE))
                .withCommand("redis-server --port " + REDIS_PORT)
                .withExposedPorts(REDIS_PORT);
        redis.start();

        String redisHost = redis.getHost();
        Integer redisPort = redis.getMappedPort(REDIS_PORT);

        System.setProperty("spring.redis.host", redisHost);
        System.setProperty("spring.redis.port", String.valueOf(redisPort));
    }
}
