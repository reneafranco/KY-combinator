package com.x10dev.demo.controllers;

import com.x10dev.demo.entity.Restaurant;
import com.x10dev.demo.service.RestaurantService;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.chat.prompt.Prompt;
import org.springframework.ai.chat.prompt.PromptTemplate;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/restaurants")
public class RestaurantController {

    private final ChatClient chatClient;

    private final RestaurantService restaurantService;


    public RestaurantController(ChatClient.Builder chatClient, RestaurantService restaurantService) {
        this.chatClient = chatClient.build();
        this.restaurantService = restaurantService;
    }

    @GetMapping("/restaurant")
    public List<Restaurant> generate() {
        String msg = "recommend me resturants in louisville KY";

        return this.chatClient.prompt().user(msg).call().entity(new ParameterizedTypeReference<List<Restaurant>>() {
        });
    }

    @GetMapping("/generate")
    public List<Restaurant> generate(@RequestParam(value = "userInput", defaultValue = "romantic") String msg) {

        List<Restaurant> restaurants = restaurantService.getAllRestaurants();

        StringBuilder restaurantData = new StringBuilder();
        for (Restaurant restaurant : restaurants) {
            restaurantData.append("Restaurant: ")
                    .append(restaurant.getName())
                    .append(", Address: ")
                    .append(restaurant.getAddress())
                    .append(", Rating: ")
                    .append(restaurant.getRating())
                    .append(", MoodTags: ")
                    .append(restaurant.getMoodTags())
                    .append("\n");
        }

        String systemMessage = "You are a restaurant recommendation system. Your task is to recommend restaurants based on a given mood.";

        String message = "Here are some restaurants I found based on the mood '" + msg + "':\n" + restaurantData.toString() +
                "\nPlease choose the best options based on the mood and recommend them.";



        PromptTemplate promptTemplate = new PromptTemplate(systemMessage + "\n" + message);

        Prompt prompt = promptTemplate.create(Map.of("msg", msg));

        System.out.println(prompt.toString());

        return this.chatClient.prompt().user(prompt.getContents()).call()
                .entity(new ParameterizedTypeReference<List<Restaurant>>() {
                });
    }

    @GetMapping("/generate/random")
    public Restaurant generateRandom() {

        List<Restaurant> restaurants = restaurantService.getAllRestaurants();

        StringBuilder restaurantData = new StringBuilder();
        for (Restaurant restaurant : restaurants) {
            restaurantData.append("Restaurant: ")
                    .append(restaurant.getName())
                    .append(", Address: ")
                    .append(restaurant.getAddress())
                    .append(", Rating: ")
                    .append(restaurant.getRating())
                    .append(", MoodTags: ")
                    .append(restaurant.getMoodTags())
                    .append("\n");
        }

        String systemMessage = "You are a restaurant recommendation system. Your task is to recommend restaurants based on a given mood.";

        String message = "Here are some restaurants . Give only one restaurnat random" + restaurantData.toString() +
                "\nPlease choose only one.";



        PromptTemplate promptTemplate = new PromptTemplate(systemMessage + "\n" + message);

        Prompt prompt = promptTemplate.create();

        System.out.println(prompt.toString());

        return this.chatClient.prompt().user(prompt.getContents()).call()
                .entity(Restaurant.class);
    }


    @GetMapping
    public List<Restaurant> getAllRestaurants() {
        return restaurantService.getAllRestaurants();
    }


    @DeleteMapping("/{id}")
    public void deleteRestaurant(@PathVariable Long id) {
        restaurantService.deleteRestaurant(id);
    }

}
