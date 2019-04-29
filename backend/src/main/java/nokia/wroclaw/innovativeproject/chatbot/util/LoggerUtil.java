package nokia.wroclaw.innovativeproject.chatbot.util;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;

public class LoggerUtil {

    private File logFile;

    public LoggerUtil() {

    }

    public LoggerUtil(String logFileName) {
        logFile = new File("./logs/" + logFileName);
    }

    public void log(Object o) {
        String jsonObject;
        System.out.println(logFile.length());
        if (logFile.length() != 0) jsonObject = "," + getJSON(o);
        else jsonObject = getJSON(o);

        try {
            FileWriter fw = new FileWriter(logFile, true);
            fw.write(jsonObject);
            fw.close();
        } catch (IOException ex) {
            System.out.println(ex);
            System.err.println("Couldn't log this: " + jsonObject);
        }
    }

    private String getJSON(Object o) {
        ObjectMapper Obj = new ObjectMapper();
        String jsonObject;
        try {
            jsonObject = Obj.writeValueAsString(o);
        } catch (JsonProcessingException e) {
            return "";
        }
        return jsonObject;
    }

}
