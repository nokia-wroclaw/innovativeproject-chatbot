package nokia.wroclaw.innovativeproject.chatbot.service;

import nokia.wroclaw.innovativeproject.chatbot.domain.Request;
import nokia.wroclaw.innovativeproject.chatbot.domain.User;
import nokia.wroclaw.innovativeproject.chatbot.exceptions.RequestIdException;
import nokia.wroclaw.innovativeproject.chatbot.repository.RequestRepository;
import nokia.wroclaw.innovativeproject.chatbot.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RequestService {

    @Autowired
    private RequestRepository requestRepository;

    @Autowired
    private UserRepository userRepository;

    public Request saveOrUpdateRequest(Request request, String username) {
        try {
            User user = userRepository.findByUsername(username); // only if the token is valid
            request.setUser(user);
            request.setRequestOwner(user.getUsername());
            return requestRepository.save(request);
        } catch (Exception ex) {
            throw new RequestIdException("Request ID '" + request.getId() + "' already exists.");
        }
    }

    public Iterable<Request> findAllRequests() {
        return requestRepository.findAll();
    }
}
