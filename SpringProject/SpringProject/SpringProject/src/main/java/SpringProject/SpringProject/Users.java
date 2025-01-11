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
	    	   private String UserId;
	    @Column
	    private String emailId;
	    @Column
	    	   private String Password;
		public long getID() {
			return ID;
		}
		public void setID(long iD) {
			this.ID = iD;
		}
		public String UserId() {
			return UserId;
		}
		public void setUserId(String UserId) {
			this.UserId = UserId;
		}
		public String getEmailId() {
	        return emailId;
	    }

	    public void setEmailId(String emailId) {
	        this.emailId = emailId;
	    }
		public String getPassword() {
			return Password;
		}
		public void setPassword(String Password) {
			this.Password = Password;
		}

}

