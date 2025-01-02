package SpringProject.SpringProject;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

//@RestController
//public class Apicontroller {
//	@GetMapping(value="/")
//	public String getpage() {
//		return "Welcome";
//	}
//
//}
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api")
public class Apicontroller {

    @GetMapping("/")
    public String sayHello() {
        return "Hello, World!";
    }

    @GetMapping("/hello/{name}")
    public String greetUser(@PathVariable String name) {
        return "Hello, " + name + "!";
    }

    @PostMapping("/add")
    public String addData(@RequestBody DataModel data) {
    	dataList.add(data);
        return "Data received: " + data.toString();
    }
    
    private List<DataModel> dataList = new ArrayList<>();
    public Apicontroller() {
        
    }

    // READ method
    @GetMapping("/data")
    public List<DataModel> getAllData() {
        return dataList;
    }
}

class DataModel {
    private String key;
    private String value;
    
    public DataModel(String key, String value) {
        this.key = key;
        this.value = value;
    }

    // Getters and Setters
    public String getKey() {
        return key;
    }
    public void setKey(String key) {
        this.key = key;
    }
    public String getValue() {
        return value;
    }
    public void setValue(String value) {
        this.value = value;
    }
    @Override
    public String toString() {
        return "Key: " + key + ", Value: " + value;
    }
}