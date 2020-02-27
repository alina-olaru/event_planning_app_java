package com.firmaevenimente.firmaevenimente.controllers;

import com.firmaevenimente.firmaevenimente.models.elementedesign.ElementeDesign;
import com.firmaevenimente.firmaevenimente.repositories.ElementeDesignRepository;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping(produces = MediaType.APPLICATION_JSON_VALUE, value = "/api/elementeDesign")
public class ElementeDesignController {

    ElementeDesignRepository elementeDesignRepository;

    public ElementeDesignController(ElementeDesignRepository elementeDesignRepository) {
        this.elementeDesignRepository = elementeDesignRepository;
    }

    @GetMapping()
    public List<ElementeDesign> GetElementeDesign(){
        List<ElementeDesign> elementeDesign = this.elementeDesignRepository.GetElementeDesign();
        return elementeDesign;
    }

    @DeleteMapping(path="/{id}")
    public boolean DeleteElementeDesign(@PathVariable int id){
        return this.elementeDesignRepository.DeleteElementeDesign(id);
    }

    @PostMapping()
    public ElementeDesign AddElementeDesign(@RequestBody ElementeDesign utilizator){
        return this.elementeDesignRepository.AddElementeDesign(utilizator);
    }

    @PutMapping(path="/{id}")
    public  ElementeDesign UpdateElementeDesign(@RequestBody ElementeDesign utilizator, @PathVariable int id){
        return this.elementeDesignRepository.UpdateElementeDesign(utilizator, id);
    }
}