package nokia.wroclaw.innovativeproject.chatbot.exceptions.weatherAPI;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class ReadJSONException extends RuntimeException {

    public ReadJSONException(String message) {
        super(message);
    }

}
