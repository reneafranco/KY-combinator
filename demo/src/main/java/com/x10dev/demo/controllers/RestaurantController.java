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

    @GetMapping("/restaurants/generate")
    public List<Restaurant> generate(@RequestParam(value = "userInput", defaultValue = "romantic") String msg) {

        String message = "recommend me restaurants in louisville KY base on this mood {msg}";

        PromptTemplate promptTemplate = new PromptTemplate(message);

        Prompt prompt = promptTemplate.create(Map.of("msg", msg));

        System.out.println(prompt.toString());

        return this.chatClient.prompt().user(prompt.getContents()).call()
                .entity(new ParameterizedTypeReference<List<Restaurant>>() {
                });
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
