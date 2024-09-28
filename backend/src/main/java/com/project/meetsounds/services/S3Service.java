package com.project.meetsounds.services;

import org.springframework.stereotype.Service;
/*
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.PutObjectRequest;
 */

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.multipart.MultipartFile;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;

@Service
public class S3Service {

    private  static  final Logger LOGGER = LoggerFactory.getLogger(S3Service.class);

    @Autowired
    //private AmazonS3 amazonS3;

    @Value("${aws.s3.bucket}")
    private String bucketName;

    public String uploadFile(MultipartFile file) {
        /*
        String UrlFile = null;
        File mainFile = new File(file.getOriginalFilename());
        try (FileOutputStream stream = new FileOutputStream(mainFile)){
            stream.write(file.getBytes());
            String newFileName = System.currentTimeMillis() + "_" + mainFile.getName();
            LOGGER.info("Subiendo el archivo con el nombre: " + newFileName);
            PutObjectRequest request = new PutObjectRequest(bucketName, newFileName, mainFile);
            amazonS3.putObject(request);
            amazonS3.setObjectAcl(bucketName, newFileName, CannedAccessControlList.PublicRead);
            UrlFile = amazonS3.getUrl(bucketName, newFileName).toString();
            System.out.println(UrlFile);
        }catch (IOException e){
            LOGGER.error(e.getMessage(), e);
        }

         */
        //return UrlFile;
        return "x";
    }
}
