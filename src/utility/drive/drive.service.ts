// google.drive.service.ts
import { Injectable } from '@nestjs/common';
import { google, drive_v3 } from 'googleapis';
import { OAuth2Client } from 'google-auth-library';
import { ConfigService } from '@nestjs/config';
import * as fs from 'fs';
import { Readable } from 'stream';
import { file } from 'googleapis/build/src/apis/file';

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
    try {
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

      await this.makeFilePublic(response.data.id);

      return {
        id: response.data.id,
        link: await this.generatePublicUrl(response.data.id),
      };
    } catch (error) {
      console.log(error.message);
    }
  }

  async deleteFile(fileId: string) {
    try {
      const response = await this.drive.files.delete({
        fileId: fileId,
      });
      return {
        message: 'File Deleted Successfully!',
      };
    } catch (error) {
      console.log(error.message);
    }
  }

  private async makeFilePublic(fileId: string) {
    try {
      return await this.drive.permissions.create({
        fileId,
        requestBody: {
          role: 'reader',
          type: 'anyone',
        },
      });
    } catch (e) {
      console.log(e.message);
    }
  }

  private async generatePublicUrl(fileId: string): Promise<string> {
    return `https://drive.google.com/uc?export=download&id=${fileId}`;
  }

  //  Download a file from Google Drive
  async downloadFile(fileId: string) {
    return await this.generatePublicUrl(fileId);
  }
}
