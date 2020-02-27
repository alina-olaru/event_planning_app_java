package com.firmaevenimente.firmaevenimente.controllers;

import com.firmaevenimente.firmaevenimente.models.tipaccessubeveniment.TipAccesSubEveniment;
import com.firmaevenimente.firmaevenimente.repositories.TipAccesSubEvenimentRepository;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping(produces = MediaType.APPLICATION_JSON_VALUE, value = "/api/tipAccesSubEveniment")
public class TipAccesSubEvenimentController {

    TipAccesSubEvenimentRepository tipAccesSubEvenimentiRepository;

    public TipAccesSubEvenimentController(TipAccesSubEvenimentRepository tipAccesSubEvenimentiRepository) {
        this.tipAccesSubEvenimentiRepository = tipAccesSubEvenimentiRepository;
    }

    @GetMapping()
    public List<TipAccesSubEveniment> GetTipAccesSubEveniment(){
        return this.tipAccesSubEvenimentiRepository.GetTipAccesSubEveniment();
    }

    @DeleteMapping(path="/{id_sub_eveniment}/{id_acces}")
    public boolean DeleteTipAccesSubEveniment(@PathVariable int id_sub_eveniment, @PathVariable int id_acces){
        return this.tipAccesSubEvenimentiRepository.DeleteTipAccesSubEveniment(id_sub_eveniment, id_acces);
    }

    @PostMapping()
    public TipAccesSubEveniment AddTipAccesSubEveniment(@RequestBody TipAccesSubEveniment tipAccesSubEveniment){
        return this.tipAccesSubEvenimentiRepository.AddTipAccesSubEveniment(tipAccesSubEveniment);
    }

}