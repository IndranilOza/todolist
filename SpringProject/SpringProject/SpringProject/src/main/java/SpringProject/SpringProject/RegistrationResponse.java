package SpringProject.SpringProject;

public class RegistrationResponse {
    private String message;
    private String token;
    private String userId;
    private long id;
    private String message1;

    // Constructor
    public RegistrationResponse(String message, String token, String userId, long id) {
        this.message = message;
        this.token = token;
        this.userId = userId;
        this.id = id;
    }
    public RegistrationResponse(String message1) {
        this.message1 = message1;
    }
    
    public String getMessage1() {
        return message1;
    }

    public void setMessage1(String message1) {
        this.message1 = message1;
    }

    // Getters and Setters
    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }
}

