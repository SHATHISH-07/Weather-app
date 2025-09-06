import CurrentWeather from "./CurrentWeather";
import ForwardGeocoding from "./ForwardGeocoding";
import ReverseGeocoding from "./ReverseGeocoding";

const Home = () => {
  return (
    <div className=" mx-auto ">
      <CurrentWeather />
      <ForwardGeocoding />
      <ReverseGeocoding />
    </div>
  );
};

export default Home;
