package com.firmaevenimente.firmaevenimente.controllers;

import com.firmaevenimente.firmaevenimente.models.tiplocatie.TipLocatie;
import com.firmaevenimente.firmaevenimente.repositories.TipLocatieRepository;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping(produces = MediaType.APPLICATION_JSON_VALUE, value = "/api/tipLocatie")
public class TipLocatieController {

    TipLocatieRepository tipLocatieRepository;

    public TipLocatieController(TipLocatieRepository tipLocatieRepository) {
        this.tipLocatieRepository = tipLocatieRepository;
    }

    @GetMapping()
    public List<TipLocatie> GetTipLocatie(){
        List<TipLocatie> tipLocatie = this.tipLocatieRepository.GetTipLocatie();
        return tipLocatie;
    }

    @DeleteMapping(path="/{id}")
    public boolean DeleteTipLocatie(@PathVariable int id){
        return this.tipLocatieRepository.DeleteTipLocatie(id);
    }

    @PostMapping()
    public TipLocatie AddTipLocatie(@RequestBody TipLocatie utilizator){
        return this.tipLocatieRepository.AddTipLocatie(utilizator);
    }

    @PutMapping(path="/{id}")
    public  TipLocatie UpdateTipLocatie(@RequestBody TipLocatie utilizator, @PathVariable int id){
        return this.tipLocatieRepository.UpdateTipLocatie(utilizator, id);
    }
}