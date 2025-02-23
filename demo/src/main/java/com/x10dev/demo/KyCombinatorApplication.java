package com.x10dev.demo;

import com.x10dev.demo.entity.Restaurant;
import com.x10dev.demo.repositories.RestaurantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class KyCombinatorApplication {

	@Autowired
	private final RestaurantRepository restaurantRepository;

    public KyCombinatorApplication(RestaurantRepository restaurantRepository) {
        this.restaurantRepository = restaurantRepository;
    }

    public static void main(String[] args) {
		SpringApplication.run(KyCombinatorApplication.class, args);
	}

	@Bean
	public CommandLineRunner run() {
		return args -> {

			Restaurant restaurant1 = new Restaurant();
			restaurant1.setName("Pizzeria Bella");
			restaurant1.setAddress("123 Pizza St, Italy");
			restaurant1.setRating(4.5);
			restaurant1.setMoodTags("romantic cozy");

			Restaurant restaurant2 = new Restaurant();
			restaurant2.setName("Sushi Express");
			restaurant2.setAddress("456 Sushi Ave, Japan");
			restaurant2.setRating(4.8);
			restaurant2.setMoodTags("modern quiet");


			restaurantRepository.save(restaurant1);
			restaurantRepository.save(restaurant2);

			System.out.println("Datos iniciales insertados en la base de datos.");
		};
	}
}
