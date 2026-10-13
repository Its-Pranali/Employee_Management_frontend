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
            </div>
        </Main>
    );
}
export default Project;