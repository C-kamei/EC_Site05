package com.example.demo.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .authorizeRequests(authorizeRequests -> authorizeRequests
                .requestMatchers("/css/**", "/js/**", "/images/**").permitAll() // 認証を使わないURLを設定
                .requestMatchers("/fruits").authenticated() // 認証が必要になるURLを設定
            )
            .httpBasic() // BASIC認証を有効にする
            .and()
            .csrf().disable(); // CSRF対策をOFFにする
        return http.build();
    }

    @Bean
    public UserDetailsService userDetailsService() {
        UserDetails user = User.withDefaultPasswordEncoder()
            .username("＊＊＊＊＊")
            .password("＊＊＊＊＊＊＊")
            .roles("USER")
            .build();
        return new InMemoryUserDetailsManager(user);
    }
}
