package SpringProject.SpringProject;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
    @Bean
    PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable()) // Disable CSRF for simplicity; enable in production if necessary
            .cors(cors -> cors.configurationSource(corsConfigurationSource())) // Enable CORS with the custom configuration
            .authorizeHttpRequests(auth -> auth
                .requestMatchers(
                    "/api/users/registration", 
                    "/api/users/data", 
                    "/api/users/data/{id}", 
                    "/api/users/login"
                ).permitAll() // Allow public access to specified endpoints
                .anyRequest().authenticated() // All other endpoints require authentication
            )
            .formLogin(form -> form.disable())
            .logout(logout -> logout
                .permitAll() // Allow everyone to access the logout endpoint
            );

        return http.build();
    }

    // CORS Configuration Bean
    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(List.of("http://localhost:3000", "http://your-frontend-domain.com")); // Add allowed origins
        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS")); // Add allowed HTTP methods
        configuration.setAllowedHeaders(List.of("Authorization", "Content-Type")); // Add allowed headers
        configuration.setAllowCredentials(true); // Allow credentials (e.g., cookies)

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration); // Apply CORS settings to all endpoints
        return source;
    }
}
