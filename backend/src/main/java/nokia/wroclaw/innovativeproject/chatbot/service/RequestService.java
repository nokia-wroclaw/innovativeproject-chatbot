package nokia.wroclaw.innovativeproject.chatbot.service;

import nokia.wroclaw.innovativeproject.chatbot.domain.Request;
import nokia.wroclaw.innovativeproject.chatbot.domain.User;
import nokia.wroclaw.innovativeproject.chatbot.exceptions.request.RequestIdException;
import nokia.wroclaw.innovativeproject.chatbot.repository.RequestRepository;
import nokia.wroclaw.innovativeproject.chatbot.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.util.*;

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

    public String getMessageIntent(String username, String conversationId) {
        Iterable<Request> userRequests = findAllUserRequests(username);
        for(Request userRequest: userRequests) {
            if((userRequest.getConversationId().equals(conversationId)) && (!userRequest.getConversationIntent().equals("")))
                    return userRequest.getConversationIntent();
        }
        return "";
    }

    public Request setAnswerRating(Map<String, String> rating) {
        Iterable<Request> userRequests = findAllUserRequests(rating.get("username"));
        Request ratedRequest = new Request();
        for(Request userRequest: userRequests) {
            if (userRequest.getId().equals(Long.parseLong(rating.get("id")))) {
                ratedRequest = userRequest;
                ratedRequest.setResponseRating(rating.get("rating"));
                requestRepository.save(ratedRequest);
            }
        }

        return ratedRequest;
    }
}
