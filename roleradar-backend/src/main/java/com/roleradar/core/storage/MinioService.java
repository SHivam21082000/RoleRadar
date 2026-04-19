package com.roleradar.core.storage;

import io.minio.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import jakarta.annotation.PostConstruct;
import java.io.InputStream;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class MinioService {

    private final MinioClient minioClient;

    @Value("${app.minio.bucket-name}")
    private String bucketName;
    
    @Value("${app.minio.endpoint}")
    private String endpoint;

    @PostConstruct
    public void init() {
        try {
            boolean found = minioClient.bucketExists(BucketExistsArgs.builder().bucket(bucketName).build());
            if (!found) {
                minioClient.makeBucket(MakeBucketArgs.builder().bucket(bucketName).build());
                // Set bucket policy to public read
                String policy = """
                        {
                          "Statement": [
                            {
                              "Action": ["s3:GetObject"],
                              "Effect": "Allow",
                              "Principal": "*",
                              "Resource": ["arn:aws:s3:::%s/*"]
                            }
                          ],
                          "Version": "2012-10-17"
                        }
                        """.formatted(bucketName);
                minioClient.setBucketPolicy(
                    SetBucketPolicyArgs.builder().bucket(bucketName).config(policy).build());
                log.info("Created MinIO bucket: {}", bucketName);
            } else {
                log.info("MinIO bucket '{}' already exists.", bucketName);
            }
        } catch (Exception e) {
            log.error("Error initializing MinIO bucket", e);
        }
    }

    public String uploadFile(MultipartFile file, String userId) {
        try {
            String extension = getFileExtension(file.getOriginalFilename());
            String fileName = "resumes/" + userId + "/" + UUID.randomUUID() + extension;

            InputStream is = file.getInputStream();
            minioClient.putObject(
                    PutObjectArgs.builder()
                            .bucket(bucketName)
                            .object(fileName)
                            .stream(is, file.getSize(), -1)
                            .contentType(file.getContentType())
                            .build()
            );

            // Construct public URL
            String publicEndpoint = endpoint.endsWith("/") ? endpoint : endpoint + "/";
            return publicEndpoint + bucketName + "/" + fileName;
        } catch (Exception e) {
            log.error("Failed to upload file to MinIO", e);
            throw new RuntimeException("Could not upload file. " + e.getMessage(), e);
        }
    }

    private String getFileExtension(String fileName) {
        if (fileName != null && fileName.lastIndexOf(".") > 0) {
            return fileName.substring(fileName.lastIndexOf("."));
        }
        return "";
    }
}
