package SpringProject.SpringProject;
import org.springframework.data.jpa.repository.JpaRepository;
public interface DataModelRepository extends JpaRepository<Users, Long> {
    // Additional query methods (if needed) can be defined here
}
