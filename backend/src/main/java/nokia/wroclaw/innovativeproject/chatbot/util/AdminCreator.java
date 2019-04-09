package nokia.wroclaw.innovativeproject.chatbot.util;

import nokia.wroclaw.innovativeproject.chatbot.domain.Request;
import nokia.wroclaw.innovativeproject.chatbot.domain.User;
import nokia.wroclaw.innovativeproject.chatbot.exceptions.authentication.UsernameAlreadyExistsException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.RequestBody;
import nokia.wroclaw.innovativeproject.chatbot.service.UserService;

import javax.validation.Valid;

public class AdminCreator {


    public void createAdmin() {
        try {
            User admin = new User((long) 0, "admin@gmail.com", "admin", "Admin1", "Admin1", null, null, null, null, true);
            User user = new UserService().saveUser(admin);
        } catch(UsernameAlreadyExistsException e){
            System.out.println("Admin already exist, not need to create another one");
        }
        System.out.println("Admin created");
    }
//
//    public ResponseEntity<?> registerUser(@Valid @RequestBody User user, BindingResult result) {
//        // validate passwords match
//        userValidator.validate(user, result);
//
//        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
//        if(errorMap != null) return errorMap;
//
//        User newUser = userService.saveUser(user);
//        return new ResponseEntity<User>(newUser, HttpStatus.CREATED);
//    }
    }
