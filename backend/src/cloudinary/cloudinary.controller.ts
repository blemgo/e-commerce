import { Controller, Get } from '@nestjs/common';
import { CloudinaryService } from './cloudinary.service';
import type { ProductImageUploadSignatureDto } from './dto/product-image-upload-signature.dto';
import { AdminOnly } from 'src/auth/decorators/admin-only.decorator';

@Controller('cloudinary')
export class CloudinaryController {
  constructor(private readonly cloudinaryService: CloudinaryService) {}

  @AdminOnly()
  @Get('upload-signature')
  getUploadSignature(): ProductImageUploadSignatureDto {
    return this.cloudinaryService.getProductImageUploadSignature();
  }
}
