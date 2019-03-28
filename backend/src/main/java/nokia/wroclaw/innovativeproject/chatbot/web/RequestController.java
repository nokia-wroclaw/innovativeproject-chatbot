package nokia.wroclaw.innovativeproject.chatbot.web;

import com.ibm.watson.developer_cloud.assistant.v1.Assistant;
import com.ibm.watson.developer_cloud.assistant.v1.model.*;
import com.ibm.watson.developer_cloud.service.exception.NotFoundException;
import com.ibm.watson.developer_cloud.service.exception.RequestTooLargeException;
import com.ibm.watson.developer_cloud.service.exception.ServiceResponseException;
import nokia.wroclaw.innovativeproject.chatbot.domain.Request;
import nokia.wroclaw.innovativeproject.chatbot.service.MapValidationErrorService;
import nokia.wroclaw.innovativeproject.chatbot.service.RequestService;
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
import java.util.HashMap;
import java.util.List;

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
    private MapValidationErrorService mapValidationErrorService;

    private Assistant service;
    private final Logger log = LoggerFactory.getLogger(this.getClass());


    @PostConstruct
    public void init() {
        service = new Assistant(assistantVersionDate);
        service.setUsernameAndPassword(assistantUser, assistantPass);
        service.setEndPoint("https://gateway-lon.watsonplatform.net/assistant/api");
    }

    @PostMapping("/message")
    public MessageResponse postMessage(@RequestBody Request request) {
        try {

            String text = (request.getQuestion() == null) ? "" : request.getQuestion();
            InputData input = new InputData.Builder(text).build();

            MessageOptions options =
                    new MessageOptions.Builder(assistantWorkspace)
                            .input(input)
                            .build();

            MessageResponse response = service.message(options).execute();
            response.getOutput().getText();
            return response;

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
    }

    @PostMapping("")
    public ResponseEntity<?> askChatbot(@Valid @RequestBody Request request, BindingResult result, Principal principal) {
        // check for errors
        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if (errorMap != null) return errorMap;

        // get answer
        try {
            String text = (request.getQuestion() == null) ? "" : request.getQuestion();
            InputData input = new InputData.Builder(text).build();

            MessageOptions options =
                    new MessageOptions.Builder(assistantWorkspace)
                            .input(input)
                            .build();

            MessageResponse response = service.message(options).execute();
            String data = response.getOutput().getText().toString();
            request.setResponseText(data.substring(1, data.length() - 1)); // change it to list maybe?

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

        // save request
        Request request1 = requestService.saveOrUpdateRequest(request, principal.getName());
        return new ResponseEntity<Request>(request1, HttpStatus.CREATED);
    }

    @GetMapping("/all")
    public Iterable<Request> getAllRequests() {
        return requestService.findAllRequests();
    }

}
