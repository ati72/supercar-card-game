package com.d2ovj9.supercarcardgame.security;

import com.d2ovj9.supercarcardgame.filter.JwtFilter;
import com.d2ovj9.supercarcardgame.service.UserDetailsServiceImpl;
import com.d2ovj9.supercarcardgame.util.CustomPasswordEncoder;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;


import java.util.Arrays;

@EnableWebSecurity
@Configuration
public class SecurityConfig {

    private final CustomPasswordEncoder encoder;
    private final UserDetailsServiceImpl userDetailsService;
    private final JwtFilter jwtFilter;

    @Autowired
    public SecurityConfig(CustomPasswordEncoder encoder, UserDetailsServiceImpl userDetailsService, JwtFilter jwtFilter) {
        this.encoder = encoder;
        this.userDetailsService = userDetailsService;
        this.jwtFilter = jwtFilter;
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .cors()
                .configurationSource(corsConfigurationSource())
                .and()

                .csrf().disable()
                .sessionManagement()
                    .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()

                .exceptionHandling()
                    .authenticationEntryPoint(((request, response, authException) -> {
                        response.sendError(HttpServletResponse.SC_UNAUTHORIZED, authException.getMessage());
                    }))
                .and()


                .authorizeHttpRequests((authz) ->
                        authz
                                .requestMatchers("/api/auth/**").permitAll()
                                .requestMatchers("/api/user/register").permitAll()
                                .requestMatchers("/api/user/delete/**").hasAuthority("ADMIN")
                                .requestMatchers("/api/cards/saveAll").hasAuthority("ADMIN")
                                .requestMatchers("api/cards/save").hasAuthority("ADMIN")
                                .requestMatchers(HttpMethod.PUT, "api/cards").hasAuthority("ADMIN")
                                .anyRequest().authenticated()
                )

                .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class)
                .httpBasic(Customizer.withDefaults())
                .authenticationProvider(authenticationProvider());


        return http.build();
    }

    @Bean
    public AuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authenticationProvider = new DaoAuthenticationProvider();
        authenticationProvider.setUserDetailsService(userDetailsService);
        authenticationProvider.setPasswordEncoder(encoder.getPasswordEncoder());
        return authenticationProvider;
    }

    private CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration corsConfiguration = new CorsConfiguration();
        corsConfiguration.setAllowedOrigins(Arrays.asList("http://localhost:5173"));
        corsConfiguration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE"));
        corsConfiguration.setAllowCredentials(true);
        corsConfiguration.addAllowedHeader("*");  // you can configure specific headers if needed

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", corsConfiguration);
        return source;
    }
}
