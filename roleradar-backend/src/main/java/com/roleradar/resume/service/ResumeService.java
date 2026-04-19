package com.roleradar.resume.service;

import com.roleradar.auth.model.User;
import com.roleradar.core.ai.ResumeParserService;
import com.roleradar.core.storage.MinioService;
import com.roleradar.resume.model.Resume;
import com.roleradar.resume.repository.ResumeRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class ResumeService {

    private final ResumeRepository resumeRepository;
    private final MinioService minioService;
    private final ResumeParserService resumeParserService;

    @Transactional
    public Resume uploadAndParseResume(User user, MultipartFile file) {
        log.info("User {} uploading resume {}", user.getId(), file.getOriginalFilename());

        // 1. Upload file to MinIO
        String fileUrl = minioService.uploadFile(file, user.getId().toString());

        // 2. Parse resume using Tika + OpenAI
        Map<String, Object> parsedData = resumeParserService.parseResume(file);

        // 3. Save to database
        boolean isFirstResume = resumeRepository.findByUserIdOrderByCreatedAtDesc(user.getId()).isEmpty();

        Resume resume = Resume.builder()
                .user(user)
                .title(file.getOriginalFilename())
                .fileUrl(fileUrl)
                .fileType(file.getContentType())
                .parsedData(parsedData)
                .isPrimary(isFirstResume)
                .build();

        return resumeRepository.save(resume);
    }

    public List<Resume> getUserResumes(UUID userId) {
        return resumeRepository.findByUserIdOrderByCreatedAtDesc(userId);
    }

    @Transactional
    public void deleteResume(UUID id, UUID userId) {
        Resume resume = resumeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Resume not found"));

        if (!resume.getUser().getId().equals(userId)) {
            throw new RuntimeException("Unauthorized to delete this resume");
        }

        resumeRepository.delete(resume);
    }
}
