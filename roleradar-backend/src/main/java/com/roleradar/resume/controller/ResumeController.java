package com.roleradar.resume.controller;

import com.roleradar.auth.model.User;
import com.roleradar.common.dto.ApiResponse;
import com.roleradar.resume.dto.ResumeDto;
import com.roleradar.resume.model.Resume;
import com.roleradar.resume.service.ResumeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/v1/resumes")
@RequiredArgsConstructor
public class ResumeController {

    private final ResumeService resumeService;

    @PostMapping("/upload")
    public ResponseEntity<ApiResponse<ResumeDto>> uploadResume(
            @AuthenticationPrincipal User user,
            @RequestParam("file") MultipartFile file) {

        if (file.isEmpty()) {
            throw new IllegalArgumentException("File cannot be empty");
        }

        Resume resume = resumeService.uploadAndParseResume(user, file);
        return ResponseEntity
                .ok(ApiResponse.success("Resume uploaded and parsed successfully", ResumeDto.fromEntity(resume)));
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<ResumeDto>>> getUserResumes(
            @AuthenticationPrincipal User user) {

        List<ResumeDto> resumes = resumeService.getUserResumes(user.getId())
                .stream()
                .map(ResumeDto::fromEntity)
                .collect(Collectors.toList());

        return ResponseEntity.ok(ApiResponse.success("Resumes fetched successfully", resumes));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteResume(
            @AuthenticationPrincipal User user,
            @PathVariable UUID id) {

        resumeService.deleteResume(id, user.getId());
        return ResponseEntity.ok(ApiResponse.success("Resume deleted successfully", null));
    }
}
