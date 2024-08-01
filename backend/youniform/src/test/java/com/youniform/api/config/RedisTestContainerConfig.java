package com.youniform.api.config;

import org.springframework.context.ApplicationContextInitializer;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.test.context.DynamicPropertyRegistry;
import org.springframework.test.context.DynamicPropertySource;
import org.testcontainers.containers.GenericContainer;
import org.testcontainers.utility.DockerImageName;

public class RedisTestContainerConfig implements ApplicationContextInitializer<ConfigurableApplicationContext> {
    private static final String REDIS_IMAGE = "redis:7.0.8-alpine";
    private static final int REDIS_PORT = 8379;
    private static GenericContainer<?> redis = new GenericContainer<>(DockerImageName.parse(REDIS_IMAGE))
            .withExposedPorts(REDIS_PORT)
            .withCommand("redis-server --port " + REDIS_PORT);

    static {
        redis.start();
    }

    @Override
    public void initialize(ConfigurableApplicationContext configurableApplicationContext) {
        String redisHost = redis.getHost();
        Integer redisPort = redis.getMappedPort(REDIS_PORT);

        System.setProperty("spring.redis.host", redisHost);
        System.setProperty("spring.redis.port", String.valueOf(redisPort));
    }

    @DynamicPropertySource
    static void redisProperties(DynamicPropertyRegistry registry) {
        registry.add("spring.redis.host", redis::getHost);
        registry.add("spring.redis.port", () -> redis.getMappedPort(REDIS_PORT));
    }
}