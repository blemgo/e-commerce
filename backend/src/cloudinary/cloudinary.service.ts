import { Injectable } from '@nestjs/common';
import cloudinary from 'cloudinary';
import { env } from 'src/config/env';
import type { ProductImageUploadSignatureDto } from './dto/product-image-upload-signature.dto';
import 'src/cloudinary/cloudinary.config';

@Injectable()
export class CloudinaryService {
  getProductImageUploadSignature(): ProductImageUploadSignatureDto {
    const timestamp = Math.round(Date.now() / 1000);
    const paramsToSign = { timestamp };

    const signature = cloudinary.v2.utils.api_sign_request(
      paramsToSign,
      env.CLOUDINARY_API_SECRET,
    );

    return {
      signature,
      timestamp,
      apiKey: env.CLOUDINARY_API_KEY,
      cloudName: env.CLOUDINARY_CLOUD_NAME,
    };
  }
}
