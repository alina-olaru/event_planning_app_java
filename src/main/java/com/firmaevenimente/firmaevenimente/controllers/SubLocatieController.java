package com.firmaevenimente.firmaevenimente.controllers;

import com.firmaevenimente.firmaevenimente.models.sublocatie.SubLocatie;
import com.firmaevenimente.firmaevenimente.repositories.SubLocatieRepository;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping(produces = MediaType.APPLICATION_JSON_VALUE, value = "/api/subLocatie")
public class SubLocatieController {

    SubLocatieRepository subLocatieRepository;

    public SubLocatieController(SubLocatieRepository subLocatieRepository) {
        this.subLocatieRepository = subLocatieRepository;
    }

    @GetMapping()
    public List<SubLocatie> GetSubLocatie(){
        List<SubLocatie> subLocatie = this.subLocatieRepository.GetSubLocatie();
        return subLocatie;
    }

    @DeleteMapping(path="/{id}")
    public boolean DeleteSubLocatie(@PathVariable int id){
        return this.subLocatieRepository.DeleteSubLocatie(id);
    }

    @PostMapping()
    public SubLocatie AddSubLocatie(@RequestBody SubLocatie utilizator){
        return this.subLocatieRepository.AddSubLocatie(utilizator);
    }

    @PutMapping(path="/{id}")
    public  SubLocatie UpdateSubLocatie(@RequestBody SubLocatie utilizator, @PathVariable int id){
        return this.subLocatieRepository.UpdateSubLocatie(utilizator, id);
    }
}