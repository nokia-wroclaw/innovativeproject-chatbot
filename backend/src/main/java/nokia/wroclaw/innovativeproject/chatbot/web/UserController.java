package nokia.wroclaw.innovativeproject.chatbot.web;

import nokia.wroclaw.innovativeproject.chatbot.domain.Request;
import nokia.wroclaw.innovativeproject.chatbot.domain.User;
import nokia.wroclaw.innovativeproject.chatbot.payload.JWTLoginSucessResponse;
import nokia.wroclaw.innovativeproject.chatbot.payload.LoginRequest;
import nokia.wroclaw.innovativeproject.chatbot.security.JwtTokenProvider;
import nokia.wroclaw.innovativeproject.chatbot.service.MapValidationErrorService;
import nokia.wroclaw.innovativeproject.chatbot.service.UserService;
import nokia.wroclaw.innovativeproject.chatbot.validator.UserValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.xml.ws.Response;

import java.security.Principal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static nokia.wroclaw.innovativeproject.chatbot.security.SecurityConstants.TOKEN_PREFIX;

@RestController
@RequestMapping("/api/users")
@CrossOrigin
public class UserController {

    @Autowired
    private MapValidationErrorService mapValidationErrorService;

    @Autowired
    private UserService userService;

    @Autowired
    private UserValidator userValidator;

    @Autowired
    private JwtTokenProvider tokenProvider;

    @Autowired
    private AuthenticationManager authenticationManager;

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest, BindingResult result) {
        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if(errorMap != null) return errorMap;

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getUsername(),
                        loginRequest.getPassword()
                )
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = TOKEN_PREFIX + tokenProvider.generateToken(authentication);

        return ResponseEntity.ok(new JWTLoginSucessResponse(true, jwt));
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody User user, BindingResult result) {
        // validate passwords match
        userValidator.validate(user, result);

        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if(errorMap != null) return errorMap;

        User newUser = userService.saveUser(user);
        return new ResponseEntity<User>(newUser, HttpStatus.CREATED);
    }

    @PostMapping("/setAvatar")
    public ResponseEntity<?> setUserAvatar(@RequestBody Map<String, String> image, Principal principal, BindingResult result) {
        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if(errorMap != null) return errorMap;

        Map<String, String> response = userService.setUserAvatar(principal.getName(), image);
        return new ResponseEntity<Map>(response, HttpStatus.OK);
    }

    @GetMapping("/getAvatar")
    public String getUserRequests(Principal principal) {
        User currentUser = userService.getUser(principal.getName());
        return userService.getUserAvatar(currentUser.getUsername());
    }

    @GetMapping("/getAllUsernames")
    public ResponseEntity<?> getAllUsernames(Principal principal) {
        User currentUser;
        Map<Object, String> userList = new HashMap<>();

        if (principal == null) {
            userList.put("status", "You do not have permission to see this information!");
        } else {
            currentUser = userService.getUser(principal.getName());
            userList = userService.getAllUsernames(currentUser);
        }

        return new ResponseEntity<Map>(userList, HttpStatus.OK);
    }

    @PostMapping("/giveAdmin")
    public ResponseEntity<?> giveAdminPermissions(@RequestBody Map<String, String> user, Principal principal) {
        User fromUser;
        Map<String, String> response = new HashMap<>();

        if (principal == null) {
            response.put("status", "You do not have permission to see this information!");
            return new ResponseEntity<Map>(response, HttpStatus.OK);
        } else {
            fromUser = userService.getUser(principal.getName());
            response = userService.giveAdminPermissions(fromUser, user);
        }

        return new ResponseEntity<Map>(response, HttpStatus.OK);
    }

    @GetMapping("/getIsAdmin")
    public boolean getIsAdmin(Principal principal) {
        User currentUser = userService.getUser(principal.getName());
        return userService.getIsAdmin(currentUser.getUsername());
    }

}
