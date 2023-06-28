import { React, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

// Form for creating a new product record
const ProductCreateForm = () => {
    
    let navigate = useNavigate();

    // Initialize state
    const [productName, setName] = useState("");
    const [productOwnerName, setproductOwnerName] = useState("");
    const [Developers, setDevelopers] = useState([]);
    const [scrumMasterName, setScrumMaster] = useState("");
    const [startDate, setStartDate] = useState("");
    const [methodology, setMethodology] = useState("");
    const [location, setLocation] = useState("");

    function createOptionList(event){
        let optionObjArray = Array.from(event.target.selectedOptions);
        let selectionsArray = optionObjArray.map(obj => obj.value);
        setDevelopers(selectionsArray);
    }

    const handleSubmit = async (event) => {
        const msg = toast.loading("Adding record...");
        event.preventDefault();

        // Validate productName
        if(productName === ""){
        toast.update(msg, { render: "Product must have a name!", type: "error", isLoading: false, autoClose: 3000});
        return
        }

        // Validate productOwnerName
        if (productOwnerName === ""){
        toast.update(msg, { render: "Product must have an productOwnerName!", type: "error", isLoading: false, autoClose: 3000});
        return
        }

        // Validate Developers
        if (Developers === ""){
            toast.update(msg, { render: "Product must have at least one developer!", type: "error", isLoading: false, autoClose: 3000});
            return
            }

        // Validate Scrum Master
        if (scrumMasterName === ""){
            toast.update(msg, { render: "Product must have a Scrum Master!", type: "error", isLoading: false, autoClose: 3000});
            return
        }

        // Validate start date
        if (startDate === ""){
            toast.update(msg, { render: "Product must have a start date!", type: "error", isLoading: false, autoClose: 3000});
            return
        }

        // Validate methodology
        if(methodology === ""){
            toast.update(msg, { render: "Product must have a methodology!", type: "error", isLoading: false, autoClose: 3000})
        }
        
        // Validate methodology
        if(location === ""){
            toast.update(msg, { render: "Product must have a location!", type: "error", isLoading: false, autoClose: 3000})
        }

      axios({
          method: "post",
          url: "/api/product",
          data: {productName, productOwnerName, Developers, scrumMasterName, startDate, methodology, location}
      })
          .then((res) => {
            if (res.status !== 201){
              toast.update(msg, { render: "Something went wrong!", type: "error", isLoading: false, autoClose: 3000 });
            } else {
              navigate("/");
            }
          })
          .catch((err) => {
                console.log("ERROR:", err);
              toast.update(msg, { render: "Something went wrong!", type: "error", isLoading: false, autoClose: 3000})
          })
    }

    return (
      <div>
          <h1 className="text-center">Create New Product</h1>
          <ToastContainer />
          <div className="container">
          <form>
              <div className="mb-3">
                  <label htmlFor="productName" className="form-label">Name</label>
                  <input type="text" className="form-control" id="productName" 
                    value={productName} onChange={e => setName(e.target.value)}
                  />
              </div>
              <div className="mb-3">
                  <label htmlFor="productOwnerName" className="form-label">productOwnerName</label>
                  <select onChange={e => setproductOwnerName(e.target.value)} className="form-control" id="productOwnerName">
                        <option></option>
                        <option>Alex</option>
                        <option>Mircea</option>
                        <option>Veronica</option>
                    </select>
              </div>
              <div className="mb-3">
                  <label htmlFor="Developers" className="form-label">Developers</label>
                    <select onChange={createOptionList} className="form-control select" id="Developers" multiple>
                        <option></option>
                        <option value="Ada">Ada</option>
                        <option value="Ajay">Ajay</option>
                        <option value="Charles">Charles</option>
                        <option value="Elena">Elena</option>
                        <option value="Erin">Erin</option>
                        <option value="Lin">Lin</option>
                        <option value="Yusuf">Yusuf</option>
                    </select>
              </div>
              <div className="mb-3">
                  <label htmlFor="scrumMasterName" className="form-label">Scrum Master</label>
                  <select onChange={e => setScrumMaster(e.target.value)} className="form-control" id="scrumMasterName">
                        <option></option>
                        <option>Bogdan</option>
                        <option>Irina</option>
                        <option>Qiang</option>
                        <option>Tito</option>
                    </select>
              </div>
              <div className="mb-3">
                <label htmlFor="startDate" className="form-label">Start Date</label>
                <input type="date" className="form-control" id="startDate" value={startDate} onChange={e => setStartDate(e.target.value)} pattern="\d{4}\/\d{1,2}\/\d{1,2}"/>
              </div>
              <div className="mb-3">
                  <label htmlFor="methodology" className="form-label">Methodology</label>
                  <select onChange={e => setMethodology(e.target.value)} className="form-control" id="methodology">
                        <option></option>
                        <option>Agile</option>
                        <option>Waterfall</option>
                    </select>
              </div>
              <div className="mb-3">
                  <label htmlFor="location" className="form-label">Location</label>
                  <input type="text" className="form-control" id="location" 
                    value={location} onChange={e => setLocation(e.target.value)}
                  />
              </div>
              <button onClick={(e) => {handleSubmit(e)}} 
                type="submit" className="btn btn-primary">Save</button>
          </form>
          </div>
      </div>
    ) 
    
  }


  export default ProductCreateForm