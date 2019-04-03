package nokia.wroclaw.innovativeproject.chatbot.service;

import nokia.wroclaw.innovativeproject.chatbot.domain.Request;
import nokia.wroclaw.innovativeproject.chatbot.domain.User;
import nokia.wroclaw.innovativeproject.chatbot.exceptions.request.RequestIdException;
import nokia.wroclaw.innovativeproject.chatbot.repository.RequestRepository;
import nokia.wroclaw.innovativeproject.chatbot.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Set;

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

    public Iterable<Request> findAllUserRequests(String username) {
        Iterable<Request> allRequests = requestRepository.findAll();
        List<Request> userRequests = new ArrayList<>();
        for(Request request: allRequests) {
            if(request.getUser().getUsername().equals(username))
                userRequests.add(request);
        }
        return userRequests;
    }

    public String getResponseType(Map<String, String> responseParams) {
        Set<String> keys = responseParams.keySet();

        // weather case
        if(keys.contains("date") && keys.contains("location") && keys.contains("time")) return "weather";
        else if(keys.contains("bottom_text") && keys.contains("top_text")) return "meme";

        // nothing case
        else return "";
    }
}
