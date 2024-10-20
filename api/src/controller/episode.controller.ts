import {
  Body,
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { RegisterEpisodeDTO } from 'src/dto/register-episode.dto';
import { EpisodeService } from 'src/services/episode.service';
import { Auth } from 'src/decorators/auth.decorator';
import { Role } from 'src/entities/user.entity';
import { UploadService } from 'src/services/upload.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('episode')
export class EpisodeController {
  constructor(
    private readonly epService: EpisodeService,
    private readonly uploadService: UploadService,
  ) {}

  @Auth(Role.ADMIN)
  @UseInterceptors(FileInterceptor('file'))
  @Post()
  async create(
    @Body() ep: RegisterEpisodeDTO,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const data = await this.epService.create(ep);
    return await this.uploadService.uploadFile(file, data.id);
  }

  @Get()
  async findAll() {
    return this.epService.findAll();
  }
}
