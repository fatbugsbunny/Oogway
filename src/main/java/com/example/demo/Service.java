package com.example.demo;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import java.math.BigDecimal;


@org.springframework.stereotype.Service
public class Service {
    private static WaterData waterData = new WaterData(new BigDecimal("22"), new BigDecimal("7.6"), new BigDecimal("600"));

    private final Repository repository;

    public Service(Repository repository) {
        this.repository = repository;
    }

    public static void setWaterData(WaterData givenWaterData) {
        waterData = givenWaterData;
    }

    public void addWaterData(WaterData waterData) {
        repository.save(waterData);
    }

    public static WaterData getWaterData() {
        return waterData;
    }

    public Page<WaterData> getPagedWaterData(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return repository.findAll(pageable);
    }
}
