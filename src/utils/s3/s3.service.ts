import { Injectable, Req, Res } from '@nestjs/common';
import * as AWS from "aws-sdk";

@Injectable()
export class S3Service {
  AWS_S3_BUCKET = process.env.AWS_S3_BUCKET;
  s3 = new AWS.S3({
    accessKeyId: process.env.AWS_S3_ACCESS_KEY,
    secretAccessKey: process.env.AWS_S3_KEY_SECRET,
  });

  async uploadFile(file, fileName) {
    return await this.s3_upload(file, fileName);
  }

  async s3_upload(file: any, fileName:any): Promise<any> {
    const uploadParams = {
      Bucket: this.AWS_S3_BUCKET,
      Key: fileName,
      Body: file.buffer,
      ContentType: 'application/pdf'
    };

    return new Promise((resolve, reject) => {
      this.s3.upload(uploadParams, (err, data) => {
        if (err) {
          reject(err);
        }
        resolve(data);
      });
    });
  }
}
