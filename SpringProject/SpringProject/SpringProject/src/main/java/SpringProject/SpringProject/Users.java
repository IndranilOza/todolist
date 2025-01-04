package SpringProject.SpringProject;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Users {
	    @Id
	    @GeneratedValue(strategy=GenerationType.IDENTITY)
	    	   private long ID;
	    @Column
	    	   private String CustomerName;
	    @Column
	    	   private String LastName;
	    @Column
	    	   private String Country;
		public long getID() {
			return ID;
		}
		public void setID(long iD) {
			this.ID = iD;
		}
		public String getCustomerName() {
			return CustomerName;
		}
		public void setCustomerName(String customerName) {
			this.CustomerName = customerName;
		}
		public String getLastName() {
			return LastName;
		}
		public void setLastName(String lastName) {
			this.LastName = lastName;
		}
		public String getCountry() {
			return Country;
		}
		public void setCountry(String country) {
			this.Country = country;
		}
	
}

