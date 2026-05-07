class CloudinaryService
  def self.upload(file:, folder:)
    result = Cloudinary::Uploader.upload(
      file.path,
      folder: folder,
      resource_type: :auto
    )

    {
  def self.upload(file:, folder:)
    result = Cloudinary::Uploader.upload(
      file.path,
      folder: folder,
      resource_type: :auto
    )

    {
      url: result["secure_url"],
      public_id: result["public_id"],
      resource_type: result["resource_type"]
    }
  end

  def self.destroy(public_id:, resource_type: "image")
    Cloudinary::Uploader.destroy(
      public_id,
      resource_type: resource_type
    )
  end

  def self.thumbnail_variant(public_id:)
    url = Cloudinary::Utils.cloudinary_url(
      public_id,
      width: 150,
      height: 100,
      crop: :fill,
      quality: :auto,
      fetch_format: :auto
    )

    {
      variant: :thumbnail,
      width: 150,
      height: 100,
      crop: :fill,
      optimized: true,
      url: url
    }
  end
end
