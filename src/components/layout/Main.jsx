import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import "../../../public/assets/css/mainStyle.css";

function Main({ children, isCollapsed, toggleSidebar }){
    return(
        <>
          <div className="d-flex" style={{ color: '#99a1af' }}>
            <Sidebar isCollapsed={isCollapsed} />
            <div className="flex-grow-1" style={{ marginLeft: isCollapsed ? "80px" : "250px", transition: "margin-left 0.3s ease", minWidth: 0 }} >
                <Header toggleSidebar={toggleSidebar} isCollapsed={isCollapsed} />
                <main className="p-2 mt-0" >{children}</main>
                <Footer />
            </div>
          </div>
        </>
    );
}

export default Main;