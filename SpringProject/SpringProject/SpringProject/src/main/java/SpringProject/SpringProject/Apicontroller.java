package SpringProject.SpringProject;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class ApiController {

    @Autowired
    private UserService userService;

    // Register a new user
    @PostMapping("/user/registration")
    public RegistrationResponse registerUser(@RequestBody Users user) {
        return userService.registerUser(user);
    }
    //Login
    @PostMapping("/user/login")
    public ResponseEntity<Map<String, Object>> loginUser(@RequestBody Map<String, String> loginRequest) {
        String email = loginRequest.get("emailId");
        String password = loginRequest.get("password");

        //return the response
        Map<String, Object> loginResponse = userService.loginUser(email, password);
        return ResponseEntity.ok(loginResponse);
    }

     //Fetch all users
    @GetMapping("/user/data")
    public List<Users> getAllData1() {
        return userService.getAllUsers();
    }

    // Fetch a user by ID
    @GetMapping("/user/data/{id}")
    public Users fetchById(@PathVariable long id) {
        Optional<Users> user = userService.getUserById(id);
        return user.orElse(null); // Return user or null if not found
    }
}