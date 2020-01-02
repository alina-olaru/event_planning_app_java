package com.firmaevenimente.firmaevenimente.controllers;

import com.firmaevenimente.firmaevenimente.models.User;
import com.firmaevenimente.firmaevenimente.repositories.TestRepos;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(produces = MediaType.APPLICATION_JSON_VALUE, value = "/api/example")
public class ExampleController {

    final
    TestRepos testRepos;

    public ExampleController(TestRepos testRepos) {
        this.testRepos = testRepos;
    }

    @GetMapping(path = "/hello-world")
    public List<User> get(){

        List<User> list = testRepos.findAll();
        return list;
    }

}
