package com.firmaevenimente.firmaevenimente.controllers;

import com.firmaevenimente.firmaevenimente.models.User;
import com.firmaevenimente.firmaevenimente.repositories.TestRepos;
import com.firmaevenimente.firmaevenimente.repositories.UserRepos;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(produces = MediaType.APPLICATION_JSON_VALUE, value = "/api/user")
public class UserController {


    final
    UserRepos userRepos;

    public UserController(UserRepos userRepos) {
        this.userRepos = userRepos;
    }

    @GetMapping(path = "/login")
    public List<User> get_info(@RequestParam String name) {

        List<User> list = userRepos.findInfo(name);
        return list;
    }
}

