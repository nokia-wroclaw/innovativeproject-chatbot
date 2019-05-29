package nokia.wroclaw.innovativeproject.chatbot.util.loggers;

import java.util.Date;

public class UserLogger {

    private String date;
    private String status;
    private String action;
    private String user;

    public UserLogger() {
    }

    public UserLogger(String date, String status, String action, String user) {
        this.date = date;
        this.status = status;
        this.action = action;
        this.user = user;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getAction() {
        return action;
    }

    public void setAction(String action) {
        this.action = action;
    }

    public String getUser() {
        return user;
    }

    public void setUser(String user) {
        this.user = user;
    }
}
