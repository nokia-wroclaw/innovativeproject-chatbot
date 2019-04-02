package nokia.wroclaw.innovativeproject.chatbot.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.ibm.watson.developer_cloud.assistant.v1.model.Context;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.List;

@Entity
public class User implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Email(message = "Username needs to be an email")
    @NotBlank(message = "Username is required")
    @Column(unique = true)
    private String username;

    @NotBlank(message = "Please enter your full name")
    private String fullName;

    @NotBlank(message = "Password field is required")
    private String password;

    @Transient
    private String confirmPassword;

    private Date created_At;
    private Date updated_At;

    @PrePersist
    protected void onCreate() {
        this.created_At = new Date();
    }

    @PreUpdate
    protected void onUpdate() {
        this.updated_At = new Date();
    }

    // UserDetails interface methods

    @Override
    @JsonIgnore
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return null;
    }

    @Override
    @JsonIgnore
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    @JsonIgnore
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    @JsonIgnore
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    @JsonIgnore
    public boolean isEnabled() {
        return true;
    }


    // OneToMany with Requests
    @OneToMany(cascade = CascadeType.REFRESH, fetch = FetchType.EAGER, mappedBy = "user", orphanRemoval = true)
    private List<Request> requests = new ArrayList<>();

    private String currentConversationId;

    public User() {
    }

    public User(Long id, @Email(message = "Username needs to be an email") @NotBlank(message = "Username is required") String username, @NotBlank(message = "Please enter your full name") String fullName, @NotBlank(message = "Password field is required") String password, String confirmPassword, Date created_At, Date updated_At, List<Request> requests, String currentConversationId) {
        this.id = id;
        this.username = username;
        this.fullName = fullName;
        this.password = password;
        this.confirmPassword = confirmPassword;
        this.created_At = created_At;
        this.updated_At = updated_At;
        this.requests = requests;
        this.currentConversationId = currentConversationId;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getConfirmPassword() {
        return confirmPassword;
    }

    public void setConfirmPassword(String confirmPassword) {
        this.confirmPassword = confirmPassword;
    }

    public Date getCreated_At() {
        return created_At;
    }

    public void setCreated_At(Date created_At) {
        this.created_At = created_At;
    }

    public Date getUpdated_At() {
        return updated_At;
    }

    public void setUpdated_At(Date updated_At) {
        this.updated_At = updated_At;
    }

    public List<Request> getRequests() {
        return requests;
    }

    public void setRequests(List<Request> requests) {
        this.requests = requests;
    }

    public String getCurrentConversationId() {
        return currentConversationId;
    }

    public void setCurrentConversationId(String currentConversationId) {
        this.currentConversationId = currentConversationId;
    }
}
