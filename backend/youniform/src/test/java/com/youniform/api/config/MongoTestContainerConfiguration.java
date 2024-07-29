package com.youniform.api.config;

import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.SimpleMongoClientDatabaseFactory;
import org.springframework.data.mongodb.core.convert.DefaultMongoTypeMapper;
import org.springframework.data.mongodb.core.convert.MappingMongoConverter;
import org.springframework.data.mongodb.core.mapping.MongoMappingContext;
import org.testcontainers.containers.MongoDBContainer;

@TestConfiguration
public class MongoTestContainerConfiguration {
    @Bean
    public MongoDBContainer mongoDBContainer() {
        MongoDBContainer mongoDBContainer = new MongoDBContainer("mongo:4.2.3");
        mongoDBContainer.start();
        return mongoDBContainer;
    }

    @Bean
    public MongoTemplate mongoTemplate(MongoDBContainer mongoDBContainer) {
        SimpleMongoClientDatabaseFactory mongoDbFactory = new SimpleMongoClientDatabaseFactory(mongoDBContainer.getReplicaSetUrl());
        MappingMongoConverter converter = new MappingMongoConverter(mongoDbFactory, new MongoMappingContext());
        converter.setTypeMapper(new DefaultMongoTypeMapper(null));
        return new MongoTemplate(mongoDbFactory, converter);
    }
}
