package com.catale.backend.global.config;

import com.catale.backend.global.entrypoint.JwtAuthenticationEntryPoint;
import com.catale.backend.global.filter.EmailVerificationFilter;
import com.catale.backend.global.filter.JwtAuthenticationFilter;
import com.catale.backend.global.filter.TokenExceptionFilter;
import com.catale.backend.global.filter.TokenRefreshRequestFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;
    private final JwtAuthenticationFilter jwtAuthenticationFilter;
    private final TokenExceptionFilter tokenExceptionFilter;
    private final EmailVerificationFilter emailVerificationFilter;
    private final TokenRefreshRequestFilter tokenRefreshRequestFilter;

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity security) throws Exception {

        security
            .httpBasic(basic -> basic.disable())
            .csrf(csrf -> csrf.disable())
//            .cors(cors -> cors.disable())
        ;

        security
            .authorizeHttpRequests((authorize ->
            {
                authorize.requestMatchers(
                    "/api-docs/**",
                    "/v2/api-docs/**",
                    "/v3/api-docs/**",
                    "/webjars/**",
                    "/swagger/**",
                    "/swagger-ui/**",
                    "/swagger-config/**",
                    "/swagger-resources/**",
                    "/favicon.ico",
                    "/api/v1/member/signup",
                    "/api/v1/member/social",
                    "/api/v1/member/login/**",
                    "/api/v1/member/nickname/**",
                    "/api/v1/member/email/**",
                    "/api/v1/member/password-reset",
//                    "/api/v1/cocktail/**",
//                    "/api/v1/diary/**",
//                    "/api/v1/image/**",
//                    "/api/v1/menu/**",
//                    "/api/v1/review/**",
//                    "/api/v1/store/**",
                    "/ws/**",
                    "/pub/**",
                    "/sub/**",
                        "/actuator/**"
                ).permitAll();
                authorize.requestMatchers(HttpMethod.OPTIONS, "/api/**").permitAll();
                authorize.anyRequest().authenticated();
            }))
        ;

        security
            .sessionManagement(sessionManager -> {
                sessionManager.sessionCreationPolicy(SessionCreationPolicy.STATELESS);
            })
        ;

        security
            .addFilterBefore(emailVerificationFilter,
                             UsernamePasswordAuthenticationFilter.class)
            .addFilterBefore(tokenRefreshRequestFilter,
                             UsernamePasswordAuthenticationFilter.class)
            .addFilterBefore(jwtAuthenticationFilter,
                             UsernamePasswordAuthenticationFilter.class)
            .addFilterBefore(tokenExceptionFilter,
                             UsernamePasswordAuthenticationFilter.class)
        ;

        security.exceptionHandling(handlingConfigurer -> {
            handlingConfigurer.authenticationEntryPoint(jwtAuthenticationEntryPoint);
        });

        return security.build();
    }


}
