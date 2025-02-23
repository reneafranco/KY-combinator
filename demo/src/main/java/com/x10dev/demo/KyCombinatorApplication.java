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
			if (restaurantRepository.count() == 0) {

				Restaurant restaurant1 = new Restaurant();
				restaurant1.setName("Pizzeria Bella");
				restaurant1.setAddress("123 Pizza St, Italy");
				restaurant1.setRating(4.5);
				restaurant1.setMoodTags("romantic cozy");
				restaurantRepository.save(restaurant1);

				Restaurant restaurant2 = new Restaurant();
				restaurant2.setName("Sushi Express");
				restaurant2.setAddress("456 Sushi Ave, Japan");
				restaurant2.setRating(4.8);
				restaurant2.setMoodTags("modern quiet");
				restaurantRepository.save(restaurant2);

				Restaurant restaurant3 = new Restaurant();
				restaurant3.setName("Taco Haven");
				restaurant3.setAddress("789 Taco Rd, Mexico");
				restaurant3.setRating(4.2);
				restaurant3.setMoodTags("lively casual");
				restaurantRepository.save(restaurant3);

				Restaurant restaurant4 = new Restaurant();
				restaurant4.setName("Steakhouse Supreme");
				restaurant4.setAddress("321 Meat Blvd, USA");
				restaurant4.setRating(4.7);
				restaurant4.setMoodTags("luxurious elegant");
				restaurantRepository.save(restaurant4);

				Restaurant restaurant5 = new Restaurant();
				restaurant5.setName("Cafe Aromas");
				restaurant5.setAddress("654 Coffee St, France");
				restaurant5.setRating(4.3);
				restaurant5.setMoodTags("chill cozy");
				restaurantRepository.save(restaurant5);

				Restaurant restaurant6 = new Restaurant();
				restaurant6.setName("Fusion Bistro");
				restaurant6.setAddress("987 Fusion Ave, Singapore");
				restaurant6.setRating(4.6);
				restaurant6.setMoodTags("trendy vibrant");
				restaurantRepository.save(restaurant6);

				Restaurant restaurant7 = new Restaurant();
				restaurant7.setName("Vegan Delights");
				restaurant7.setAddress("234 Green Way, USA");
				restaurant7.setRating(4.4);
				restaurant7.setMoodTags("healthy peaceful");
				restaurantRepository.save(restaurant7);

				Restaurant restaurant8 = new Restaurant();
				restaurant8.setName("The Gourmet Grill");
				restaurant8.setAddress("123 Grill Ln, Australia");
				restaurant8.setRating(4.9);
				restaurant8.setMoodTags("elegant romantic");
				restaurantRepository.save(restaurant8);

				Restaurant restaurant9 = new Restaurant();
				restaurant9.setName("Bistro Bella");
				restaurant9.setAddress("456 Bistro St, Italy");
				restaurant9.setRating(4.6);
				restaurant9.setMoodTags("charming intimate");
				restaurantRepository.save(restaurant9);

				Restaurant restaurant10 = new Restaurant();
				restaurant10.setName("Seafood Palace");
				restaurant10.setAddress("567 Ocean Rd, USA");
				restaurant10.setRating(4.8);
				restaurant10.setMoodTags("fresh vibrant");
				restaurantRepository.save(restaurant10);

				System.out.println("Restaurants created successfully!");
			} else {
				System.out.println("Database already contains restaurants!");
			}
		};
	}
}
