package com.catale.backend.global.config;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import io.swagger.v3.oas.models.servers.Server;
import org.springdoc.core.models.GroupedOpenApi;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@OpenAPIDefinition(
    info = @Info(title = "catale API 명세서",
                 description = "catale 서비스 API 명세서",
                 version = "v1"))
@Configuration
public class SwaggerConfig {

    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
            .addServersItem(new Server().url("/"))
            .addSecurityItem(new SecurityRequirement().addList("BearerAuth"))
            .components(new Components()
                            .addSecuritySchemes("BearerAuth", new SecurityScheme()
                                .name("Authorization")
                                .type(SecurityScheme.Type.HTTP)
                                .scheme("Bearer")
                                .bearerFormat("JWT")));
    }

    // swagger 그룹 추가
    // 전체보기
    @Bean
    public GroupedOpenApi all() {
        return GroupedOpenApi.builder()
                             .group("a. 전체")
                             .pathsToMatch("/api/v1/**")
                             .build();
    }

    @Bean
    public GroupedOpenApi memberGroup() {
        return GroupedOpenApi.builder()
                             .group("b. 회원")
                             .pathsToMatch("/api/v1/member/**")
                             .build();
    }

    @Bean
    public GroupedOpenApi cocktailGroup() {
        return GroupedOpenApi.builder()
                .group("c. 칵테일")
                .pathsToMatch("/api/v1/cocktail/**")
                .build();
    }

    @Bean
    public GroupedOpenApi diaryGroup() {
        return GroupedOpenApi.builder()
                .group("d. 다이어리")
                .pathsToMatch("/api/v1/diary/**")
                .build();
    }
    @Bean
    public GroupedOpenApi imageGroup() {
        return GroupedOpenApi.builder()
                .group("e. 이미지")
                .pathsToMatch("/api/v1/image/**")
                .build();
    }


    @Bean
    public GroupedOpenApi menuGroup() {
        return GroupedOpenApi.builder()
                             .group("f. 메뉴")
                             .pathsToMatch("/api/v1/menu/**")
                             .build();
    }

    @Bean
    public GroupedOpenApi reviewGroup() {
        return GroupedOpenApi.builder()
                .group("g. 리뷰")
                .pathsToMatch("/api/v1/review/**")
                .build();
    }

    @Bean
    public GroupedOpenApi storeGroup() {
        return GroupedOpenApi.builder()
                .group("h. 가게")
                .pathsToMatch("/api/v1/store/**")
                .build();
    }


}
