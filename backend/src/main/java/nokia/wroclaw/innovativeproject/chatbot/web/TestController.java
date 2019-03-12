package nokia.wroclaw.innovativeproject.chatbot.web;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;

@RestController
@RequestMapping("/api/test")
@CrossOrigin
public class TestController {

    @GetMapping("/")
    public ResponseEntity<?> getTestResponse() {
        HashMap<String, String> map = new HashMap<>();
        map.put("hello", "nokia dev :)");
        return new ResponseEntity<HashMap>(map, HttpStatus.OK);
    }

}
