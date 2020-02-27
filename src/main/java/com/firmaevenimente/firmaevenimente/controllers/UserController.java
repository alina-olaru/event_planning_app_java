package com.firmaevenimente.firmaevenimente.controllers;

import com.firmaevenimente.firmaevenimente.models.autentificare.LoginUserModel;
import com.firmaevenimente.firmaevenimente.models.autentificare.RegisterUserModel;
import com.firmaevenimente.firmaevenimente.models.autentificare.User;
import com.firmaevenimente.firmaevenimente.repositories.UserRepository;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping(produces = MediaType.APPLICATION_JSON_VALUE, value = "/api/user")
public class UserController {


    final
    UserRepository userRepository;

    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @PostMapping(path = "/login")
    public User get_info(@RequestBody LoginUserModel userModel) {

        return userRepository.loginUser(userModel);
    }

    @PostMapping(path="/register")
    public  User post_user(@RequestBody RegisterUserModel userModel){
        return userRepository.registerUser(userModel);
    }
}

