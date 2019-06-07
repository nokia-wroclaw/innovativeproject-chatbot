package nokia.wroclaw.innovativeproject.chatbot.exceptions.request;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class RequestIdException extends RuntimeException {

    public RequestIdException(String message) {
        super(message);
    }

}
