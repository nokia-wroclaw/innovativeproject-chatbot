package nokia.wroclaw.innovativeproject.chatbot.web;

import nokia.wroclaw.innovativeproject.chatbot.service.ExternalAPIService;
import nokia.wroclaw.innovativeproject.chatbot.service.MapValidationErrorService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;


import java.io.IOException;
import java.util.Map;


@RestController
@RequestMapping("/api/services")
@CrossOrigin
public class ExternalAPIController {

    @Autowired
    private ExternalAPIService externalAPIService;

    @Autowired
    private MapValidationErrorService mapValidationErrorService;

    @PostMapping("/weather")
    public ResponseEntity<?> getWeather(@RequestBody Map<String, String> params, BindingResult result) {
        // check for errors
        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if (errorMap != null) return errorMap;

        Map<String, String> forecast = externalAPIService.getForecastFromApi(params);

        return new ResponseEntity<Map>(forecast, HttpStatus.OK);
    }

}
