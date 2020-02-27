package com.firmaevenimente.firmaevenimente.controllers;

import com.firmaevenimente.firmaevenimente.models.tiputilizatori.TipUtilizator;
import com.firmaevenimente.firmaevenimente.repositories.TipUtilizatoriRepository;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping(produces = MediaType.APPLICATION_JSON_VALUE, value = "/api/tiputilizatori")
public class TipUtilizatoriController {

    TipUtilizatoriRepository tipUtilizatoriRepository;

    public TipUtilizatoriController(TipUtilizatoriRepository tipUtilizatoriRepository) {
        this.tipUtilizatoriRepository = tipUtilizatoriRepository;
    }

    @GetMapping()
    public List<TipUtilizator> GetTipUtilizatori(){
        return this.tipUtilizatoriRepository.GetTipUtilizatori();
    }

    @DeleteMapping(path="/{id}")
    public boolean DeleteTipUtilizator(@PathVariable int id){
        return this.tipUtilizatoriRepository.DeleteTipUtilizator(id);
    }

    @PostMapping()
    public TipUtilizator AddTipUtilizator(@RequestBody TipUtilizator tipUtilizator){
        return this.tipUtilizatoriRepository.AddTipUtilizator(tipUtilizator);
    }

}
