package com.firmaevenimente.firmaevenimente.controllers;

import com.firmaevenimente.firmaevenimente.models.tipmomentartistic.TipMomentArtistic;
import com.firmaevenimente.firmaevenimente.repositories.TipMomentArtisticRepository;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping(produces = MediaType.APPLICATION_JSON_VALUE, value = "/api/tipMomentArtistic")
public class TipMomentArtisticController {

    TipMomentArtisticRepository tipMomentArtisticRepository;

    public TipMomentArtisticController(TipMomentArtisticRepository tipMomentArtisticRepository) {
        this.tipMomentArtisticRepository = tipMomentArtisticRepository;
    }

    @GetMapping()
    public List<TipMomentArtistic> GetTipMomentArtistic(){
        List<TipMomentArtistic> tipMomentArtistic = this.tipMomentArtisticRepository.GetTipMomentArtistic();
        return tipMomentArtistic;
    }

    @DeleteMapping(path="/{id}")
    public boolean DeleteTipMomentArtistic(@PathVariable int id){
        return this.tipMomentArtisticRepository.DeleteTipMomentArtistic(id);
    }

    @PostMapping()
    public TipMomentArtistic AddTipMomentArtistic(@RequestBody TipMomentArtistic utilizator){
        return this.tipMomentArtisticRepository.AddTipMomentArtistic(utilizator);
    }

    @PutMapping(path="/{id}")
    public  TipMomentArtistic UpdateTipMomentArtistic(@RequestBody TipMomentArtistic utilizator, @PathVariable int id){
        return this.tipMomentArtisticRepository.UpdateTipMomentArtistic(utilizator, id);
    }
}