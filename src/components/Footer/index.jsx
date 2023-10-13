import Image from "next/image";
import logo from "../../assets/pro-tech1.png";

const FooterPage = () => {
  return (
    <div className="bg-gradient-to-l to-gradient-blue from-gradient-green   shadow-lg">
      <footer className="footer p-10 text-base-content">
        <aside>
          <Image alt="image " src={logo} className="w-[150px]" />
          <p>
            ProTech Computer Solutions
            <br />
            Providing reliable tech since 2023
          </p>
        </aside>
        <nav>
          <header className="Text-xl font-bold">Services</header>
          <a className="link link-hover">Repair Service</a>
          <a className="link link-hover">Software Service</a>
          <a className="link link-hover">CPU Service</a>
          <a className="link link-hover">Others Services</a>
        </nav>
        <nav>
          <header className="Text-xl font-bold">Company</header>
          <a className="link link-hover">About us</a>
          <a className="link link-hover">Contact</a>
          <a className="link link-hover">Jobs</a>
          <a className="link link-hover">Press kit</a>
        </nav>
        <nav>
          <header className="Text-xl font-bold">Legal</header>
          <a className="link link-hover">Terms of use</a>
          <a className="link link-hover">Privacy policy</a>
          <a className="link link-hover">Cookie policy</a>
        </nav>
      </footer>
    </div>
  );
};

export default FooterPage;
