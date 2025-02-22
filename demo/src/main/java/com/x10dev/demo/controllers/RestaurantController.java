package com.x10dev.demo.controllers;

import com.x10dev.demo.entity.Restaurant;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.chat.prompt.Prompt;
import org.springframework.ai.chat.prompt.PromptTemplate;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
public class RestaurantController {

    private final ChatClient chatClient;


    public RestaurantController(ChatClient.Builder chatClient) {
        this.chatClient = chatClient.build();
    }

    @GetMapping("/restaurants")
    public List<Restaurant> generate() {
        String msg = "recommend me resturants in louisville KY";

//        PromptTemplate promptTemplate = new PromptTemplate(msg);
//        Prompt prompt = promptTemplate.create(Map.of("message", msg));

        return this.chatClient.prompt().user(msg).call().entity(new ParameterizedTypeReference<List<Restaurant>>() {});

    }




}
