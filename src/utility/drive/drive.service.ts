// google.drive.service.ts
import { Injectable } from '@nestjs/common';
import { google, drive_v3 } from 'googleapis';
import { OAuth2Client } from 'google-auth-library';
import { ConfigService } from '@nestjs/config';
import * as fs from 'fs';
import { Readable } from 'stream';

@Injectable()
export class DriveService {
  private oauth2Client: OAuth2Client;
  private drive: drive_v3.Drive;

  constructor(private configService: ConfigService) {
    this.oauth2Client = new google.auth.OAuth2(
      this.configService.get('GOOGLE_CLIENT_ID'),
      this.configService.get('GOOGLE_CLIENT_SECRET'),
      this.configService.get('GOOGLE_REDIRECT_URI'),
    );

    this.oauth2Client.setCredentials({
      refresh_token: this.configService.get('GOOGLE_REFRESH_TOKEN'),
    });

    this.drive = google.drive({ version: 'v3', auth: this.oauth2Client });
  }

  // Upload a file to Google Drive
  async uploadFile(file: Express.Multer.File) {
    const fileBuffer = Buffer.from(file.buffer);
    const fileMetadata = {
      name: file.originalname,
      mimeType: file.mimetype,
    };

    const media = {
      body: Readable.from([fileBuffer]),
      mimeType: file.mimetype,
    };

    const response = await this.drive.files.create({
      requestBody: fileMetadata,
      media: media,
      fields: 'id, webViewLink, webContentLink',
    });

    return response.data;
  }

  /*
 //  Download a file from Google Drive
  async downloadFile(fileId: string, destinationPath: string) {
    const dest = fs.createWriteStream(destinationPath);
    const response = await this.drive.files.get(
      { fileId, alt: 'media' },
      { responseType: 'stream' },
    );

    await new Promise((resolve, reject) => {
      response.data
        .on('end', () => resolve(true))
        .on('error', (err) => reject(err))
        .pipe(dest);
    });
  }*/
}
