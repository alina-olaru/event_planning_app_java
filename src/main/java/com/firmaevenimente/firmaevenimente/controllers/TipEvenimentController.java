package com.firmaevenimente.firmaevenimente.controllers;

import com.firmaevenimente.firmaevenimente.models.tipeveniment.TipEveniment;
import com.firmaevenimente.firmaevenimente.repositories.TipEvenimentRepository;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping(produces = MediaType.APPLICATION_JSON_VALUE, value = "/api/tipEveniment")
public class TipEvenimentController {

    TipEvenimentRepository tipEvenimentRepository;

    public TipEvenimentController(TipEvenimentRepository tipEvenimentRepository) {
        this.tipEvenimentRepository = tipEvenimentRepository;
    }

    @GetMapping()
    public List<TipEveniment> GetTipEveniment(){
        List<TipEveniment> tipEveniment = this.tipEvenimentRepository.GetTipEveniment();
        return tipEveniment;
    }

    @DeleteMapping(path="/{id}")
    public boolean DeleteTipEveniment(@PathVariable int id){
        return this.tipEvenimentRepository.DeleteTipEveniment(id);
    }

    @PostMapping()
    public TipEveniment AddTipEveniment(@RequestBody TipEveniment utilizator){
        return this.tipEvenimentRepository.AddTipEveniment(utilizator);
    }

    @PutMapping(path="/{id}")
    public  TipEveniment UpdateTipEveniment(@RequestBody TipEveniment utilizator, @PathVariable int id){
        return this.tipEvenimentRepository.UpdateTipEveniment(utilizator, id);
    }
}