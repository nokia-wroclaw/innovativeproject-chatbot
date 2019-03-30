package nokia.wroclaw.innovativeproject.chatbot.web;

import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.*;
import java.net.URL;
import java.nio.charset.Charset;

@RestController
@RequestMapping("/api/weather")
@CrossOrigin
public class WeatherController {

    private static String readAll(Reader rd) throws IOException {
        StringBuilder sb = new StringBuilder();
        int cp;
        while ((cp = rd.read()) != -1) {
            sb.append((char) cp);
        }
        return sb.toString();
    }

    public static JSONObject readJsonFromUrl(String url) throws IOException, JSONException {
        InputStream is = new URL(url).openStream();
        try {
            BufferedReader rd = new BufferedReader(new InputStreamReader(is, Charset.forName("UTF-8")));
            String jsonText = readAll(rd);
            JSONObject json = new JSONObject(jsonText);
            return json;
        } finally {
            is.close();
        }
    }

    @GetMapping(path = "{city}")
    public ResponseEntity<?> getWeatherResponse(@PathVariable("city") String city) {
        String response = "";
        try {
            JSONObject json = readJsonFromUrl("http://api.openweathermap.org/data/2.5/weather?q=" + city + "&APPID=7ad4ce39d11f09e912b90c4e1c93fff3");
            response = json.toString();
        } catch (IOException e) {
        }

        return new ResponseEntity<String>(response, HttpStatus.OK);
    }

}
