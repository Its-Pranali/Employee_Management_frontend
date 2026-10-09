import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import "../../../public/assets/css/mainStyle.css";

function Main({ children }){
    return(
        <>
            {children}
            <Header />
            <Sidebar />
            <Footer />
        </>
    );
}

export default Main;