package com.firmaevenimente.firmaevenimente.controllers;

import com.firmaevenimente.firmaevenimente.models.tipmeniu.TipMeniu;
import org.springframework.http.MediaType;
import com.firmaevenimente.firmaevenimente.repositories.TipMeniuRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping(produces = MediaType.APPLICATION_JSON_VALUE, value = "/api/tipMeniu")
public class TipMeniuController {

    TipMeniuRepository tipMeniuRepository;

    public TipMeniuController(TipMeniuRepository tipMeniuRepository) {
        this.tipMeniuRepository = tipMeniuRepository;
    }

    @GetMapping()
    public List<TipMeniu> GetTipMeniu(){
        List<TipMeniu> tipMeniu = this.tipMeniuRepository.GetTipMeniu();
        return tipMeniu;
    }

    @DeleteMapping(path="/{id}")
    public boolean DeleteTipMeniu(@PathVariable int id){
        return this.tipMeniuRepository.DeleteTipMeniu(id);
    }

    @PostMapping()
    public TipMeniu AddTipMeniu(@RequestBody TipMeniu utilizator){
        return this.tipMeniuRepository.AddTipMeniu(utilizator);
    }

    @PutMapping(path="/{id}")
    public  TipMeniu UpdateTipMeniu(@RequestBody TipMeniu utilizator, @PathVariable int id){
        return this.tipMeniuRepository.UpdateTipMeniu(utilizator, id);
    }
}