import Image from "next/image";
import pcRepairImage from "../../../../assets/pc-repair.jpg";

const PcRepair = () => {
  return (
    <div className="flex p-6" data-aos="zoom-out-up">
      <div className="w-[50%]">
        <h1 className="text-4xl font-bold">PC / Laptop Repair</h1>
        <p className="w-[80%] text-justify my-5">
          PCs and laptops are like extra limbs to our body; when something goes
          wrong, we tend to panic. Please don’t scream, bring your broken
          computer to us!
        </p>
        <div className="flex">
          <div>
            <h2 className="text-lg font-bold mb-3">Fast Return to Action</h2>
            <p>
              We’ll get your PC/Laptop back into tip-top shape as fast as
              possible.
            </p>
          </div>
          <div>
            <h2 className="text-lg font-bold mb-3">The PC Doctors In.</h2>
            <p>
              Let our master computer surgeons address even the most complex
              problems.
            </p>
          </div>
        </div>
      </div>
      <div className="w-[50%]">
        <Image
          alt="image "
          src={pcRepairImage}
          className="w-[70%] h-[300px] mx-auto"
        />
      </div>
    </div>
  );
};

export default PcRepair;
