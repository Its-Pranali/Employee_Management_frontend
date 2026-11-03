function Project(){
    const [showModal,setShowModal]=useState(false);
    
    return(
        <Main>
            <div className="container">
                <div className="row">
                    <div className="d-flex justify-content-end">
                        <button className="btn btn-sm btn-primary" type="button" onClick={addEmployee} >Add Project</button>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-12">
                        <div className="table-responsive">
                            <table className=""></table>
                        </div>
                    </div>
                </div>
            </div>
        </Main>
    );
}
export default Project;