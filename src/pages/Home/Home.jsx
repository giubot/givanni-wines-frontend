import Navbar from "../../components/Navbar/Nabvar";
import Hero from '../../components/Hero/Hero';
import AboutUs from '../../components/AboutUs/AboutUs';
import ProducList from '../../components/ProductList/ProductList';
import PaymentInfo from '../../components/PaymentInfo/PaymentInfo';
import Map from '../../components/Map/Map';
import Footer from '../../components/Footer/Footer';

const Home = () => {
   return (
    <>
    <Navbar/>
    <Hero/>
    <AboutUs/>
    <ProducList/>
    <PaymentInfo/>
    <Map/>
    <Footer/>
    </>
   )
}
export default Home;