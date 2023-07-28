import { useState } from "react";
import { FaUser } from "react-icons/fa";
import { useMutation } from "@apollo/client";
import { ADD_CLIENT } from "./mutation/clientMutation";
import { GET_CLIENTS } from "./queries/clientQuery";

function AddClientModal() {
   const [name, setName] = useState("");
   const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [addClient] = useMutation(ADD_CLIENT, {
        variables: { name, email, phone },
        update(cache, { data: { addClient } }) {
          const { clients } = cache.readQuery({ query: GET_CLIENTS });
    
          cache.writeQuery({
            query: GET_CLIENTS,
            data: { clients: [...clients, addClient] },
          });
        },
      });
    const onSubmit = (e) => {
        e.preventDefault();

        if (name === '' || email === '' || phone === '') {
          return alert('Please fill in all fields');
        }
    
        addClient(name, email, phone);
    
        setName('');
        setEmail('');
        setPhone('');
    }
  return (
    <>
      <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
  <div className="d-flex align-item-center"><FaUser className="icon"/> <div>Add Client</div></div>
</button>


<div class="modal fade" id="exampleModal"  aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Add Client</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
                          <form onSubmit={onSubmit}>
                              <div className="mb-3">
                                  <label htmlFor="" className="form-label">Name</label>
                                  <input type="text" className="form-control" value={name} onChange={(e)=>setName(e.target.value)} />
                              </div>
                              <div className="mb-3">
                                  <label htmlFor="" className="form-label">email</label>
                                  <input type="email" className="form-control"value={email} onChange={(e)=>setEmail(e.target.value)}/>
                              </div>
                              <div className="mb-3">
                                  <label htmlFor="" className="form-label">phone</label>
                                  <input type="text" className="form-control"value={phone} onChange={(e)=>setPhone(e.target.value)} />
                              </div>
                              <button type="submit" data-bs-dismiss="modal" className="btn btn-secondary">
                                            submit                                  
                              </button>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>
    </>
  );
}

export default AddClientModal;
