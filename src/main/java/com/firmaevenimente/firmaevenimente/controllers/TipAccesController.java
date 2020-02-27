package com.firmaevenimente.firmaevenimente.controllers;

import com.firmaevenimente.firmaevenimente.models.tipacces.TipAcces;
import com.firmaevenimente.firmaevenimente.repositories.TipAccesRepository;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@CrossOrigin
@RequestMapping(produces = MediaType.APPLICATION_JSON_VALUE, value = "/api/tipAcces")
public class TipAccesController {

    TipAccesRepository tipAccesRepository;

    public TipAccesController(TipAccesRepository tipAccesRepository) {
        this.tipAccesRepository = tipAccesRepository;
    }

    @GetMapping()
    public List<TipAcces> GetTipAcces(){
        return this.tipAccesRepository.GetTipAcces();
    }

    @DeleteMapping(path="/{id}")
    public boolean DeleteTipAcces(@PathVariable int id){
        return this.tipAccesRepository.DeleteTipAcces(id);
    }

    @PostMapping()
    public TipAcces AddTipAcces(@RequestBody TipAcces tipAcces){
        return this.tipAccesRepository.AddTipAcces(tipAcces);
    }

}
