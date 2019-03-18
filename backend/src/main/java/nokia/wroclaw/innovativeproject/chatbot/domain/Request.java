package nokia.wroclaw.innovativeproject.chatbot.domain;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.util.Date;

@Entity
public class Request {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Question is required.")
    private String question;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm a z")
    private Date date;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnore
    private User user;

    private String requestOwner;

    public Request() {

    }

    public Request(Long id, @NotBlank(message = "Question is required.") String question, Date date, User user, String requestOwner) {
        this.id = id;
        this.question = question;
        this.date = date;
        this.user = user;
        this.requestOwner = requestOwner;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getQuestion() {
        return question;
    }

    public void setQuestion(String question) {
        this.question = question;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getRequestOwner() {
        return requestOwner;
    }

    public void setRequestOwner(String requestOwner) {
        this.requestOwner = requestOwner;
    }

    @PrePersist
    protected void onCreate() {
        this.date = new Date();
    }
}
