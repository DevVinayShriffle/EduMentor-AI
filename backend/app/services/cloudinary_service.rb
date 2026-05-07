class CloudinaryService
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
    return if public_id.blank?

    Cloudinary::Uploader.destroy(
      public_id,
      resource_type: resource_type
    )
  end

  def self.thumbnail_variant(public_id:, resource_type: "image", width: 150, height: 100)
    return nil if public_id.blank?

    normalized_resource_type = resource_type.to_s

    url =
      case normalized_resource_type
      when "video"
        Cloudinary::Utils.cloudinary_url(
          public_id,
          resource_type: :video,
          format: "jpg",
          start_offset: "0",
          width: width,
          height: height,
          crop: :fill,
          quality: :auto
        )
      when "image"
        Cloudinary::Utils.cloudinary_url(
          public_id,
          resource_type: :image,
          width: width,
          height: height,
          crop: :fill,
          quality: :auto,
          fetch_format: :auto
        )
      else
        return nil
      end

    {
      variant: :thumbnail,
      width: width,
      height: height,
      crop: :fill,
      optimized: true,
      url: url
    }
  end
end
