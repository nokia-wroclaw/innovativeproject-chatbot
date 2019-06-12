package nokia.wroclaw.innovativeproject.chatbot.service;

import nokia.wroclaw.innovativeproject.chatbot.domain.Request;
import nokia.wroclaw.innovativeproject.chatbot.domain.User;
import nokia.wroclaw.innovativeproject.chatbot.exceptions.authentication.UsernameAlreadyExistsException;
import nokia.wroclaw.innovativeproject.chatbot.repository.RequestRepository;
import nokia.wroclaw.innovativeproject.chatbot.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RequestRepository requestRepository;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @Autowired
    public JavaMailSender emailSender;

    public User saveUser(User newUser) {

        try {
            newUser.setPassword(bCryptPasswordEncoder.encode(newUser.getPassword()));

            // Username has to be unique (exception)
            newUser.setUsername(newUser.getUsername());

            // Make sure that password and confirmPassword match
            // We don't persist or show the confirmPassword

            // set default avatar;
            newUser.setAvatar("");

            newUser.setConfirmPassword("");

            newUser.setIsAdmin(false);

            return userRepository.save(newUser);

        } catch (Exception e) {
            throw new UsernameAlreadyExistsException("Username '" + newUser.getUsername() + "' already exists.");
        }
    }

    public User getUser(String username) {
        User user = userRepository.findByUsername(username);
        return user;
    }

    public void updateCurrentConversationId(String username, String conversationId) {
        User user = userRepository.findByUsername(username);
        user.setCurrentConversationId(conversationId);
        userRepository.save(user);
    }

    public Map<String, String> setUserAvatar(String username, Map<String, String> image) {
        User user = userRepository.findByUsername(username);
        Map<String, String> response = new HashMap<>();

        String base64Image = image.get("image");
        if (base64Image == null) {
            base64Image = "";
            response.put("status", "Cannot upload image!");
        } else {
            response.put("status", "Image has been uploaded successfully!");
        }

        response.put("image", base64Image);
        user.setAvatar(base64Image);
        userRepository.save(user);

        return response;
    }

    public String getUserAvatar(String username) {
        User user = getUser(username);
        return user.getAvatar();
    }

    public Map<Object, String> getAllUsernames(User currentUser) {
        Map<Object, String> usernames = new HashMap<>();

        // check if current user is admin & if user exists
        if ((currentUser != null) && (currentUser.getIsAdmin())) {
            Iterable<User> allUsers = userRepository.findAll();
            for (User user : allUsers) {
                usernames.put(user.getUsername(), user.getUsername());
            }
        }
        return usernames;
    }

    public Map<String, String> giveAdminPermissions(User fromUser, Map<String, String> toUsername) {
        Map<String, String> response = new HashMap<>();
        User toUser;

        if(fromUser.getIsAdmin()) {
            toUser = userRepository.findByUsername(toUsername.get("username"));
            if(toUser != null) {
                toUser.setIsAdmin(true);
                userRepository.save(toUser);
                String message = "User " + toUser.getUsername() + " is now admin!";
                response.put("status", message);
                return response;
            } else {
                response.put("status", "Cannot find user with this username!");
                return response;
            }
        }

        response.put("status", "Only admin is able to change user's permissions!");
        return response;
    }

    public boolean getIsAdmin(String username) {
        User user = getUser(username);
        return user.getIsAdmin();
    }

    public Map<String, String> clearUserConversation(User currentUser) {

        List<Request> userRequests = requestRepository.findAllByRequestOwner(currentUser.getUsername());
        Long lastMessageId = Long.valueOf(-1);

        for (Request request: userRequests) {
            if (request.getId() > lastMessageId)
                lastMessageId = request.getId();
        }

        currentUser.setLastMessageId(lastMessageId);
        userRepository.save(currentUser);

        Map<String, String> map = new HashMap<>();
        map.put("status", "Conversation has been cleared");
        map.put("id", lastMessageId.toString());
        return map;
    }

    public void sendMessage(String user, String text) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo("opinieoczatbocie@gmail.com");  // password: JakiesRandomoweOpinie1
        message.setSubject(user + " send opinion about chatbot!");
        message.setText(text);
        emailSender.send(message);
    }
}