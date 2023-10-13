import Image from "next/image";
import mackBookRepairImage from "../../../../assets/macbook-repair.jpg";

const MacbookRepair = () => {
  return (
    <div className="flex p-6" data-aos="zoom-out-up">
      <div className="w-[50%]">
        <h1 className="text-4xl font-bold">MacBook Repair</h1>
        <p className="w-[80%] text-justify my-5">
          MacBook Repair How will everyone know you have a MacBook if you can’t
          show the world that you own one? Don’t let a broken MacBook take away
          that privilege!
        </p>
        <div className="flex">
          <div>
            <h2 className="text-lg font-bold mb-3">Mac Doddy</h2>
            <p>
              We host MacBook specialists that can repair the unique problems
              facing the devices.
            </p>
          </div>
          <div>
            <h2 className="text-lg font-bold mb-3">Efficient Mac Fixes</h2>
            <p>We’ll get your pride and joy patched in a jiffy.</p>
          </div>
        </div>
      </div>
      <div className="w-[50%]">
        <Image alt="image " src={mackBookRepairImage} />
      </div>
    </div>
  );
};

export default MacbookRepair;
