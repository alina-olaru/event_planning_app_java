package com.firmaevenimente.firmaevenimente.controllers;

import com.firmaevenimente.firmaevenimente.models.tipserviremeniu.TipServireMeniu;
import com.firmaevenimente.firmaevenimente.repositories.TipServireMeniuRepository;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping(produces = MediaType.APPLICATION_JSON_VALUE, value = "/api/tipServireMeniu")
public class TipServireMeniuController {

    TipServireMeniuRepository tipServireMeniuRepository;

    public TipServireMeniuController(TipServireMeniuRepository tipServireMeniuRepository) {
        this.tipServireMeniuRepository = tipServireMeniuRepository;
    }

    @GetMapping()
    public List<TipServireMeniu> GetTipServireMeniu(){
        List<TipServireMeniu> tipServireMeniu = this.tipServireMeniuRepository.GetTipServireMeniu();
        return tipServireMeniu;
    }

    @DeleteMapping(path="/{id}")
    public boolean DeleteTipServireMeniu(@PathVariable int id){
        return this.tipServireMeniuRepository.DeleteTipServireMeniu(id);
    }

    @PostMapping()
    public TipServireMeniu AddTipServireMeniu(@RequestBody TipServireMeniu utilizator){
        return this.tipServireMeniuRepository.AddTipServireMeniu(utilizator);
    }

    @PutMapping(path="/{id}")
    public  TipServireMeniu UpdateTipServireMeniu(@RequestBody TipServireMeniu utilizator, @PathVariable int id){
        return this.tipServireMeniuRepository.UpdateTipServireMeniu(utilizator, id);
    }
}