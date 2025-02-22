package com.x10dev.demo.entity;

public class Restaurant {

    private String name;
    private String address;
    private double rating;

    // Constructor
    public Restaurant(String name, String address, double rating) {
        this.name = name;
        this.address = address;
        this.rating = rating;
    }

    // Getters y Setters
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public double getRating() {
        return rating;
    }

    public void setRating(double rating) {
        this.rating = rating;
    }

    @Override
    public String toString() {
        return "Restaurant [name=" + name + ", address=" + address + ", rating=" + rating + "]";
    }
}

