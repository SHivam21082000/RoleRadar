package com.roleradar.resume.dto;

import com.roleradar.resume.model.Resume;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.Map;
import java.util.UUID;

@Data
@Builder
public class ResumeDto {
    private UUID id;
    private String title;
    private String fileUrl;
    private String fileType;
    private Map<String, Object> parsedData;
    private boolean isPrimary;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public static ResumeDto fromEntity(Resume resume) {
        return ResumeDto.builder()
                .id(resume.getId())
                .title(resume.getTitle())
                .fileUrl(resume.getFileUrl())
                .fileType(resume.getFileType())
                .parsedData(resume.getParsedData())
                .isPrimary(resume.isPrimary())
                .createdAt(resume.getCreatedAt())
                .updatedAt(resume.getUpdatedAt())
                .build();
    }
}
