export interface CloudinaryUploadSignature {
  signature: string;
  timestamp: number;
  apiKey: string;
  cloudName: string;
}

export interface CloudinaryUploadResult {
  secure_url: string;
}
