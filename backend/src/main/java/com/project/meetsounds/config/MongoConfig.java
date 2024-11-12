package com.project.meetsounds.config;

import com.mongodb.client.MongoClient;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.MongoDatabaseFactory;
import org.springframework.data.mongodb.core.MongoTemplate;

@Configuration
public class MongoConfig {

    @Bean
    public MongoTemplate mongoTemplate(MongoClient mongoClient, MongoDatabaseFactory mongoDbFactory) throws Exception {
        return new MongoTemplate(mongoDbFactory);
    }
}

