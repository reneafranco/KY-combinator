package com.x10dev.demo.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "restaurants")
@Getter
@Setter
@ToString
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
public class Restaurant {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String address;

    @Column(nullable = false)
    private double rating;

    @Column(nullable = false)
    private String moodTags;

    public Restaurant(String s, String s1, double v, String relaxing) {
        this.name = s;
        this.address = s1;
        this.rating = v;
        this.moodTags = relaxing;
    }
}

