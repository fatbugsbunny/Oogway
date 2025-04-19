package com.example.demo;

import jakarta.persistence.*;

import java.math.BigDecimal;
import java.util.Objects;

@Entity
public class WaterData {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column
    private BigDecimal temperature;
    @Column
    private BigDecimal pH;
    @Column
    private BigDecimal saltLevel;

    public BigDecimal getpH() {
        return pH;
    }

    public void setpH(BigDecimal pH) {
        this.pH = pH;
    }

    public BigDecimal getSaltLevel() {
        return saltLevel;
    }

    public void setSaltLevel(BigDecimal saltLevels) {
        this.saltLevel = saltLevels;
    }

    public BigDecimal getTemperature() {
        return temperature;
    }

    public void setTemperature(BigDecimal temperature) {
        this.temperature = temperature;
    }

    public Long getId() {
        return id;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof WaterData waterData)) return false;
        return Objects.equals(id, waterData.id) && Objects.equals(temperature, waterData.temperature) && Objects.equals(pH, waterData.pH) && Objects.equals(saltLevel, waterData.saltLevel);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, temperature, pH, saltLevel);
    }

    public void setId(Long id) {
        this.id = id;
    }
}
