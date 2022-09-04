import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SupabaseStorageClient } from '@supabase/storage-js';

@Injectable()
export class StorageService {
  private readonly storage: SupabaseStorageClient;

  constructor(private readonly config: ConfigService) {
    const STORAGE_URL = this.config.get('SUPABASE_URL') + '/storage/v1';

    this.storage = new SupabaseStorageClient(STORAGE_URL, {
      apikey: this.config.get('SUPABASE_KEY'),
      Authorization: `Bearer ${this.config.get('SUPABASE_KEY')}`,
    });

    this.createBucket('thumbnails');
    this.createBucket('avatars');
  }

  async createBucket(bucketName: string) {
    const { data: buckets } = await this.storage.listBuckets();

    if (!buckets || buckets.find((bucket) => bucket.name === bucketName)) {
      return;
    }

    const { error } = await this.storage.createBucket(bucketName, {
      public: true,
    });

    if (error) {
      throw error;
    }
  }

  async uploadThumbnail(thumbnail: Express.Multer.File) {
    const [, ext] = thumbnail.mimetype.split('/');

    const { data, error } = await this.storage
      .from('thumbnails')
      .upload(`${Date.now()}.${ext}`, thumbnail.buffer, {
        upsert: false,
      });

    if (error) {
      throw error;
    }

    const publicUrl = `${this.config.get('SUPABASE_URL')}/storage/v1/object/public/${data.Key}`;

    return publicUrl;
  }
}
