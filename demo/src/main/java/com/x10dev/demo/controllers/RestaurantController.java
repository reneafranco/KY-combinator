package com.x10dev.demo.controllers;

import com.x10dev.demo.entity.Restaurant;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.chat.prompt.Prompt;
import org.springframework.ai.chat.prompt.PromptTemplate;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:3000") // Allow requests from React app
public class RestaurantController {

    private final ChatClient chatClient;

    public RestaurantController(ChatClient.Builder chatClient) {
        this.chatClient = chatClient.build();
    }

    @GetMapping("/restaurants")
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

}
