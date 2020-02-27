package com.firmaevenimente.firmaevenimente.controllers;

import com.firmaevenimente.firmaevenimente.models.locatie.Locatie;
import com.firmaevenimente.firmaevenimente.repositories.LocatieRepository;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping(produces = MediaType.APPLICATION_JSON_VALUE, value = "/api/locatie")
public class LocatieController {

    LocatieRepository locatieRepository;

    public LocatieController(LocatieRepository locatieRepository) {
        this.locatieRepository = locatieRepository;
    }

    @GetMapping()
    public List<Locatie> GetLocatie(){
        List<Locatie> locatie = this.locatieRepository.GetLocatie();
        return locatie;
    }

    @DeleteMapping(path="/{id}")
    public boolean DeleteLocatie(@PathVariable int id){
        return this.locatieRepository.DeleteLocatie(id);
    }

    @PostMapping()
    public Locatie AddLocatie(@RequestBody Locatie utilizator){
        return this.locatieRepository.AddLocatie(utilizator);
    }

    @PutMapping(path="/{id}")
    public  Locatie UpdateLocatie(@RequestBody Locatie utilizator, @PathVariable int id){
        return this.locatieRepository.UpdateLocatie(utilizator, id);
    }
}