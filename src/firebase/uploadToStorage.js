import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { toast } from "react-toastify";
import { storage } from ".";
import { v4 } from "uuid";

// bu fonksiyon parametre olarak dosyayı alıpeğer ki türü resimse firabase storage`a yükle ardından url`ni return et
const uploadToStorage = async (file) => {
  //1)dosya resim değilse veya dosya yoksa fonksiyonu durdur
  if (!file || !file.type.startsWith("image")) return null;

  //2)maksimum dosya boyutunu belirle
  const maxSize = 2 * 1024 * 1024;
  if (file.size > maxSize) {
    toast.error("Lütfen 2mb altında medya yükleyiniz.");
    throw new Error("Resim 2mb üstü");
  }
  //3) dosyanın yükleneceği konumunun referansını al
  const imageRef = ref(storage, v4() + file.name);

  //4) referansını oluşturduğumuz konuma dosyayı yükle
  await uploadBytes(imageRef, file);

  //5) storage`a yüklenen dosyanın urlini al ve return et
  const url = await getDownloadURL(imageRef);

  return url;
};

export default uploadToStorage;
