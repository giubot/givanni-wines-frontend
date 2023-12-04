import Navbar from "../components/Nabvar";
import Hero from '../components/Hero';
import AboutUs from '../components/AboutUs';
import ProducList from '../components/ProductList';
import PaymentInfo from '../components/PaymentInfo';
import Map from '../components/Map';
import Footer from '../components/Footer';

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