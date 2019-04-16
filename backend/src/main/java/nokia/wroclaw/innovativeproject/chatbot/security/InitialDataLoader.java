package nokia.wroclaw.innovativeproject.chatbot.security;

import nokia.wroclaw.innovativeproject.chatbot.domain.User;
import nokia.wroclaw.innovativeproject.chatbot.repository.UserRepository;
import nokia.wroclaw.innovativeproject.chatbot.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.event.SpringApplicationEvent;
import org.springframework.context.ApplicationListener;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
public class InitialDataLoader implements ApplicationListener<SpringApplicationEvent> {

    boolean alreadySetup = false;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserService userService;

    @Override
    @Transactional
    public void onApplicationEvent(SpringApplicationEvent springApplicationEvent) {

        String email = "admin@admin.com";
        String fullName = "admin";
        String password = "admin1";

        if (alreadySetup || (userRepository.findByUsername(email) != null)) {
            return;
        }

        // create new user
        User user = new User();
        user.setUsername(email);
        user.setFullName(fullName);
        user.setPassword(password);
        user.setConfirmPassword(password);
        user.setCreated_At(null);
        user.setUpdated_At(null);
        user.setRequests(null);
        user.setCurrentConversationId(null);

        userService.saveUser(user);

        // give admin permissions
        User adminUser = userRepository.findByUsername(email);
        adminUser.setIsAdmin(true);
        userRepository.save(adminUser);

        alreadySetup = true;
    }
}
