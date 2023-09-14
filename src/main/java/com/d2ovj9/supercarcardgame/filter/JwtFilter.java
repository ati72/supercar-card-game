package com.d2ovj9.supercarcardgame.filter;

import com.d2ovj9.supercarcardgame.repository.UserRepository;
import com.d2ovj9.supercarcardgame.util.JwtUtil;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;

@Component
public class JwtFilter extends OncePerRequestFilter {

    private final JwtUtil jwtUtil;

    private final UserRepository userRepository;

    @Autowired
    public JwtFilter(JwtUtil jwtUtil, UserRepository userRepository) {
        this.jwtUtil = jwtUtil;
        this.userRepository = userRepository;
    }


    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain
    ) throws ServletException, IOException {

        final String header = request.getHeader(HttpHeaders.AUTHORIZATION);
        if (!StringUtils.hasText(header) || (StringUtils.hasText(header)) && !header.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

        // part after bearer... accesstoken
        final String token = header.split(" ")[1].trim();

        // Get user id and set it on the spring security context
        UserDetails userDetails = userRepository
                .findByUsername(jwtUtil.getUsernameFromToken(token))
                .orElse(null);

        // Get jwt token and validate
        if (!jwtUtil.validateToken(token, userDetails)) {
            filterChain.doFilter(request, response);
            return;
        }

        UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
                userDetails,
                null,
                userDetails == null ? List.of() : userDetails.getAuthorities()
        );

        authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

        // this is where the auth magic happens and the user is now valid
        SecurityContextHolder.getContext().setAuthentication(authentication);
        filterChain.doFilter(request, response);

    }
}
