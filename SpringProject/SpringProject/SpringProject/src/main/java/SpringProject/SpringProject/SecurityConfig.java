package SpringProject.SpringProject;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;


@Configuration
@EnableWebSecurity
public class SecurityConfig{
    @Bean
    PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable()) // Disable CSRF for simplicity; enable in production if necessary
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/user/registration","/api/user/data","/api/user/data/{id}").permitAll() // Allow public access to registration endpoint
                .anyRequest().authenticated() // All other endpoints require authentication
            )
            .formLogin(form -> form.disable())
            .logout(logout -> logout
                .permitAll() // Allow everyone to access the logout endpoint
            );

        return http.build();
    }
}