package com.firmaevenimente.firmaevenimente.controllers;

import com.firmaevenimente.firmaevenimente.models.bautura.Bautura;
import com.firmaevenimente.firmaevenimente.repositories.BauturaRepository;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping(produces = MediaType.APPLICATION_JSON_VALUE, value = "/api/bautura")
public class BauturaController {

    BauturaRepository bauturaRepository;

    public BauturaController(BauturaRepository bauturaRepository) {
        this.bauturaRepository = bauturaRepository;
    }

    @GetMapping()
    public List<Bautura> GetBautura(){
        List<Bautura> bautura = this.bauturaRepository.GetBautura();
        return bautura;
    }

    @DeleteMapping(path="/{id}")
    public boolean DeleteBautura(@PathVariable int id){
        return this.bauturaRepository.DeleteBautura(id);
    }

    @PostMapping()
    public Bautura AddBautura(@RequestBody Bautura utilizator){
        return this.bauturaRepository.AddBautura(utilizator);
    }

    @PutMapping(path="/{id}")
    public  Bautura UpdateBautura(@RequestBody Bautura utilizator, @PathVariable int id){
        return this.bauturaRepository.UpdateBautura(utilizator, id);
    }
}
