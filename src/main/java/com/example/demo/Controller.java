package com.example.demo;

import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
public class Controller {
    private final Service service;

    public Controller(Service service) {
        this.service = service;
    }

    @GetMapping("/pagedWaterData")
    public Page<WaterData> getPagedWaterData(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        return service.getPagedWaterData(page,size);
    }

    @PostMapping("/waterData")
    public void addWaterData(@RequestBody WaterData waterData) {
        service.addWaterData(waterData);
        Service.setWaterData(waterData);
    }


}
