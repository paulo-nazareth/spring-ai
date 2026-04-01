package com.spring_ai.memory;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.spring_ai.chat.ChatMessage;

@RestController
@RequestMapping("/api/chat-memory")
public class MemoryChatController {

	private final MemoryChatService memoryChatService;

	public MemoryChatController(MemoryChatService memoryChatService) {
		this.memoryChatService = memoryChatService;
	}

	@PostMapping
	ChatMessage simpleChat(@RequestBody ChatMessage message) {
        var request = memoryChatService.simpleChat(message.message());
        return new ChatMessage(request);
    }
	
}
