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

        System.out.println(this.alreadySetup);
        if(alreadySetup || (userRepository.findByUsername("admin@gmail.com") != null))
        {
            return;

        }
        User user = new User();
        user.setUsername("admin@gmail.com");
        user.setFullName("admin");
        user.setPassword(passwordEncoder.encode("admin1"));
        user.setConfirmPassword(user.getPassword());
        user.setCreated_At(null);
        user.setUpdated_At(null);
        user.setRequests(null);
        user.setCurrentConversationId(null);
        user.setIsAdmin(true);

        System.out.println(user.getUsername() + user.getFullName() + user.getId() + user.getIsAdmin());

        userService.saveUser(user);

        alreadySetup = true;
    }
}
