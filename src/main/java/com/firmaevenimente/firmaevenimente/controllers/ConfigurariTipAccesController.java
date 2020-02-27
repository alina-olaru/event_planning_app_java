package com.firmaevenimente.firmaevenimente.controllers;

import com.firmaevenimente.firmaevenimente.models.configuraritipacces.ConfigurariTipAcces;
import com.firmaevenimente.firmaevenimente.repositories.ConfigurariTipAccesRepository;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping(produces = MediaType.APPLICATION_JSON_VALUE, value = "/api/configurariTipAcces")
public class ConfigurariTipAccesController {

    ConfigurariTipAccesRepository configurariTipAccesiRepository;

    public ConfigurariTipAccesController(ConfigurariTipAccesRepository configurariTipAccesiRepository) {
        this.configurariTipAccesiRepository = configurariTipAccesiRepository;
    }

    @GetMapping()
    public List<ConfigurariTipAcces> GetConfigurariTipAcces(){
        return this.configurariTipAccesiRepository.GetConfigurariTipAcces();
    }

    @DeleteMapping(path="/{id}")
    public boolean DeleteConfigurariTipAcces(@PathVariable int id){
        return this.configurariTipAccesiRepository.DeleteConfigurariTipAcces(id);
    }

    @PostMapping()
    public ConfigurariTipAcces AddConfigurariTipAcces(@RequestBody ConfigurariTipAcces configurariTipAcces){
        return this.configurariTipAccesiRepository.AddConfigurariTipAcces(configurariTipAcces);
    }

    @PutMapping(path="/{id}")
    public  ConfigurariTipAcces UpdateConfigurariTipAcces(@RequestBody ConfigurariTipAcces configurariTipAcces, @PathVariable int id){
        return this.configurariTipAccesiRepository.UpdateConfigurariTipAcces(configurariTipAcces, id);
    }
}
