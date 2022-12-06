package com.daehee.cryptomock.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

@JsonIgnoreProperties(ignoreUnknown = true)

@Entity
public class SingleDay {

    private @Id @GeneratedValue Long id;
    private String symbol;
    private Double priceChangePercent;
    private Double lastPrice;
    private Double volume;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getSymbol() {
        return symbol;
    }

    public void setSymbol(String symbol) {
        this.symbol = symbol;
    }

    public Double getPriceChangePercent() {
        return priceChangePercent;
    }

    public void setPriceChangePercent(Double priceChangePercent) {
        this.priceChangePercent = priceChangePercent;
    }

    public Double getLastPrice() {
        return lastPrice;
    }

    public void setLastPrice(Double lastPrice) {
        this.lastPrice = lastPrice;
    }

    public Double getVolume() {
        return volume;
    }

    public void volume(Double volume) {
        this.volume = volume;
    }

    @Override
    public String toString() {
        return "Customer{" +
                "symbol=" + symbol +
                ", priceChangePercent='" + priceChangePercent + '\'' +
                ", lastPrice='" + lastPrice + '\'' +
                ", volume='" + volume + '\'' +
                '}';
    }
}