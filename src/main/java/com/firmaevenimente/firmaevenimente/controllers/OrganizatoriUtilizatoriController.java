package com.firmaevenimente.firmaevenimente.controllers;

import com.firmaevenimente.firmaevenimente.models.utilizatori.Utilizator;
import com.firmaevenimente.firmaevenimente.repositories.OrganizatoriUtilizatoriRepository;
import com.firmaevenimente.firmaevenimente.repositories.UtilizatoriRepository;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping(produces = MediaType.APPLICATION_JSON_VALUE, value = "/api/organizatori-utilizatori")
public class OrganizatoriUtilizatoriController {
    OrganizatoriUtilizatoriRepository utilizatoriRepository;

    public OrganizatoriUtilizatoriController(OrganizatoriUtilizatoriRepository utilizatoriRepository) {
        this.utilizatoriRepository = utilizatoriRepository;
    }

    @GetMapping()
    public List<Utilizator> GetUtilizatori(){
        return this.utilizatoriRepository.GetUtilizatori();
    }

    @DeleteMapping(path="/{id}")
    public boolean DeleteUtilizator(@PathVariable int id){
        return this.utilizatoriRepository.DeleteUtilizator(id);
    }

    @PostMapping()
    public Utilizator AddUtilizator(@RequestBody Utilizator utilizator){
        return this.utilizatoriRepository.AddUtilizator(utilizator);
    }

    @PutMapping(path="/{id}")
    public  Utilizator UpdateUtilizator(@RequestBody Utilizator utilizator, @PathVariable int id){
        return this.utilizatoriRepository.UpdateUtilizator(utilizator, id);
    }
}
