package com.example.demo;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

import java.math.BigDecimal;

import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest
class RepositoryTest {
    @Autowired
    private Repository repository;
    private WaterData testedWaterData;

    @BeforeEach
    void setUp() {
        testedWaterData = new WaterData();
        testedWaterData.setpH(new BigDecimal("7.4"));
        testedWaterData.setORP(new BigDecimal("4.5"));
        testedWaterData.setTemperature(new BigDecimal("34.6"));
        repository.save(testedWaterData);
    }

    @AfterEach
    void cleanUp(){
        repository.deleteAll();
    }

    @Test
    @DisplayName("Test insertion and retrieval work")
    void givenWaterData_waterDataCanBeRetrieved(){
        WaterData savedWaterData = repository.findById(testedWaterData.getId()).orElse(null);
        assertNotNull(savedWaterData);
        assertEquals(testedWaterData.getTemperature(), savedWaterData.getTemperature());
        assertEquals(testedWaterData.getpH(), savedWaterData.getpH());
        assertEquals(testedWaterData.getORP(), savedWaterData.getORP());
    }

    @Test
    @DisplayName("Test pagination")
    void givenPagingInformation_correctAmountOfDataIsRetrieved(){
        WaterData extraWaterData = new WaterData();
        extraWaterData.setpH(new BigDecimal("5.3"));
        extraWaterData.setORP(new BigDecimal("2.6"));
        extraWaterData.setTemperature(new BigDecimal("35.9"));
        repository.save(extraWaterData);

        Page<WaterData> page1 = repository.findAll(PageRequest.of(0, 1));
        Page<WaterData> page2 = repository.findAll(PageRequest.of(1, 1));

        assertNotNull(page1);
        assertNotNull(page2);
        assertEquals(page1.getNumberOfElements(), page2.getNumberOfElements());
        assertNotEquals(page1.iterator().next(), page2.iterator().next());
        assertEquals(page1.getTotalElements(), page2.getTotalElements());
    }


}
