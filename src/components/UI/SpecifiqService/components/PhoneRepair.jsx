import Image from "next/image";
import phoneRepairImage from "../../../../assets/mobile-repair.png";

const PhoneRepair = () => {
  return (
    <div className="flex p-6" data-aos="zoom-out-up">
      <div className="w-[50%]">
        <h1 className="text-4xl font-bold">iphone / ipad Repair</h1>
        <p className="w-[80%] text-justify my-5">
          Not being able to take selfies or update everyone on your latest meal
          is time not well spent! Let us ensure your iPhone/iPad stays intact so
          you can keep the world informed.
        </p>
        <div className="flex">
          <div>
            <h2 className="text-lg font-bold mb-3">
              Quick, Affordoble Repairs
            </h2>
            <p>
              We know you need your phone and tablets back fast, so we’ll get
              repairs done quickly!
            </p>
          </div>
          <div>
            <h2 className="text-lg font-bold mb-3">Smartphone Gurus</h2>
            <p>
              Don’t worry if the device is ancient or the latest and greatest –
              we can fix any iPhone or iPad!
            </p>
          </div>
        </div>
      </div>
      <div className="w-[50%]">
        <Image alt="image " src={phoneRepairImage} />
      </div>
    </div>
  );
};

export default PhoneRepair;
