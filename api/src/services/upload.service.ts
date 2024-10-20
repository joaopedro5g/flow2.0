import {
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
  OnApplicationBootstrap,
} from '@nestjs/common';
import { ClientRMQ } from '@nestjs/microservices';
import { S3 } from 'aws-sdk';
import { InjectAwsService } from 'nest-aws-sdk';

@Injectable()
export class UploadService implements OnApplicationBootstrap {
  private readonly logger: Logger;
  constructor(
    @InjectAwsService(S3)
    private readonly s3: S3,
    @Inject('VIDEO_PROCESSOR')
    private readonly client: ClientRMQ,
  ) {
    this.logger = new Logger(UploadService.name);
  }

  async onApplicationBootstrap() {
    this.logger.log('RMQ CONNECTING...');
    await this.client.connect();
    this.logger.log('RMQ CONNECTED');
  }

  async uploadFile(file: Express.Multer.File, id: string) {
    try {
      const data = await this.s3
        .upload({
          Bucket: 'nixsolucoes',
          Key: `tmp/${id}.${file.originalname.split('.')[1]}`,
          ACL: 'public-read',
          ContentType: file.mimetype,
          Body: file.buffer,
        })
        .promise();
      this.client.emit('episode.upload.create', {
        video: { url: `https://cdn.nixsolucoes.com.br/${data.Key}` },
        id,
      });
      return data;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new InternalServerErrorException({
        message: 'Error on upload to CDN',
      });
    }
  }
}
