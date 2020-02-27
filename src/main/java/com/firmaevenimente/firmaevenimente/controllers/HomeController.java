package com.firmaevenimente.firmaevenimente.controllers;

import com.firmaevenimente.firmaevenimente.models.home.HomeEveniment;
import com.firmaevenimente.firmaevenimente.models.home.TopEveniment;
import com.firmaevenimente.firmaevenimente.repositories.HomeRepository;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping(produces = MediaType.APPLICATION_JSON_VALUE, value = "/api/home")
public class HomeController {

    private HomeRepository homeRepository;

    public HomeController(HomeRepository homeRepository){

        this.homeRepository = homeRepository;
    }

    @GetMapping(path = "/get-evenimente/{id_utilizator}")
    public List<HomeEveniment> GetEvenimenteUtilizator(@PathVariable int id_utilizator, @RequestParam float min_cost_total,@RequestParam float max_cost_total){
        return this.homeRepository.GetEvenimenteUser(id_utilizator, min_cost_total, max_cost_total);
    }

    @GetMapping(path = "/get-top-tip-evenimente/{id_utilizator}")
    public List<TopEveniment> GetTopTipEvenimente(@PathVariable int id_utilizator, @RequestParam int minim_evenimente){
        return this.homeRepository.GetTopTipEvenimente(id_utilizator, minim_evenimente);
    }
}
