package nokia.wroclaw.innovativeproject.chatbot.exceptions.weatherAPI;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class DataParseException extends RuntimeException{

    public DataParseException(String message) {
        super(message);
    }

}
