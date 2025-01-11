//Create(email,username,password,id) User data table
//Create(userId,,taskSDetails,time,activeStatus) User details

package SpringProject.SpringProject;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import java.util.List;
import java.util.Optional;
@RestController
@RequestMapping("/user")
public class ApiController {
//	@Autowired
//	private PasswordEncoder passwordEncoder;
	@Autowired
	private DataModelRepository repository; 
    @GetMapping("/")
    public String sayHello() {
        return "Hello, World!";
    }

    @GetMapping("/Hello/{name}")
    public String greetUser(@PathVariable String name) {
        return "Hello, " + name + "!";
    }

    @PostMapping("/registration")
    public String registerUser(@RequestBody Users data) {
        // Extract email from the input data
        String emailId = data.getEmailId();

        // Check if the user already exists
        Optional<Users> existingUser = repository.findByEmailId(emailId);
        if (existingUser.isPresent()) {
            return "User already exists";
        }

        // Hash the password before saving (if a password encoder is configured)
//        String hashedPassword = passwordEncoder.encode(data.getPassword());
//        data.setPassword(hashedPassword);

        // Save the new user
        repository.save(data);

        return "User registered successfully";
    }
    // READ method
    @GetMapping("/data")
    public List<Users> getAllData1() {
    	 return repository.findAll();
    }
    
    @GetMapping("/data/id")
    public Users FetchById(@PathVariable long id){
    	 Users data= repository.findById(id).get();
		return data ;
    }
}