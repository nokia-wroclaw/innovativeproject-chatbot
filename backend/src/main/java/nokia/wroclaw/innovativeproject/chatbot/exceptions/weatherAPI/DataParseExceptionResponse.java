package nokia.wroclaw.innovativeproject.chatbot.exceptions.weatherAPI;

public class DataParseExceptionResponse {

    String date;

    public DataParseExceptionResponse(String date) {
        this.date = date;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }
}
