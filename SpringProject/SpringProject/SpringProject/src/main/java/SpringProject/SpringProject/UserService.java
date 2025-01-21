package SpringProject.SpringProject;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    private final DataModelRepository repository;
    private final PasswordEncoder passwordEncoder;
    public UserService(DataModelRepository repository, PasswordEncoder passwordEncoder) {
        this.repository = repository;
        this.passwordEncoder = passwordEncoder;
    }

    // Register a new user
    public String registerUser(Users data) {
        // Check if the user already exists
        Optional<Users> existingUser = repository.findByEmailId(data.getEmailId());
        if (existingUser.isPresent()) {
            return "User already exists";
        }

        // Hash the password before saving
        String hashedPassword = passwordEncoder.encode(data.getPassword());
        data.setPassword(hashedPassword);

        // Save the user
        repository.save(data);

        return "User registered successfully";
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