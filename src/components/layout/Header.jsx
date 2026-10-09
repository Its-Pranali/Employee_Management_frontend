import { FaBars, FaTimes,FaBell, FaSearch  } from "react-icons/fa";

function Header(){
    
    return(
        <header className="header py-3">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="d-flex justify-content-between align-items-center">
                            <div className="d-flex gap-2 align-items-center">
                                <FaBars size={35} className="border p-2 rounded" />
                                <div className="position-relative">
                                    <FaSearch className="position-absolute search-icon" />
                                    <input type="search" name="search" id="search" className="form-control rounded-pill px-4" placeholder="Search..." />
                                </div>
                            </div>
                            
                            <div>
                                <FaBell size={35} className="border p-2 rounded" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
export default Header;