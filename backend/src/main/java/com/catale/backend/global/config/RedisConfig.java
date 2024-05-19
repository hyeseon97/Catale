package com.catale.backend.global.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.cache.RedisCacheConfiguration;
import org.springframework.data.redis.cache.RedisCacheManager;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.connection.RedisPassword;
import org.springframework.data.redis.connection.RedisStandaloneConfiguration;
import org.springframework.data.redis.connection.lettuce.LettuceConnectionFactory;
import org.springframework.data.redis.repository.configuration.EnableRedisRepositories;
import org.springframework.data.redis.serializer.GenericJackson2JsonRedisSerializer;
import org.springframework.data.redis.serializer.RedisSerializationContext;
import org.springframework.data.redis.serializer.StringRedisSerializer;

import java.time.Duration;
import java.util.HashMap;
import java.util.Map;

@Configuration
@EnableCaching
@EnableRedisRepositories(basePackages = "com.catale.backend.global.jwt.repository")
public class RedisConfig {

    @Value("${spring.data.redis.host}")
    private String host;

    @Value("${spring.data.redis.port}")
    private int port;

    @Value("${spring.data.redis.password}")
    private String password;

//    @Bean
//    public RedisConnectionFactory redisConnectionFactory() {
//        return new LettuceConnectionFactory(host, port);
//    }

//    @Bean
//    public RedisConnectionFactory redisConnectionFactory() {
//        LettuceConnectionFactory lettuceConnectionFactory = new LettuceConnectionFactory();
//        lettuceConnectionFactory.setHostName(host);
//        lettuceConnectionFactory.setPort(port);
//        lettuceConnectionFactory.setPassword(password);
//        lettuceConnectionFactory.setUser
//        return lettuceConnectionFactory;
//    }

    @Bean
    public RedisConnectionFactory redisConnectionFactory() {
        RedisStandaloneConfiguration config = new RedisStandaloneConfiguration();
        config.setHostName(host);
        config.setPort(port);
//        config.setPassword(RedisPassword.of(password));
        config.setPassword(password);
        config.setDatabase(0);
        // Redis 6 이상에서 사용자 이름이 필요한 경우 다음 줄을 추가하세요.
//        config.setUsername("");
        return new LettuceConnectionFactory(config);
    }

    @Bean
    public RedisCacheManager cacheManager(RedisConnectionFactory connectionFactory) {
        return RedisCacheManager.builder(connectionFactory)
                                .cacheDefaults(defaultCacheConfig())
                                .build();
    }

    // 기본 캐시 구성 (TTL: 1시간)
    private RedisCacheConfiguration defaultCacheConfig() {
        return RedisCacheConfiguration.defaultCacheConfig()
                                      .serializeKeysWith(
                                          RedisSerializationContext.SerializationPair.fromSerializer(
                                              new StringRedisSerializer()))
                                      .serializeValuesWith(
                                          RedisSerializationContext.SerializationPair.fromSerializer(
                                              new GenericJackson2JsonRedisSerializer()))
                                      .entryTtl(Duration.ofHours(1));
    }


}