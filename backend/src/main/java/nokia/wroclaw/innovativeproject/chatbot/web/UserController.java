package nokia.wroclaw.innovativeproject.chatbot.web;

import nokia.wroclaw.innovativeproject.chatbot.domain.User;
import nokia.wroclaw.innovativeproject.chatbot.exceptions.oauth2.ResourceNotFoundException;
import nokia.wroclaw.innovativeproject.chatbot.repository.UserRepository;
import nokia.wroclaw.innovativeproject.chatbot.security.CurrentUser;
import nokia.wroclaw.innovativeproject.chatbot.security.UserPrincipal;
import nokia.wroclaw.innovativeproject.chatbot.service.MapValidationErrorService;
import nokia.wroclaw.innovativeproject.chatbot.service.UserService;
import nokia.wroclaw.innovativeproject.chatbot.util.LoggerUtil;
import nokia.wroclaw.innovativeproject.chatbot.util.loggers.PermissionLogger;
import nokia.wroclaw.innovativeproject.chatbot.util.loggers.RequestLogger;
import nokia.wroclaw.innovativeproject.chatbot.validator.UserValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;

import java.io.*;
import java.security.Principal;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.*;


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
    private UserRepository userRepository;

    @Autowired
    private AuthenticationManager authenticationManager;

    private LoggerUtil logger = new LoggerUtil("users.txt");
    private DateFormat dateFormat = new SimpleDateFormat("dd-mm-yyyy hh:mm:ss");

    @GetMapping("/user/me")
    @PreAuthorize("hasRole('USER')")
    public User getCurrentUser(@CurrentUser UserPrincipal userPrincipal) {
        return userRepository.findById(userPrincipal.getId())
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userPrincipal.getId()));
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

        // log action
        logger.log(new PermissionLogger(dateFormat.format(new Date()), "INFO", "Add Admin Permissions", principal.getName(), user.get("username")));

        return new ResponseEntity<Map>(response, HttpStatus.OK);
    }

    @GetMapping("/getIsAdmin")
    public boolean getIsAdmin(Principal principal) {
        if(principal != null) {
            User currentUser = userService.getUser(principal.getName());
            return userService.getIsAdmin(currentUser.getUsername());
        }
        return false;
    }

    @RequestMapping(value = "/getBackupFile", method = RequestMethod.GET)
    public void getBackupFile(HttpServletResponse response) {
        try {
            // get file as InputStream
            InputStream is = new FileInputStream("./logs/users.txt");

            // at JSON array characters
            String beginning = "[";
            String end = "]";
            List<InputStream> streams = Arrays.asList(
                    new ByteArrayInputStream(beginning.getBytes()),
                    is,
                    new ByteArrayInputStream(end.getBytes()));
            InputStream modified = new SequenceInputStream(Collections.enumeration(streams));

            // copy it to response's OutputStream
            org.apache.commons.io.IOUtils.copy(modified, response.getOutputStream());
            response.setContentType("application/json");
            response.flushBuffer();
        } catch (IOException ex) {
            logger.log(new RequestLogger(dateFormat.format(new Date()), "INFO", "Error writing file to output stream.", null, null));
            throw new RuntimeException("IOError writing file to output stream");
        }

    }



    @PostMapping("/clearConversation")
    public ResponseEntity<?> clearUserConversation(Principal principal) {
        Map<Object, String> status = new HashMap<>();
        if(principal != null) {
            User currentUser = userService.getUser(principal.getName());
            Map<String, String> response =  userService.clearUserConversation(currentUser);
            return new ResponseEntity<Map>(response, HttpStatus.OK);
        }
        status.put("error", "Cannot find the user");
        return new ResponseEntity<Map>(status, HttpStatus.BAD_REQUEST);
    }

}
