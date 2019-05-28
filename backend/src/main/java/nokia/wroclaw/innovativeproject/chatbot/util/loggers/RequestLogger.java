package nokia.wroclaw.innovativeproject.chatbot.util.loggers;

import com.ibm.watson.developer_cloud.assistant.v1.model.MessageResponse;
import nokia.wroclaw.innovativeproject.chatbot.domain.Request;

import java.time.LocalDateTime;
import java.util.Date;

public class RequestLogger {

    private String date;
    private String status;
    private String action;
    private Request request;
    private MessageResponse messageResponse;

    public RequestLogger() {

    }

    public RequestLogger(String date, String status, String action, Request request, MessageResponse messageResponse) {
        this.date = date;
        this.status = status;
        this.action = action;
        this.request = request;
        this.messageResponse = messageResponse;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public Request getRequest() {
        return request;
    }

    public void setRequest(Request request) {
        this.request = request;
    }

    public MessageResponse getMessageResponse() {
        return messageResponse;
    }

    public void setMessageResponse(MessageResponse messageResponse) {
        this.messageResponse = messageResponse;
    }

    public String getAction() {
        return action;
    }

    public void setAction(String action) {
        this.action = action;
    }
}
