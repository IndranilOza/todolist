package SpringProject.SpringProject;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import java.util.List;
@RestController
@RequestMapping("/api")
public class ApiController {
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

    @PostMapping("/add")
    public String addData(@RequestBody Users data) {
    	System.out.println("Received data: " + data);
    	 repository.save(data);
        return "Data received:";
    }
    
    // READ method
    @GetMapping("/data")
    public List<Users> getAllData() {
    	 return repository.findAll();
    }

    @GetMapping("/data/{id}")
    public Users FetchById(@PathVariable long id){
    	 Users data= repository.findById(id).get();
		return data ;
    }
  
}