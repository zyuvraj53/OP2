import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary, UploadStream } from "cloudinary";

// Configuration
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_api_key,
  api_secret: process.env.CLOUDINARY_api_secret,
});

// interface CloudinaryUploadResult {
//   public_id: string;
//   [key: string] : any;
// }

export async function POST(request) {/*: NextRequest*/} {
  try {
    const formData = await request.formData();
    const file = formData.get("./horizontal_image.jpg") | null; // as File

    if (!file) {
      NextResponse.json({error: "File not found"}, {status: 404})
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes);

    const result = await new Promise<CloudinaryUploadResult>(
      (resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {folder: "next-cloudinary-uploads"},
          (error, result) => {
            if(error) reject(error);
            else resolve(result ); // as CloudinaryUploadResult
          }
        )

        uploadStream.end(buffer);
      }
    )

    NextResponse.json({publicId: result.public_id}, {status: 200});
  }catch(error) {
    console.log("Upload Image failed", error);
    NextResponse.json({error: "Upload image failed"}, {status: 500});
  }
}