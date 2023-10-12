import Image from "next/image";
import motherboardRepairImage from "../../../../assets/motherboard-repair.jpg";

const MotherboardRepair = () => {
  return (
    <div className="flex p-6" data-aos="zoom-out-up">
      <div className="w-[50%]">
        <h1 className="text-4xl font-bold">Motherboard Component</h1>
        <p className="w-[80%] text-justify my-5">
          No, a motherboard isn’t an alien vessel coming to abduct you, but it
          is vital to make your computer function. We can fix it if it decides
          to kick the bucket.
        </p>
        <div className="flex">
          <div>
            <h2 className="text-lg font-bold mb-3">Mother of Boards</h2>
            <p>We’re the moms to PC parts that know everything.</p>
          </div>
          <div>
            <h2 className="text-lg font-bold mb-3">Extra Pieces</h2>
            <p>Don’t worry if your motherboards need replacing; we got this!</p>
          </div>
        </div>
      </div>
      <div className="w-[50%]">
        <Image src={motherboardRepairImage} />
      </div>
    </div>
  );
};

export default MotherboardRepair;
