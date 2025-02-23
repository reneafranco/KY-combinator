package com.x10dev.demo;

import com.x10dev.demo.entity.Restaurant;
import com.x10dev.demo.repositories.RestaurantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.util.List;

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
			restaurantRepository.deleteAll();
			restaurantRepository.flush();
			if (restaurantRepository.count() == 0) {
					List<Restaurant> restaurants = List.of(
							new Restaurant("J. Graham's Cafe", "335 W Broadway, Louisville, KY 40202", 4.5, "relaxing"),
							new Restaurant("Hell Or High Water", "112 W Washington St, Louisville, KY 40202", 4.5, "quiet"),
							new Restaurant("Jeff Ruby's Steakhouse, Louisville", "325 W Main St, Louisville, KY 40202", 4.5, "upscale"),
							new Restaurant("Repeal Oak Fired Steakhouse", "101 W Main St, Louisville, KY 40202", 4.5, "upscale"),
							new Restaurant("Brendon's Catch 23", "505 S 4th St, Louisville, KY 40202", 4.5, "upscale"),
							new Restaurant("The Cafe", "712 Brent St, Louisville, KY 40204", 4.5, "cozy"),
							new Restaurant("Sidebar At Whiskey Row", "129 S 2nd St, Louisville, KY 40202", 4.5, "lively"),
							new Restaurant("Mussel & Burger Bar", "9200 Taylorsville Rd, Louisville, KY 40299", 4.5, "casual"),
							new Restaurant("Brazeiros Churrascaria - Brazilian Steakhouse", "450 S 4th St, Louisville, KY 40202", 4.5, "upscale"),
							new Restaurant("Wild Eggs", "121 S Floyd St, Louisville, KY 40202", 4.5, "family-friendly"),
							new Restaurant("Varanese", "2106 Frankfort Ave, Louisville, KY 40206", 4.5, "romantic"),
							new Restaurant("Proof on Main", "702 W Main St, Louisville, KY 40202", 4.5, "artistic"),
							new Restaurant("Pat's Steakhouse", "2437 Brownsboro Rd, Louisville, KY 40206", 4.5, "traditional"),
							new Restaurant("Merle's Whiskey Kitchen", "122 W Main St, Louisville, KY 40202", 4.5, "rustic"),
							new Restaurant("The Eagle", "1314 Bardstown Rd, Louisville, KY 40204", 4.5, "lively"),
							new Restaurant("Meesh Meesh", "1001 Logan St, Louisville, KY 40204", 4.5, "intimate"),
							new Restaurant("Lou Lou on Market", "812 E Market St, Louisville, KY 40206", 4.5, "vibrant"),
							new Restaurant("8Up Elevated Drinkery & Kitchen", "350 W Chestnut St, Louisville, KY 40202", 4.5, "trendy"),
							new Restaurant("Porch Kitchen & Bar", "280 W Jefferson St, Louisville, KY 40202", 4.5, "welcoming"),
							new Restaurant("Jack Fry's", "1007 Bardstown Rd, Louisville, KY 40204", 4.5, "historic"),
							new Restaurant("Ramsi's Cafe On The World", "1293 Bardstown Rd, Louisville, KY 40204", 4.5, "eclectic"),
							new Restaurant("Volare Ristorante", "2300 Frankfort Ave, Louisville, KY 40206", 4.5, "elegant"),
							new Restaurant("Walker's Exchange", "140 N 4th St, Louisville, KY 40202", 4.5, "classic"),
							new Restaurant("English Grill", "335 W Broadway, Louisville, KY 40202", 4.5, "sophisticated"),
							new Restaurant("Buck's Restaurant & Bar", "425 W Ormsby Ave, Louisville, KY 40203", 4.5, "romantic")
					);
					restaurantRepository.saveAll(restaurants);
					System.out.println("Restaurants created successfully!");
				} else {
					System.out.println("Database already contains restaurants!");
				}
			};
	}
}
