package nokia.wroclaw.innovativeproject.chatbot.service;

import nokia.wroclaw.innovativeproject.chatbot.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

}
