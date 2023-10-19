import Image from "next/image";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import NewsImage from "../../../assets/news.jpg";
import { useGetAllBlogsQuery } from "@/redux/api/blogApi";
import { rtkoptions } from "@/utils/rtkOption";
import { useEffect, useState } from "react";

const HomeNews = () => {
  const [homeBlogs, setHomeBlogs] = useState([]);
  const { data } = useGetAllBlogsQuery(rtkoptions);

  useEffect(() => {
    if (data?.data) {
      const tempBlogs = data?.data?.slice(0, 3);
      setHomeBlogs(tempBlogs);
    }
  }, [data?.data]);

  let settings = {
    dots: true,
    autoplaySpeed: 2000,
    slidesToShow: 3,
    slidesToScroll: 3,
    autoplay: true,
    pauseOnHover: false,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div className="w-[90%] mx-auto pb-10">
      <Slider {...settings}>
        {homeBlogs?.map((item, index) => (
          <div key={index} className="mb-5">
            <div className="w-[400px] h-[500px] shadow-xl rounded-md mx-5">
              <Image
                alt="image "
                src={item?.image}
                width={400}
                height={300}
                className="rounded-tl-md rounded-tr-md h-[300px]"
              />
              <div className="p-3">
                <h1 className="text-lg font-semibold">{item?.title}</h1>
                <p className="my-2 italic">Published: {item?.publishedDate}</p>
                <p className=" text-justify">
                  {item?.description?.slice(0, 100)}
                </p>
                <p className="mt-2 text-brand font-bold absolute bottom-10">
                  READ MORE +
                </p>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default HomeNews;
