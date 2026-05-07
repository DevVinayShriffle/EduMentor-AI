class CloudinaryService
  def self.upload(file, folder: "edumentor")
    result = Cloudinary::Uploader.upload(file.path, {
        folder: folder,
        resource_type: :auto
      })
      
      {
      url: result["secure_url"],
      public_id: result["public_id"],
      resource_type: result["resource_type"]
    }
  end
end