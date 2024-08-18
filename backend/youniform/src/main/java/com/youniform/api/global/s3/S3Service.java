package com.youniform.api.global.s3;

import com.amazonaws.AmazonServiceException;
import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.*;
import com.amazonaws.util.IOUtils;
import com.youniform.api.global.exception.CustomException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.Arrays;
import java.util.List;
import java.util.Objects;

import static com.youniform.api.global.dateformat.DateFormatter.convertToDateFormat;
import static com.youniform.api.global.statuscode.ErrorCode.*;

@Slf4j
@Service
@RequiredArgsConstructor
public class S3Service {
    private final AmazonS3Client amazonS3Client;

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    @Value("${BUCKET_URL}")
    private String bucketURl;

    @Value("${CLOUD_FRONT}")
    private String cloudFrontUrl;

    // MultipartFile을 전달받아 File로 전환한 후 S3에 업로드
    public String upload(MultipartFile multipartFile, String dirName) throws IOException {
        if(multipartFile.isEmpty() || Objects.isNull(multipartFile.getOriginalFilename())) {
            throw new CustomException(FILE_UPLOAD_FAIL);
        }

        return uploadS3(multipartFile, dirName);
    }

    public String uploadJson(String jsonContent, String dirName, String fileName) {
        if (jsonContent == null || jsonContent.isEmpty()) {
            throw new CustomException(FILE_UPLOAD_FAIL);
        }

        String s3FileName = dirName + "/" + fileName;

        byte[] bytes = jsonContent.getBytes();
        ObjectMetadata objectMetadata = new ObjectMetadata();
        objectMetadata.setContentType("application/json");
        objectMetadata.setContentLength(bytes.length);

        ByteArrayInputStream byteArrayInputStream = new ByteArrayInputStream(bytes);

        try {
            PutObjectRequest putObjectRequest = new PutObjectRequest(bucket, s3FileName, byteArrayInputStream, objectMetadata);
            amazonS3Client.putObject(putObjectRequest);
        } catch (Exception e) {
            throw new CustomException(FILE_UPLOAD_FAIL);
        } finally {
            try {
                byteArrayInputStream.close();
            } catch (IOException e) {
                log.error("Error closing input stream", e);
            }
        }

        return generateCloudFrontUrl(s3FileName);
    }

    private String uploadS3(MultipartFile multipartFile, String dirName) throws IOException {
        validateImageFileExtention(multipartFile.getOriginalFilename());

        String originalFilename = multipartFile.getOriginalFilename(); //원본 파일 명
        String extension = originalFilename.substring(originalFilename.lastIndexOf(".")); //확장자 명

        String s3FileName  = dirName + "/upload_" + convertToDateFormat()+extension;

        InputStream is = multipartFile.getInputStream();

        byte[] bytes = IOUtils.toByteArray(is);

        ObjectMetadata objectMetadata = new ObjectMetadata();
        objectMetadata.setContentType("image/" + extension);
        objectMetadata.setContentLength(bytes.length);

        ByteArrayInputStream byteArrayInputStream = new ByteArrayInputStream(bytes);

        try {
            PutObjectRequest putObjectRequest =
                    new PutObjectRequest(bucket, s3FileName, byteArrayInputStream, objectMetadata);
            amazonS3Client.putObject(putObjectRequest);
        } catch (Exception e) {
            throw new CustomException(FILE_UPLOAD_FAIL);
        } finally {
            byteArrayInputStream.close();
            is.close();
        }

        return generateCloudFrontUrl(s3FileName);
    }

    private String generateCloudFrontUrl(String s3FileName) {
        return cloudFrontUrl + s3FileName;
    }

    public InputStream download(String fileName) throws IOException {
        S3Object s3Object = amazonS3Client.getObject(new GetObjectRequest(bucket, fileName));

        return s3Object.getObjectContent();
    }

    public void fileDelete(String fileUrl) throws CustomException {
        try{
            try {
                String fileKey = fileUrl.replace(cloudFrontUrl, "");
                amazonS3Client.deleteObject(new DeleteObjectRequest(bucket, fileKey));
            } catch (AmazonServiceException e) {
                System.err.println(e.getErrorMessage());
                throw new CustomException(FILE_DELETE_FAIL);
            }
        } catch (Exception exception) {
            throw new CustomException(FILE_DELETE_FAIL);
        }
    }

    private void validateImageFileExtention(String filename) {
        int lastDotIndex = filename.lastIndexOf(".");
        if (lastDotIndex == -1) {
            throw new CustomException(FILE_UPLOAD_FAIL);
        }

        String extention = filename.substring(lastDotIndex + 1).toLowerCase();
        List<String> allowedExtentionList = Arrays.asList("jpg", "jpeg", "png", "gif", "webp", "json", "txt");

        if (!allowedExtentionList.contains(extention)) {
            throw new CustomException(FILE_EXTENSION_FAIL);
        }
    }
}