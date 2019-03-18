package nokia.wroclaw.innovativeproject.chatbot.exceptions;

public class UserAlreadyExistsResponse {

    private String username;

    public UserAlreadyExistsResponse(String username) {
        this.username = username;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }
}
