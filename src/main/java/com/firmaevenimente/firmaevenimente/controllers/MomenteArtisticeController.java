package com.firmaevenimente.firmaevenimente.controllers;

import com.firmaevenimente.firmaevenimente.models.momenteartistice.MomenteArtistice;
import com.firmaevenimente.firmaevenimente.repositories.MomenteArtisticeRepository;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping(produces = MediaType.APPLICATION_JSON_VALUE, value = "/api/momenteArtistice")
public class MomenteArtisticeController {

    MomenteArtisticeRepository momenteArtisticeiRepository;

    public MomenteArtisticeController(MomenteArtisticeRepository momenteArtisticeiRepository) {
        this.momenteArtisticeiRepository = momenteArtisticeiRepository;
    }

    @GetMapping()
    public List<MomenteArtistice> GetMomenteArtistice(){
        return this.momenteArtisticeiRepository.GetMomenteArtistice();
    }

    @DeleteMapping(path="/{id}")
    public boolean DeleteMomenteArtistice(@PathVariable int id){
        return this.momenteArtisticeiRepository.DeleteMomenteArtistice(id);
    }

    @PostMapping()
    public MomenteArtistice AddMomenteArtistice(@RequestBody MomenteArtistice momenteArtistice){
        return this.momenteArtisticeiRepository.AddMomenteArtistice(momenteArtistice);
    }

    @PutMapping(path="/{id}")
    public  MomenteArtistice UpdateMomenteArtistice(@RequestBody MomenteArtistice momenteArtistice, @PathVariable int id){
        return this.momenteArtisticeiRepository.UpdateMomenteArtistice(momenteArtistice, id);
    }
}
