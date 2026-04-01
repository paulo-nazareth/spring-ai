package com.spring_ai.memory;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.chat.client.advisor.MessageChatMemoryAdvisor;
import org.springframework.ai.chat.client.advisor.SimpleLoggerAdvisor;
import org.springframework.ai.chat.memory.ChatMemory;
import org.springframework.ai.chat.memory.MessageWindowChatMemory;
import org.springframework.ai.chat.memory.repository.jdbc.JdbcChatMemoryRepository;
import org.springframework.stereotype.Service;

@Service
public class MemoryChatService {

	private final ChatClient chatClient;

	public MemoryChatService (ChatClient.Builder chatClientBuilder
			, JdbcChatMemoryRepository chatMemoryRepository /*Opcional caso queira explicitar*/
	) {
		
		// Otimizando a memoria do Chat
		ChatMemory chatMemory = MessageWindowChatMemory.builder()
									.chatMemoryRepository(chatMemoryRepository) //Opcional
									.maxMessages(10)
									.build();
		
        this.chatClient = chatClientBuilder
        		.defaultAdvisors(
        				MessageChatMemoryAdvisor.builder(chatMemory).build(),
        				new SimpleLoggerAdvisor()
        		)
        		.build();
    }
	
	public String simpleChat(String message) {
        return this.chatClient.prompt()
        	.advisors(a -> a.param( ChatMemory.CONVERSATION_ID, "1243") )
            .user(message)
            .call()
            .content();
    }
	
}
