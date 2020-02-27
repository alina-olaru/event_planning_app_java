package com.firmaevenimente.firmaevenimente.controllers;

import com.firmaevenimente.firmaevenimente.models.tipmedia.TipMedia;
import com.firmaevenimente.firmaevenimente.repositories.TipMediaRepository;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping(produces = MediaType.APPLICATION_JSON_VALUE, value = "/api/tipMedia")
public class TipMediaController {

    TipMediaRepository tipMediaRepository;

    public TipMediaController(TipMediaRepository tipMediaRepository) {
        this.tipMediaRepository = tipMediaRepository;
    }

    @GetMapping()
    public List<TipMedia> GetTipMedia(){
        List<TipMedia> tipMedia = this.tipMediaRepository.GetTipMedia();
        return tipMedia;
    }

    @DeleteMapping(path="/{id}")
    public boolean DeleteTipMedia(@PathVariable int id){
        return this.tipMediaRepository.DeleteTipMedia(id);
    }

    @PostMapping()
    public TipMedia AddTipMedia(@RequestBody TipMedia utilizator){
        return this.tipMediaRepository.AddTipMedia(utilizator);
    }

    @PutMapping(path="/{id}")
    public  TipMedia UpdateTipMedia(@RequestBody TipMedia utilizator, @PathVariable int id){
        return this.tipMediaRepository.UpdateTipMedia(utilizator, id);
    }
}