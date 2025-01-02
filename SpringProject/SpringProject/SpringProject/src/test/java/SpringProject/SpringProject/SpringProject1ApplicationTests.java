
//@SpringBootTest
//class SpringProject1ApplicationTests {
//	@Test
//	void contextLoads() {
//	}
//}
package SpringProject.SpringProject;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
@SpringBootTest
@RestController
@RequestMapping("/api")
public class SpringProject1ApplicationTests {

    @GetMapping("/hello")
    public String sayHello() {
        return "Hello, World!";
    }

    @GetMapping("/greet/{name}")
    public String greetUser(@PathVariable String name) {
        return "Hello, " + name + "!";
    }

    @PostMapping("/add")
    public String addData(@RequestBody DataModel data) {
        return "Data received: " + data.toString();
    }
}

class DataModel {
    private String key;
    private String value;

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
