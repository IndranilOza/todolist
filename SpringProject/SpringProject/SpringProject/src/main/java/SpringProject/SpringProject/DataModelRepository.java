package SpringProject.SpringProject;
import java.util.Optional;
import org.springframework.boot.autoconfigure.security.SecurityProperties.User;
import org.springframework.data.jpa.repository.JpaRepository;
public interface DataModelRepository extends JpaRepository<Users, Long> {
	Optional<Users> findByEmailId(String email);
	User save(User user);
    // Additional query methods (if needed) can be defined here
}