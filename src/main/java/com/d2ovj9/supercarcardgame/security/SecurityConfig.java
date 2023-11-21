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

    // Spring Security konfiguráció

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
                // Lentebbi cors konfig hozzáadása a filterChainhez
                .cors()
                .configurationSource(corsConfigurationSource())
                .and()

                // Cross Site Request Forgery beállítások kikapcsolva az egyszerűség kedvéért
                .csrf().disable()
                .sessionManagement()
                    .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()

                // Auth hiba exception
                .exceptionHandling()
                    .authenticationEntryPoint(((request, response, authException) -> {
                        response.sendError(HttpServletResponse.SC_UNAUTHORIZED, authException.getMessage());
                    }))
                .and()

                // Adott route-ok engedélyei, permitAll->nyilvános, hasAuthority->adott nevű jogosultságú felhasználóknak
                // minden más útvonalon kell a jwt a kérésben
                .authorizeHttpRequests((authz) ->
                        authz
                                .requestMatchers("/api/auth/**").permitAll()
                                .requestMatchers("/api/user/register").permitAll()
                                .requestMatchers("/api/user/initAdmin").permitAll()
                                .requestMatchers("/api/cards/saveAll").permitAll()
                                .requestMatchers("/api/user/delete/**").hasAuthority("ADMIN")
                                .requestMatchers("api/cards/save").hasAuthority("ADMIN")
                                .requestMatchers(HttpMethod.PUT, "api/cards").hasAuthority("ADMIN")
                                .anyRequest().authenticated()
                )

                .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class)
                .httpBasic(Customizer.withDefaults())
                .authenticationProvider(authenticationProvider());


        return http.build();
    }

    // Az authentikációt megvalósító bean, userDetailsService-t használja az adatok lekéréséhez
    // encoder-t a jelszavak ellenörzéséhez
    @Bean
    public AuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authenticationProvider = new DaoAuthenticationProvider();
        authenticationProvider.setUserDetailsService(userDetailsService);
        authenticationProvider.setPasswordEncoder(encoder.getPasswordEncoder());
        return authenticationProvider;
    }

    // Cross Origin Resource Sharing beállítások, engedélyezett portok (ahonnan jöhet kérés),
    // engedélyezett HTTP metódusok
    private CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration corsConfiguration = new CorsConfiguration();
        corsConfiguration.setAllowedOrigins(Arrays.asList("http://localhost:5173"));
        corsConfiguration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE"));
        corsConfiguration.setAllowCredentials(true);
        corsConfiguration.addAllowedHeader("*");

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", corsConfiguration);
        return source;
    }
}
