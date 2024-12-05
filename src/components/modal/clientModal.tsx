import React, { FC, useState } from 'react';
import './index.scss';

import { ReactComponent as CloseIcon} from "../../assets/icons/close.svg";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  addClient: (client: any) => void;
}

const ClientModal: FC<ModalProps> = ({ open, onClose, addClient }) => {
  const [type, setType] = useState('individual');
  const [newClientName, setNewClientName] = useState('');
  const [newClinicianName, setNewClinicianName] = useState('');
  const [isOn, setIsOn] = useState(false);

  const handleToggle = () => {
    setIsOn((prev) => !prev);
  };

  const handleAdd = () => {
    addClient({ id: 0, clientName: newClientName, clinicianName: newClinicianName, clientType: type, treatmentPlan: "Note saved", lastSession: "Oct 31, 2023", unsavedNotes: 3213, active: true });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 pt-10 rounded shadow-lg max-w-lg w-full relative">
        <div className="absolute right-6 top-6 cursor-pointer">
          <CloseIcon onClick={onClose} />
        </div>

        <div className="text-center">
          <h2 className="text-xl font-bold mb-2 leading-6">Add new client</h2>
          <p className="modal-desc mb-4 text-sm leading-4">This client information is essential for generating detailed clients documents</p>
        </div>

        <div className="">
          <div className="mb-6">
            <div className="leading-4 text-xs text-black mb-4">Client type *</div>
            <div className="flex">
              <label className="flex items-center space-x-3">
                <input
                  type="radio"
                  name="type"
                  value="individual"
                  checked={type === "individual"}
                  onChange={() => { setType('individual'); }}
                  className="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 focus:ring-red-500 focus:ring-2"
                />
                <span className="client-type individual py-1 px-2 rounded leading-4 text-xs">Individual</span>
              </label>
              <label className="flex items-center space-x-3 ml-6">
                <input
                  type="radio"
                  name="type"
                  value="couple"
                  checked={type === "couple"}
                  onChange={() => { setType('couple'); }}
                  className="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 focus:ring-red-500 focus:ring-2"
                />
                <span className="client-type couple py-1 px-2 rounded leading-4 text-xs">Couple</span>
              </label>
            </div>
          </div>

          <div className="mb-6">
            <div className="leading-4 text-xs text-black mb-1">Client name *</div>
            <input type="text" className="w-full rounded-lg border border-solid p-2 h-10 text-sm mt-2" value={newClientName} placeholder="Client name" onChange={(e) => { setNewClientName(e.target.value) }} />
          </div>

          <div className="mb-6">
            <div className="leading-4 text-xs text-black mb-1">Clinician name *</div>
            <input type="text" className="w-full rounded-lg border border-solid p-2 h-10 text-sm mt-2" value={newClinicianName} placeholder="Client name" onChange={(e) => { setNewClinicianName(e.target.value) }} />
          </div>

          <div className="mb-6">
            <div className="leading-4 text-xs text-black mb-1">Diagnosis</div>
            <select className="w-full rounded-lg border border-solid p-2 h-10 text-sm mt-2">
              <option value="adjustment">F43.22 Adjustment disorder with anxiety</option>
              <option value="anxiety">F42.54 Anxiety</option>
              <option value="disorder">F21.276 Disorder</option>
            </select>
          </div>

          <div className="mb-6 flex justify-between items-center">
            <div className="leading-4 text-xs text-black">High risk client</div>
            <div className="flex items-center space-x-4">
              <button
                onClick={handleToggle}
                className={`relative inline-flex items-center h-6 w-11 rounded-full transition-colors duration-200 focus:outline-none ${
                  isOn ? "modal-com-bg" : "bg-gray-300"
                }`}
              >
                <span
                  className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform duration-200 ${
                    isOn ? "translate-x-5" : "translate-x-1"
                  }`}
                />
              </button>
            </div>
          </div>

          <div className="mb-6">
            <div className="leading-4 text-xs text-black mb-1">Extra notes</div>
            <input type="text" className="w-full rounded-lg border border-solid p-2 h-10 text-sm mt-2" />
          </div>
        </div>
        
        <div className="flex justify-end">
          <button className="modal-com-bg px-4 py-2 text-white rounded hover:bg-red-600" onClick={handleAdd} >
            Add client
          </button>
        </div>
      </div>
    </div>
  );
}

export default ClientModal;
