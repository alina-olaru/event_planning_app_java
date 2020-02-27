package com.firmaevenimente.firmaevenimente.controllers;

import com.firmaevenimente.firmaevenimente.models.media.Media;
import com.firmaevenimente.firmaevenimente.repositories.MediaRepository;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping(produces = MediaType.APPLICATION_JSON_VALUE, value = "/api/media")
public class MediaController {

    MediaRepository mediaRepository;

    public MediaController(MediaRepository mediaRepository) {
        this.mediaRepository = mediaRepository;
    }

    @GetMapping()
    public List<Media> GetMedia(){
        List<Media> media = this.mediaRepository.GetMedia();
        return media;
    }

    @DeleteMapping(path="/{id}")
    public boolean DeleteMedia(@PathVariable int id){
        return this.mediaRepository.DeleteMedia(id);
    }

    @PostMapping()
    public Media AddMedia(@RequestBody Media utilizator){
        return this.mediaRepository.AddMedia(utilizator);
    }

    @PutMapping(path="/{id}")
    public  Media UpdateMedia(@RequestBody Media utilizator, @PathVariable int id){
        return this.mediaRepository.UpdateMedia(utilizator, id);
    }
}