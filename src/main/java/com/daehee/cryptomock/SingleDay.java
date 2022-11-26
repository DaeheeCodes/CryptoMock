package com.daehee.cryptomock;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)

public class SingleDay {

    private String symbol;
    private Double priceChangePercent;
    private Double lastPrice;
    private Double volume;

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