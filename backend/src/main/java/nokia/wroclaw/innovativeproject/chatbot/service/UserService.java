package nokia.wroclaw.innovativeproject.chatbot.service;

import nokia.wroclaw.innovativeproject.chatbot.domain.User;
import nokia.wroclaw.innovativeproject.chatbot.exceptions.authentication.UsernameAlreadyExistsException;
import nokia.wroclaw.innovativeproject.chatbot.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

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

    // { User management stuff will be here }

}
