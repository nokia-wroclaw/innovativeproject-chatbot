package nokia.wroclaw.innovativeproject.chatbot.service;

import nokia.wroclaw.innovativeproject.chatbot.exceptions.weatherAPI.DataParseException;
import nokia.wroclaw.innovativeproject.chatbot.exceptions.weatherAPI.ReadJSONException;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import static nokia.wroclaw.innovativeproject.chatbot.util.JSONReader.readJsonFromUrl;

@Service
public class ExternalAPIService {

    public Map<String, String> getForecastFromApi(Map<String, String> params) {

        // get date & time
        String date = params.get("date") + " " + params.get("time");
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        Date forecastDate;
        try {
            forecastDate = formatter.parse(date);
        } catch (ParseException e) {
            throw new DataParseException("Cannot parse date '" + date + "'.");
        }
        long unixDate = forecastDate.getTime() / 1000L;
        String unixDateStr = Long.toString(unixDate / 10000); // find by regex

        // build URL
        StringBuilder url = new StringBuilder();
        url
                .append("http://api.openweathermap.org/data/2.5/forecast?q=")
                .append(params.get("location"))
                .append("&units=metric")
                .append("&APPID=a42f7d9a9412365b7145d185054b1700");

        // get data from API
        JSONObject response = new JSONObject();
        try {
            response = readJsonFromUrl(url.toString());
        } catch (JSONException | IOException e) {
            throw new ReadJSONException("Cannot get JSON from URL '" + url.toString() + "'.");
        }

        // get forecast & save to map
        Map<String, String> map = new HashMap<>();

        JSONArray responseData;

        try {
            responseData = response.getJSONArray("list");
            for (int i = 0; i < responseData.length(); i++) {
                String dt = responseData.getJSONObject(i).getString("dt");
                if (dt.contains(unixDateStr)) {
                    String temperature = responseData.getJSONObject(i).getJSONObject("main").get("temp").toString();
                    map.put("temperature", temperature);
                    String mainForecast = responseData.getJSONObject(i).getJSONArray("weather").getJSONObject(0).get("main").toString();
                    map.put("main", mainForecast);
                }
            }
        } catch (JSONException e) {
            throw new ReadJSONException("Cannot get JSON from URL '" + url.toString() + "'.");
        }

        return map;
    }

//    public Map<String, String> getMemeFromApi(Map<String, String> params) throws IOException {
//        Map<String, String> response = new HashMap<>();
//        String topText = params.get("topText");
//        String bottomText = params.get("bottomText");
//
//        if(topText != null && bottomText != null) {
//            StringBuilder getParam = new StringBuilder();
//            getParam
//                    .append("https://ronreiter-meme-generator.p.rapidapi.com/meme?font=Impact&font_size=50&meme=Condescending-Wonka&top=")
//                    .append(topText)
//                    .append("&bottom=")
//                    .append(bottomText);
//            String getParamStr = getParam.toString().replace(" ", "+");
//
//            URL url = new URL(getParamStr);
//            HttpURLConnection con = (HttpURLConnection) url.openConnection();
//            con.setRequestMethod("GET");
//            con.setRequestProperty("X-RapidAPI-Host", "ronreiter-meme-generator.p.rapidapi.com");
//            con.setRequestProperty("X-RapidAPI-Key", "a081a965a4mshf1c0e056cc36ca2p10ab90jsncdd6144f1f95");
//
//            int status = con.getResponseCode();
//
//            BufferedReader in = new BufferedReader(
//                    new InputStreamReader(con.getInputStream()));
//            String inputLine;
//            StringBuffer content = new StringBuffer();
//            while ((inputLine = in.readLine()) != null) {
//                content.append(inputLine);
//            }
//            in.close();
//            con.disconnect();
//            String res = content.toString();
//            System.out.println(res);
//        }
//
//        return response;
//    }z
}

// additional Weather API keys:
// 6d2dd29f9b0f6c23753f200fde748d77
// a42f7d9a9412365b7145d185054b1700
