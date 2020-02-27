package com.firmaevenimente.firmaevenimente.controllers;

import com.firmaevenimente.firmaevenimente.models.tiplocatiesubeveniment.TipLocatieSubEveniment;
import com.firmaevenimente.firmaevenimente.repositories.TipLocatieSubEvenimentRepository;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping(produces = MediaType.APPLICATION_JSON_VALUE, value = "/api/tipLocatieSubEveniment")
public class TipLocatieSubEvenimentController {

    TipLocatieSubEvenimentRepository tipLocatieSubEvenimentiRepository;

    public TipLocatieSubEvenimentController(TipLocatieSubEvenimentRepository tipLocatieSubEvenimentiRepository) {
        this.tipLocatieSubEvenimentiRepository = tipLocatieSubEvenimentiRepository;
    }

    @GetMapping()
    public List<TipLocatieSubEveniment> GetTipLocatieSubEveniment(){
        return this.tipLocatieSubEvenimentiRepository.GetTipLocatieSubEveniment();
    }

    @DeleteMapping(path="/{id_sub_eveniment}/{id_locatie}")
    public boolean DeleteTipLocatieSubEveniment(@PathVariable int id_sub_eveniment, @PathVariable int id_locatie){
        return this.tipLocatieSubEvenimentiRepository.DeleteTipLocatieSubEveniment(id_sub_eveniment, id_locatie);
    }

    @PostMapping()
    public TipLocatieSubEveniment AddTipLocatieSubEveniment(@RequestBody TipLocatieSubEveniment tipLocatieSubEveniment){
        return this.tipLocatieSubEvenimentiRepository.AddTipLocatieSubEveniment(tipLocatieSubEveniment);
    }

}