package SpringProject.SpringProject;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import javax.crypto.SecretKey;

@Service
public class UserService {

    private static final String SECRET_KEY = "yourSecretKey"; // Replace with a secure key
    private static final long EXPIRATION_TIME = 24 * 60 * 60 * 1000; // Token validity in milliseconds (1 day)

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
        String token = generateToken(savedUser.getID(), savedUser.UserId(), savedUser.getEmailId());

        // Create and return the response
        return new RegistrationResponse(
                "Registration successful",
                token,
                savedUser.UserId(),
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
}
