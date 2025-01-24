package SpringProject.SpringProject;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import javax.crypto.SecretKey;

@Service
public class UserService {

    private static final long EXPIRATION_TIME = 7 * 60 * 1000; // Token validity in milliseconds (7 minute)

    private final DataModelRepository repository;
    private final PasswordEncoder passwordEncoder;

    public UserService(DataModelRepository repository, PasswordEncoder passwordEncoder) {
        this.repository = repository;
        this.passwordEncoder = passwordEncoder;
    }

    // Register a new user
    public RegistrationResponse registerUser(Users data) {
        // Check if the user already exists
        Optional<Users> existingUser = repository.findByEmailId(data.getEmailId());
        if (existingUser.isPresent()) {
        	return new RegistrationResponse("User already exists"); // Handle appropriately
        }

        // Hash the password before saving
        String hashedPassword = passwordEncoder.encode(data.getPassword());
        data.setPassword(hashedPassword);

        // Save the user
        Users savedUser = repository.save(data);

        // Generate JWT token
        String token = generateToken(savedUser.getID(), savedUser.getUserId(), savedUser.getEmailId());

        // Create and return the response
        return new RegistrationResponse(
                "Registration successful",
                token,
                savedUser.getUserId(),
                savedUser.getID()
        );
    }

    // Generate JWT token
    private String generateToken(long id, String userId, String email) {
    	  SecretKey key = Keys.secretKeyFor(SignatureAlgorithm.HS256);

        return Jwts.builder()
                .setSubject(email)
                .claim("id", id)
                .claim("userId", userId)
                .claim("email", email)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(key)
                .compact();
    }

    // Fetch all users
    public List<Users> getAllUsers() {
        return repository.findAll();
    }

    // Fetch a user by ID
    public Optional<Users> getUserById(long id) {
        return repository.findById(id);
    }
    //Login after Registration
    public Map<String, Object> loginUser(String email, String password) {
        // Check if the user exists
        Optional<Users> userOptional = repository.findByEmailId(email);
        if (userOptional.isEmpty()) {
            throw new RuntimeException("Invalid email");
        }

        Users user = userOptional.get();

        // Validate the password
//        String hashedPassword = passwordEncoder.encode(password);
        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new RuntimeException("Invalid email or password");
        }

        // Generate JWT token
        String token = generateToken(user.getID(), user.getUserId(), user.getEmailId());

        // Return a map with the response details
        Map<String, Object> response = new HashMap<>();
        response.put("message", "Login successful");
        response.put("token", token);
        response.put("userId", user.getUserId());
        response.put("id", user.getID());

        return response;
    }
}
