package nokia.wroclaw.innovativeproject.chatbot.service;

import nokia.wroclaw.innovativeproject.chatbot.domain.Request;
import nokia.wroclaw.innovativeproject.chatbot.domain.User;
import nokia.wroclaw.innovativeproject.chatbot.exceptions.request.RequestIdException;
import nokia.wroclaw.innovativeproject.chatbot.repository.RequestRepository;
import nokia.wroclaw.innovativeproject.chatbot.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.util.*;
import java.util.concurrent.TimeUnit;

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
        for (Request request : allRequests) {
            if (request.getUser().getUsername().equals(username))
                userRequests.add(request);
        }
        return userRequests;
    }

    public String getMessageIntent(String username, String conversationId) {
        Iterable<Request> userRequests = findAllUserRequests(username);
        for (Request userRequest : userRequests) {
            if ((userRequest.getConversationId().equals(conversationId)) && (!userRequest.getConversationIntent().equals("")))
                return userRequest.getConversationIntent();
        }
        return "";
    }

    public Request setAnswerRating(Map<String, String> rating) {
        Iterable<Request> userRequests = findAllUserRequests(rating.get("username"));
        Request ratedRequest = new Request();
        for (Request userRequest : userRequests) {
            if (userRequest.getId().equals(Long.parseLong(rating.get("id")))) {
                ratedRequest = userRequest;
                ratedRequest.setResponseRating(rating.get("rating"));
                requestRepository.save(ratedRequest);
            }
        }

        return ratedRequest;
    }


    public Iterable<Request> findNextUserRequestsPage(String username, Map<String, String> pages, Long lastMessageId) {
        int pageSize = 3;
        int pageNumber = Integer.parseInt(pages.get("page"));

        if(lastMessageId == null)
            lastMessageId = Long.valueOf(-1);

        List<Request> requests = new ArrayList<>();
        for(int i=pageNumber; i>=0; i--) {
            Pageable page = PageRequest.of(i, pageSize, Sort.by("id").descending());
            List<Request> requestPage = requestRepository.findAllByRequestOwnerAndIdGreaterThan(username, page, lastMessageId);
            Collections.reverse(requestPage);
            requests.addAll(requestPage);
        }

        return requests;
    }

    public Iterable<Request> findRatedRequests(User user, Map<String, String> rating) {
        String ratingNumber = rating.get("rating");

        if(user.getIsAdmin() && (ratingNumber != null)) {
            return requestRepository.findAllByResponseRating(ratingNumber);
        }
        return new ArrayList<Request>();
    }

    public void removeOldRequests(Date weekAgo) {
        requestRepository.deleteByDateBefore(weekAgo);
    }

    public long getDaysAgo() {
        Date now = new Date();
        Date lastRequestDate = new Date();
        long days;
        List<Request> requests = requestRepository.findFirst1ByOrderByDateAsc();
        if(requests != null) {
            Request request = requests.get(0);
            lastRequestDate = request.getDate();
        }
        long diff = now.getTime() - lastRequestDate.getTime();
        days = TimeUnit.DAYS.convert(diff, TimeUnit.MILLISECONDS);
        return days;
    }
}
