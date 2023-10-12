import Image from "next/image";
import NewsImage from "../../../assets/news.jpg";

const HomeNews = () => {
  return (
    <div className="w-[90%] mx-auto grid grid-cols-1 md:grid-cols-3 pb-10">
      <div className="w-[70%] mx-auto shadow-xl rounded-md">
        <Image src={NewsImage} className="rounded-tl-md rounded-tr-md" />
        <div className="p-3">
          <h1 className="text-lg font-semibold">
            How To Back Up An Android Just In Case
          </h1>
          <p className="my-2 italic">Published: 10-10-2023</p>
          <p>
            Unfortunately, it his harder to back up an Android than it is to
            back
          </p>
          <p className="mt-2 text-brand font-bold">READ MORE +</p>
        </div>
      </div>
      <div className="w-[70%] mx-auto shadow-xl rounded-md">
        <Image src={NewsImage} className="rounded-tl-md rounded-tr-md" />
        <div className="p-3">
          <h1 className="text-lg font-semibold">
            How To Back Up An Android Just In Case
          </h1>
          <p className="my-2 italic">Published: 10-10-2023</p>
          <p>
            Unfortunately, it his harder to back up an Android than it is to
            back
          </p>
          <p className="mt-2 text-brand font-bold">READ MORE +</p>
        </div>
      </div>
      <div className="w-[70%] mx-auto shadow-xl rounded-md">
        <Image src={NewsImage} className="rounded-tl-md rounded-tr-md" />
        <div className="p-3">
          <h1 className="text-lg font-semibold">
            How To Back Up An Android Just In Case
          </h1>
          <p className="my-2 italic">Published: 10-10-2023</p>
          <p>
            Unfortunately, it his harder to back up an Android than it is to
            back
          </p>
          <p className="mt-2 text-brand font-bold">READ MORE +</p>
        </div>
      </div>
    </div>
  );
};

export default HomeNews;
