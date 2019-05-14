package nokia.wroclaw.innovativeproject.chatbot.web;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.ibm.watson.developer_cloud.assistant.v1.Assistant;
import com.ibm.watson.developer_cloud.assistant.v1.model.*;
import com.ibm.watson.developer_cloud.service.exception.NotFoundException;
import com.ibm.watson.developer_cloud.service.exception.RequestTooLargeException;
import com.ibm.watson.developer_cloud.service.exception.ServiceResponseException;
import nokia.wroclaw.innovativeproject.chatbot.domain.Request;
import nokia.wroclaw.innovativeproject.chatbot.domain.User;
import nokia.wroclaw.innovativeproject.chatbot.service.MapValidationErrorService;
import nokia.wroclaw.innovativeproject.chatbot.service.RequestService;
import nokia.wroclaw.innovativeproject.chatbot.service.UserService;
import nokia.wroclaw.innovativeproject.chatbot.util.LoggerUtil;
import nokia.wroclaw.innovativeproject.chatbot.util.loggers.RequestLogger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.annotation.PostConstruct;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import java.io.*;
import java.security.Principal;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.*;

@RestController
@RequestMapping("/api/request")
@CrossOrigin
public class RequestController {

    @Value("${ibm.assistant.version.date}")
    private String assistantVersionDate;

    @Value("${ibm.assistant.workspace.id}")
    private String assistantWorkspace;

    @Value("${ibm.assistant.username}")
    private String assistantUser;

    @Value("${ibm.assistant.password}")
    private String assistantPass;

    @Autowired
    private RequestService requestService;

    @Autowired
    private UserService userService;

    @Autowired
    private MapValidationErrorService mapValidationErrorService;

    private Assistant service;

    private LoggerUtil logger = new LoggerUtil("requests.txt");
    private DateFormat dateFormat = new SimpleDateFormat("dd-mm-yyyy hh:mm:ss");

    private Map<String, Context> contextMap = new HashMap<>();

    @PostConstruct
    public void init() {
        service = new Assistant(assistantVersionDate);
        service.setUsernameAndPassword(assistantUser, assistantPass);
        service.setEndPoint("https://gateway-lon.watsonplatform.net/assistant/api");
    }

    @PostMapping("")
    public ResponseEntity<?> askChatbot(@Valid @RequestBody Request request, BindingResult result, Principal principal) throws JsonProcessingException {
        // check for errors
        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if (errorMap != null) return errorMap;

        // get answer
        Context conversationContext;
        MessageResponse response;
        try {
            // get input data (question)
            String text = (request.getQuestion() == null) ? "" : request.getQuestion();
            InputData input = new InputData.Builder(text).build();

            // get current user and set context
            User currentUser = userService.getUser(principal.getName());
            conversationContext = (contextMap.get(currentUser.getCurrentConversationId()) == null) ? new Context() : contextMap.get(currentUser.getCurrentConversationId());

            // message builder
            MessageOptions options =
                    new MessageOptions.Builder(assistantWorkspace)
                            .context(conversationContext)
                            .input(input)
                            .build();

            // get response & save new context
            response = service.message(options).execute();
            conversationContext = response.getContext();

            // add the response to the current request
            String data = response.getOutput().getText().toString();
            request.setResponseText(data.substring(1, data.length() - 1)); // text
            request.setConversationId(conversationContext.getConversationId()); // conversation ID
            userService.updateCurrentConversationId(principal.getName(), conversationContext.getConversationId());

            // save context to context map
            if (!response.getContext().getSystem().containsKey("branch_exited")) {
                contextMap.put(conversationContext.getConversationId(), conversationContext);
            } else {
                contextMap.put(conversationContext.getConversationId(), new Context());
            }

        } catch (NotFoundException e) {
            logger.log(new RequestLogger(dateFormat.format(new Date()), "ERROR", "NotFoundException", null, null));
            throw e;
        } catch (RequestTooLargeException e) {
            logger.log(new RequestLogger(dateFormat.format(new Date()), "ERROR", "RequestTooLargeException", null, null));
            throw e;
        } catch (ServiceResponseException e) {
            logger.log(new RequestLogger(dateFormat.format(new Date()), "ERROR", "ServiceResponseException", null, null));
            throw e;
        }

        // create map and save all entities from context
        Map<String, String> map = new HashMap<>();
        for (Map.Entry<String, Object> entry : response.getContext().entrySet()) {
            if ((!entry.getKey().equals("system")) && (!entry.getKey().equals("conversation_id"))) {
                map.put(entry.getKey(), entry.getValue().toString());
            }
        }
        request.setResponseParams(map);

        // set question intent and confidence (one for request)
        if (!response.getIntents().isEmpty()) {
            request.setQuestionIntent(response.getIntents().get(0).getIntent());
            request.setQuestionConfidence(response.getIntents().get(0).getConfidence());
        } else request.setQuestionIntent("");

        // set conversation intent (one for context)
        String conversationIntent = requestService.getMessageIntent(principal.getName(), conversationContext.getConversationId());
        if (!conversationIntent.equals("")) // if this conversation had an intent
            request.setConversationIntent(conversationIntent); // set this intent on request
        else { // if not
            if (!response.getIntents().isEmpty()) // if there is intent in current response
                request.setConversationIntent(response.getIntents().get(0).getIntent());
            else request.setConversationIntent(conversationIntent);
        }

        // get response type (if node exited)
        if (response.getContext().getSystem().containsKey("branch_exited")) {
            request.setResponseType(request.getConversationIntent());
        } else {
            request.setResponseType("");
        }

        // no rating yet
        request.setResponseRating("0");

        // save request
        Request request1 = requestService.saveOrUpdateRequest(request, principal.getName());

        // log response
        logger.log(new RequestLogger(dateFormat.format(new Date()), "INFO", "Ask Chatbot", request, response));

        return new ResponseEntity<Request>(request1, HttpStatus.CREATED);
        //return new ResponseEntity<MessageResponse>(response, HttpStatus.CREATED);
    }

