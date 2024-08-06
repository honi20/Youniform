package com.youniform.api.global.s3;

import com.amazonaws.AmazonServiceException;
import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.DeleteObjectRequest;
import com.amazonaws.services.s3.model.GetObjectRequest;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.amazonaws.services.s3.model.S3Object;
import com.youniform.api.global.exception.CustomException;
import com.youniform.api.global.statuscode.ErrorCode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.Optional;

import static com.youniform.api.global.dateformat.DateFormatter.convertToDateFormat;
import static com.youniform.api.global.statuscode.ErrorCode.FILE_DELETE_FAIL;

@Slf4j
@Service
@RequiredArgsConstructor
public class S3Service {
    private final AmazonS3Client amazonS3Client;

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    // MultipartFile을 전달받아 File로 전환한 후 S3에 업로드
    public String upload(MultipartFile multipartFile, String dirName) throws IOException {
        File uploadFile = convert(multipartFile)
                .orElseThrow(() -> new CustomException(ErrorCode.FILE_CONVERT_FAIL));

        return upload(uploadFile, dirName);
    }

    private String upload(File uploadFile, String dirName) {
        String fileName = dirName + "/" + uploadFile.getName();
        String uploadImageUrl = putS3(uploadFile, fileName);

        removeNewFile(uploadFile); // convert() 과정에서 로컬에 생성된 파일 삭제

        return uploadImageUrl;
    }

    public InputStream download(String fileName) throws IOException {
        S3Object s3Object = amazonS3Client.getObject(new GetObjectRequest(bucket, fileName));

        return s3Object.getObjectContent();
    }

    private String putS3(File uploadFile, String fileName) {
        amazonS3Client.putObject(
                new PutObjectRequest(bucket, fileName, uploadFile) // PublicRead 권한으로 upload
        );

        return amazonS3Client.getUrl(bucket, fileName).toString(); // File의 URL return
    }

    private void removeNewFile(File targetFile) {
        String name = targetFile.getName();

        // convert() 과정에서 로컬에 생성된 파일을 삭제
        if (targetFile.delete()) {
            log.info(name + "파일 삭제 완료");
        } else {
            log.info(name + "파일 삭제 실패");
        }
    }

    public Optional<File> convert(MultipartFile multipartFile) throws IOException {
        // 새로운 파일 이름 생성
        String newFileName = "upload_" + convertToDateFormat();

        // 기존 파일 이름에서 확장자 추출
        String originalFilename = multipartFile.getOriginalFilename();
        String fileExtension = "";
        if (originalFilename != null && originalFilename.contains(".")) {
            fileExtension = originalFilename.substring(originalFilename.lastIndexOf("."));
        }

        // 최종 파일 이름 설정
        newFileName += fileExtension;

        // 저장 경로 설정 (프로젝트 루트 디렉토리)
        File convertFile = new File(newFileName);

        // 파일이 없을 경우 새 파일 생성
        if (convertFile.createNewFile()) {
            try (FileOutputStream fos = new FileOutputStream(convertFile)) {
                // multipartFile의 내용을 바이트로 가져와서 저장
                fos.write(multipartFile.getBytes());
            }
            return Optional.of(convertFile);
        }

        // 새 파일 생성 실패 시 빈 Optional 반환
        return Optional.empty();
    }

    public void fileDelete(String fileUrl) throws CustomException {
        try{
            try {
                String fileKey = fileUrl.replace("https://youniforms3.s3.ap-northeast-2.amazonaws.com/", "");
                amazonS3Client.deleteObject(new DeleteObjectRequest(bucket, fileKey));
            } catch (AmazonServiceException e) {
                System.err.println(e.getErrorMessage());
            }
        } catch (Exception exception) {
            throw new CustomException(FILE_DELETE_FAIL);
        }
    }
}
