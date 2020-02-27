package com.firmaevenimente.firmaevenimente.controllers;

import com.firmaevenimente.firmaevenimente.models.subtipeveniment.SubTipEveniment;
import com.firmaevenimente.firmaevenimente.repositories.SubTipEvenimentRepository;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping(produces = MediaType.APPLICATION_JSON_VALUE, value = "/api/subTipEveniment")
public class SubTipEvenimentController {

    SubTipEvenimentRepository subTipEvenimentRepository;

    public SubTipEvenimentController(SubTipEvenimentRepository subTipEvenimentRepository) {
        this.subTipEvenimentRepository = subTipEvenimentRepository;
    }

    @GetMapping()
    public List<SubTipEveniment> GetSubTipEveniment(){
        List<SubTipEveniment> subTipEveniment = this.subTipEvenimentRepository.GetSubTipEveniment();
        return subTipEveniment;
    }

    @DeleteMapping(path="/{id}")
    public boolean DeleteSubTipEveniment(@PathVariable int id){
        return this.subTipEvenimentRepository.DeleteSubTipEveniment(id);
    }

    @PostMapping()
    public SubTipEveniment AddSubTipEveniment(@RequestBody SubTipEveniment utilizator){
        return this.subTipEvenimentRepository.AddSubTipEveniment(utilizator);
    }

    @PutMapping(path="/{id}")
    public  SubTipEveniment UpdateSubTipEveniment(@RequestBody SubTipEveniment utilizator, @PathVariable int id){
        return this.subTipEvenimentRepository.UpdateSubTipEveniment(utilizator, id);
    }
}