    @GetMapping("/all")
    public Iterable<Request> getAllRequests() {
        return requestService.findAllRequests();
    }

    @GetMapping("/userRequests")
    public Iterable<Request> getUserRequests(Principal principal) {
        User currentUser = userService.getUser(principal.getName());
        return requestService.findAllUserRequests(currentUser.getUsername());
    }

    @PostMapping("/userRequestsPagination")
    public Iterable<Request> getNextUserRequestsPage(@RequestBody Map<String, String> pages, Principal principal) {
        User currentUser = userService.getUser(principal.getName());
        return requestService.findNextUserRequestsPage(currentUser.getUsername(), pages, currentUser.getLastMessageId());
    }

    @PostMapping("/rateAnswer")
    public ResponseEntity<?> rateAnswer(@RequestBody Map<String, String> rating, BindingResult result) {
        // check for errors
        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if (errorMap != null) return errorMap;

        Request request = requestService.setAnswerRating(rating);

        // log response
        logger.log(new RequestLogger(dateFormat.format(new Date()), "INFO", "Ask Chatbot", request, null));

        return new ResponseEntity<Request>(request, HttpStatus.OK);
    }

    @PostMapping("/getRatedRequests")
    public Iterable<Request> getNegativeRatedRequests(@RequestBody Map<String, String> rating, Principal principal) {
        User currentUser = userService.getUser(principal.getName());
        return requestService.findRatedRequests(currentUser, rating);
    }

    @RequestMapping(value = "/getBackupFile", method = RequestMethod.GET)
    public void getBackupFile(HttpServletResponse response) {
        try {
            // get file as InputStream
            InputStream is = new FileInputStream("./logs/requests.txt");

            // at JSON array characters
            String beginning = "[";
            String end = "]";
            List<InputStream> streams = Arrays.asList(
                    new ByteArrayInputStream(beginning.getBytes()),
                    is,
                    new ByteArrayInputStream(end.getBytes()));
            InputStream modified = new SequenceInputStream(Collections.enumeration(streams));

            // copy it to response's OutputStream
            org.apache.commons.io.IOUtils.copy(modified, response.getOutputStream());
            response.setContentType("application/json");
            response.flushBuffer();
        } catch (IOException ex) {
            logger.log(new RequestLogger(dateFormat.format(new Date()), "INFO", "Error writing file to output stream.", null, null));
            throw new RuntimeException("IOError writing file to output stream");
        }

    }

}
