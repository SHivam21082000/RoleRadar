package com.roleradar.core.ai;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.tika.Tika;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.InputStream;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Slf4j
public class ResumeParserService {

    @Value("${app.openai.api-key}")
    private String openAiApiKey;

    @Value("${app.openai.model}")
    private String model;

    @Value("${app.openai.base-url}")
    private String baseUrl;

    private final ObjectMapper objectMapper;
    private final Tika tika = new Tika();

    public Map<String, Object> parseResume(MultipartFile file) {
        try {
            // Step 1: Extract text using Apache Tika
            String rawText = extractText(file.getInputStream());
            log.info("Extracted {} characters from resume using Tika", rawText.length());

            // Step 2: Use OpenAI to structure the data, or fallback to mock
            if (openAiApiKey == null || openAiApiKey.trim().isEmpty()) {
                log.warn("OpenAI API key is missing. Using MOCK parsing data for development.");
                return getMockParsedData();
            }

            return extractStructuredDataWithLLM(rawText);

        } catch (Exception e) {
            log.error("Error parsing resume", e);
            throw new RuntimeException("Failed to parse resume file", e);
        }
    }

    private String extractText(InputStream stream) throws Exception {
        return tika.parseToString(stream);
    }

    @SuppressWarnings("unchecked")
    private Map<String, Object> extractStructuredDataWithLLM(String text) throws Exception {
        String systemPrompt = """
            You are an expert technical recruiter and resume parser. 
            Extract the following information from the provided resume text and format it STRICTLY as JSON.
            Required JSON structure:
            {
                "personal_info": {
                    "name": "string",
                    "email": "string",
                    "phone": "string",
                    "location": "string",
                    "linkedin_url": "string"
                },
                "skills": ["skill1", "skill2"],
                "experience": [
                    {
                        "company": "string",
                        "role": "string",
                        "start_date": "string (YYYY-MM)",
                        "end_date": "string (YYYY-MM or Present)",
                        "description": "string (summarized bullet points)",
                        "technologies_used": ["tech1", "tech2"]
                    }
                ],
                "education": [
                    {
                        "institution": "string",
                        "degree": "string",
                        "year": "string"
                    }
                ],
                "feedback": {
                    "ats_score": 85,
                    "strong_points": ["strong point 1", "strong point 2"],
                    "points_to_improve": ["area for improvement 1", "area for improvement 2"],
                    "ats_improvement_tips": ["Use more action verbs", "Include specific keywords from job descriptions"]
                }
            }
            ONLY return the JSON object, without any markdown formatting like ```json.
            """;

        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("model", model);
        
        // Setup messages
        requestBody.put("messages", new Object[]{
                Map.of("role", "system", "content", systemPrompt),
                Map.of("role", "user", "content", "Parse this resume: \\n\\n" + text)
        });
        requestBody.put("temperature", 0.1); // Low temp for more deterministic JSON

        String jsonBody = objectMapper.writeValueAsString(requestBody);

        HttpClient client = HttpClient.newHttpClient();
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(baseUrl + "/chat/completions"))
                .header("Authorization", "Bearer " + openAiApiKey)
                .header("Content-Type", "application/json")
                .POST(HttpRequest.BodyPublishers.ofString(jsonBody))
                .build();

        HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());

        if (response.statusCode() != 200) {
            log.error("OpenAI API returned status {}: {}", response.statusCode(), response.body());
            throw new RuntimeException("OpenAI API call failed");
        }

        JsonNode root = objectMapper.readTree(response.body());
        String content = root.path("choices").get(0).path("message").path("content").asText();
        
        // Clean markdown backticks if OpenAI still includes them
        content = content.trim();
        if (content.startsWith("```json")) {
            content = content.substring(7);
        }
        if (content.startsWith("```")) {
            content = content.substring(3);
        }
        if (content.endsWith("```")) {
            content = content.substring(0, content.length() - 3);
        }

        // 1. Configure the ObjectMapper to be lenient with control characters (like raw newlines)
        // This is much more reliable than manual regex sanitization
        ObjectMapper lenientMapper = objectMapper.copy()
                .enable(com.fasterxml.jackson.core.json.JsonReadFeature.ALLOW_UNESCAPED_CONTROL_CHARS.mappedFeature());

        // 2. Clean the content of any non-JSON noise (like text before or after the JSON block)
        String cleanedContent = content.trim();
        if (cleanedContent.contains("{") && cleanedContent.contains("}")) {
            int firstBrace = cleanedContent.indexOf("{");
            int lastBrace = cleanedContent.lastIndexOf("}");
            cleanedContent = cleanedContent.substring(firstBrace, lastBrace + 1);
        }
        
        // Return as Map
        try {
            return lenientMapper.readValue(cleanedContent, Map.class);
        } catch (Exception e) {
            log.warn("Lenient JSON parsing failed. Attempting extreme sanitization. Error: {}", e.getMessage());
            // Extreme fallback: strip all unescaped control characters except newlines (which we'll escape)
            String extremeSanitized = cleanedContent.replaceAll("[\\x00-\\x09\\x0B-\\x1F]", " ");
            return lenientMapper.readValue(extremeSanitized, Map.class);
        }
    }

    private Map<String, Object> getMockParsedData() {
        Map<String, Object> mockData = new HashMap<>();
        
        mockData.put("personal_info", Map.of(
                "name", "Alex Developer",
                "email", "alex@example.com",
                "phone", "+1 234 567 8900",
                "location", "San Francisco, CA",
                "linkedin_url", "linkedin.com/in/alexdev"
        ));
        
        mockData.put("skills", new String[]{"Java", "Spring Boot", "React", "Docker", "PostgreSQL", "AWS"});
        
        mockData.put("experience", new Object[]{
                Map.of(
                        "company", "Tech Innovations Inc",
                        "role", "Senior Software Engineer",
                        "start_date", "2021-05",
                        "end_date", "Present",
                        "description", "Led the migration of legacy monolith to Spring Boot microservices. Improved API performance by 40%.",
                        "technologies_used", new String[]{"Java", "Spring Boot", "Redis"}
                ),
                Map.of(
                        "company", "Web Solutions Co",
                        "role", "Full Stack Developer",
                        "start_date", "2018-08",
                        "end_date", "2021-04",
                        "description", "Developed responsive front-end interfaces using React and Redux.",
                        "technologies_used", new String[]{"React", "JavaScript", "Node.js"}
                )
        });
        
        mockData.put("education", new Object[]{
                Map.of(
                        "institution", "University of California",
                        "degree", "B.S. Computer Science",
                        "year", "2018"
                )
        });
        
        mockData.put("feedback", Map.of(
                "ats_score", 78,
                "strong_points", new String[]{"Excellent progression of responsibility", "Strong emphasis on quantifiable achievements", "Relevant modern tech stack"},
                "points_to_improve", new String[]{"Consider adding more soft skills", "Education section could include GPA if above 3.5"},
                "ats_improvement_tips", new String[]{"Include more industry-standard keywords like 'Microservices' and 'Docker'", "Avoid using tables or complex formatting in your original PDF", "Quantify more achievements with exact percentages"}
        ));
        
        return mockData;
    }
}
