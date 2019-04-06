package nokia.wroclaw.innovativeproject.chatbot.exceptions.weatherAPI;

public class ReadJSONExceptionResponse {

    String url;

    public ReadJSONExceptionResponse(String url) {
        this.url = url;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }
}

