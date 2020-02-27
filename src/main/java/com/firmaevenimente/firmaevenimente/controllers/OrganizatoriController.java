package com.firmaevenimente.firmaevenimente.controllers;

import com.firmaevenimente.firmaevenimente.models.organizatori.Organizatori;
import com.firmaevenimente.firmaevenimente.repositories.OrganizatoriRepository;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping(produces = MediaType.APPLICATION_JSON_VALUE, value = "/api/organizatori")
public class OrganizatoriController {

    OrganizatoriRepository organizatoriRepository;

    public OrganizatoriController(OrganizatoriRepository organizatoriRepository) {
        this.organizatoriRepository = organizatoriRepository;
    }

    @GetMapping()
    public List<Organizatori> GetOrganizatori(){
        return this.organizatoriRepository.GetOrganizatori();
    }

    @DeleteMapping(path="/{id}")
    public boolean DeleteOrganizatori(@PathVariable int id){
        return this.organizatoriRepository.DeleteOrganizatori(id);
    }

    @PostMapping()
    public Organizatori AddOrganizatori(@RequestBody Organizatori organizatori){
        return this.organizatoriRepository.AddOrganizatori(organizatori);
    }

    @PutMapping(path="/{id}")
    public  Organizatori UpdateOrganizatori(@RequestBody Organizatori organizatori, @PathVariable int id){
        return this.organizatoriRepository.UpdateOrganizatori(organizatori, id);
    }
}