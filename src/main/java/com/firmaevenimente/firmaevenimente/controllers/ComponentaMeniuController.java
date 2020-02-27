package com.firmaevenimente.firmaevenimente.controllers;

import com.firmaevenimente.firmaevenimente.models.componentameniu.ComponentaMeniu;
import com.firmaevenimente.firmaevenimente.repositories.ComponentaMeniuRepository;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping(produces = MediaType.APPLICATION_JSON_VALUE, value = "/api/componentaMeniu")
public class ComponentaMeniuController {

    ComponentaMeniuRepository componentaMeniuRepository;

    public ComponentaMeniuController(ComponentaMeniuRepository componentaMeniuRepository) {
        this.componentaMeniuRepository = componentaMeniuRepository;
    }

    @GetMapping()
    public List<ComponentaMeniu> GetComponentaMeniu(){
        return this.componentaMeniuRepository.GetComponentaMeniu();
    }

    @DeleteMapping(path="/{id}")
    public boolean DeleteComponentaMeniu(@PathVariable int id){
        return this.componentaMeniuRepository.DeleteComponentaMeniu(id);
    }

    @PostMapping()
    public ComponentaMeniu AddComponentaMeniu(@RequestBody ComponentaMeniu componentaMeniu){
        return this.componentaMeniuRepository.AddComponentaMeniu(componentaMeniu);
    }

    @PutMapping(path="/{id}")
    public  ComponentaMeniu UpdateComponentaMeniu(@RequestBody ComponentaMeniu componentaMeniu, @PathVariable int id){
        return this.componentaMeniuRepository.UpdateComponentaMeniu(componentaMeniu, id);
    }
}
