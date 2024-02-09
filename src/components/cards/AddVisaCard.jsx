import React, { useState } from "react";
import Cards from "react-credit-cards-2";
import "react-credit-cards-2/dist/es/styles-compiled.css";
const CreditCardForm = () => {
  const [state, setState] = useState({
    number: "",
    name: "",
    expiry: "",
    cvc: "",
    focus: "",
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState((prev) => ({ ...prev, [name]: value }));
  };
  const handleInputFocus = (e) => {
    setState((prev) => ({ ...prev, focus: e.target.name }));
  };
  return (
    <div>
      <Cards
        number={state.number}
        expiry={state.expiry}
        cvc={state.cvc}
        name={state.name}
        focused={state.focus}
      />
      <div className="p-6 max-w-[80%] md:w-1/3 mx-auto ">
        <form>
          <div className="mb-3 p-2">
            <input
              type="number"
              name="number"
              className="form-control p-2"
              placeholder="Card Number"
              value={state.number}
              onChange={handleInputChange}
              onFocus={handleInputFocus}
              required
            />
          </div>
          <div className="mb-3 ">
            <input
              type="text"
              name="name"
              className="form-control p-2"
              placeholder="Name"
              onChange={handleInputChange}
              onFocus={handleInputFocus}
              required
            />
          </div>
          <div className="row">
            <div className="col-6 mb-3">
              <input
                type="number"
                name="expiry"
                className="form-control p-2"
                placeholder="Valid Thru"
                pattern="\d\d/\d\d"
                value={state.expiry}
                onChange={handleInputChange}
                onFocus={handleInputFocus}
                required
              />
            </div>
            <div className="col-6 mb-3">
              <input
                type="number"
                name="cvc"
                className="form-control p-2"
                placeholder="CVC"
                pattern="\d{3,4}"
                value={state.cvc}
                onChange={handleInputChange}
                onFocus={handleInputFocus}
                required
              />
            </div>
          </div>
          <div className="d-grid">
            <button className="btn btn-dark">Confirm</button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default CreditCardForm;