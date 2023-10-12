import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const HomeReview = () => {
  let settings = {
    dots: true,
    infinite: false,
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
        <div>
          <div className=" outline outline-brand p-5 rounded-md shadow-xl my-5 mx-4">
            <p className="text-justify">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae
              optio, natus enim, iste ipsum adipisci facere cum laboriosam
              laudantium itaque illum ipsam quod sint ducimus sapiente vel
              suscipit laborum alias.
            </p>
            <h1 className="text-xl font-bold mt-6">User Name</h1>
          </div>
        </div>
        <div>
          <div className=" outline outline-brand p-5 rounded-md shadow-xl my-5 mx-4">
            <p className="text-justify">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae
              optio, natus enim, iste ipsum adipisci facere cum laboriosam
              laudantium itaque illum ipsam quod sint ducimus sapiente vel
              suscipit laborum alias.
            </p>
            <h1 className="text-xl font-bold mt-6">User Name</h1>
          </div>
        </div>
        <div>
          <div className=" outline outline-brand p-5 rounded-md shadow-xl my-5 mx-4">
            <p className="text-justify">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae
              optio, natus enim, iste ipsum adipisci facere cum laboriosam
              laudantium itaque illum ipsam quod sint ducimus sapiente vel
              suscipit laborum alias.
            </p>
            <h1 className="text-xl font-bold mt-6">User Name</h1>
          </div>
        </div>
        <div>
          <div className=" outline outline-brand p-5 rounded-md shadow-xl my-5 mx-4">
            <p className="text-justify">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae
              optio, natus enim, iste ipsum adipisci facere cum laboriosam
              laudantium itaque illum ipsam quod sint ducimus sapiente vel
              suscipit laborum alias.
            </p>
            <h1 className="text-xl font-bold mt-6">User Name</h1>
          </div>
        </div>
        <div>
          <div className=" outline outline-brand p-5 rounded-md shadow-xl my-5 mx-4">
            <p className="text-justify">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae
              optio, natus enim, iste ipsum adipisci facere cum laboriosam
              laudantium itaque illum ipsam quod sint ducimus sapiente vel
              suscipit laborum alias.
            </p>
            <h1 className="text-xl font-bold mt-6">User Name</h1>
          </div>
        </div>
      </Slider>
    </div>
  );
};

export default HomeReview;
