package SpringProject.SpringProject;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class ApiController {

    @Autowired
    private UserService userService;

    // Register a new user
    @PostMapping("/user/registration")
    public String registerUser(@RequestBody Users data) {
        return userService.registerUser(data);
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