package nokia.wroclaw.innovativeproject.chatbot;

import nokia.wroclaw.innovativeproject.chatbot.config.AppProperties;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;


@SpringBootApplication
@EnableConfigurationProperties(AppProperties.class)
public class ChatbotApplication {

	public static void main(String[] args) {
        SpringApplication.run(ChatbotApplication.class, args);
	}

}
