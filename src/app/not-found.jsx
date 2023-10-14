import Image from "next/image";
import notFoundImage from "../assets/notFound.png";

const NotFoundPage = () => {
  return (
    <div>
      <Image
        src={notFoundImage}
        alt="not found image"
        className="w-[50%] h-[70vh] mx-auto"
      />
    </div>
  );
};

export default NotFoundPage;
