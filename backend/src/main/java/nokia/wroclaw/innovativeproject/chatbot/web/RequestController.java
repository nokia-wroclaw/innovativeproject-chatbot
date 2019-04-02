package nokia.wroclaw.innovativeproject.chatbot.web;

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
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.annotation.PostConstruct;
import javax.validation.Valid;
import java.security.Principal;
import java.util.Collection;
import java.util.HashMap;
import java.util.Map;
import java.util.Set;

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
    private final Logger log = LoggerFactory.getLogger(this.getClass());
    private Map<String, Context> contextMap = new HashMap<>();

    @PostConstruct
    public void init() {
        service = new Assistant(assistantVersionDate);
        service.setUsernameAndPassword(assistantUser, assistantPass);
        service.setEndPoint("https://gateway-lon.watsonplatform.net/assistant/api");
    }

    @PostMapping("")
    public ResponseEntity<?> askChatbot(@Valid @RequestBody Request request, BindingResult result, Principal principal) {
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
            if(!response.getContext().getSystem().containsKey("branch_exited")) {
                contextMap.put(conversationContext.getConversationId(), conversationContext);
            } else {
                contextMap.put(conversationContext.getConversationId(), new Context());
            }

        } catch (NotFoundException e) {
            log.error("NotFoundException", e);
            throw e;
        } catch (RequestTooLargeException e) {
            log.error("RequestTooLargeException", e);
            throw e;
        } catch (ServiceResponseException e) {
            log.error("ServiceResponseException", e);
            throw e;
        }

        // create map and save all entities from context
        Map<String, String> map = new HashMap<>();
        for(Map.Entry<String, Object> entry: response.getContext().entrySet()) {
            if((!entry.getKey().equals("system")) && (!entry.getKey().equals("conversation_id"))) {
                map.put(entry.getKey(), entry.getValue().toString());
            }
        }
        request.setResponseParams(map);

        // get response type
        request.setResponseType(requestService.getResponseType(map));

        // save request
        Request request1 = requestService.saveOrUpdateRequest(request, principal.getName());
        return new ResponseEntity<Request>(request1, HttpStatus.CREATED);
        //return new ResponseEntity<MessageResponse>(response, HttpStatus.CREATED);
    }

    @GetMapping("/all")
    public Iterable<Request> getAllRequests() {
        return requestService.findAllRequests();
    }

}
