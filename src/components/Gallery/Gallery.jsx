import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/image-gallery.css";
import { assetPath } from "../../utils/assetPath";
import "./Gallery.css";

export default function Gallery({ pictures, altText }) {
  const items = pictures.map((src) => ({
    original: assetPath(src),
    thumbnail: assetPath(src),
    originalAlt: altText,
    thumbnailAlt: altText,
  }));

  return (
    <div className="property-gallery">
      <ImageGallery
        items={items}
        showPlayButton={false}
        showFullscreenButton={true}
        showNav={true}
        thumbnailPosition="bottom"
      />
    </div>
  );
}
