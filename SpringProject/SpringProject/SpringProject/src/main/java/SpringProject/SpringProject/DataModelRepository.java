package SpringProject.SpringProject;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
public interface DataModelRepository extends JpaRepository<Users, Long> {
    // Additional query methods (if needed) can be defined here
    Optional<Users> findByEmailId(String email);
}
