import React, { useState, useEffect } from 'react';
import './index.scss';

import Header from './components/header/Header';
import ClientModal from './components/modal/clientModal';

import { ReactComponent as QuestionMarkIcon} from "./assets/icons/question-mark.svg";
import { ReactComponent as AddIcon} from "./assets/icons/add.svg";
import { demoClients } from "./common/constant";

function App() {
  const [originalClients, setOriginalClients] = useState(demoClients);
  const [clients, setClients] = useState(demoClients);
  const [clientName, setClientName] = useState('');
  const [clinicianName, setClinicianName] = useState('');
  const [activeType, setActiveType] = useState(true);
  const [reactivateClients, setReactivateClients] = useState<number[]>([]);
  const [visibleNewClientModal, setVisibleNewClientModal] = useState(false);

  useEffect(() => {
    setClients(clientName ? originalClients.filter((client: any) => client.clientName.toLowerCase().includes(clientName.toLowerCase() && client.active == activeType)) : originalClients);
  }, [clientName]);

  useEffect(() => {
    setClients(clinicianName ? originalClients.filter((client: any) => client.clinicianName.toLowerCase().includes(clinicianName.toLowerCase() && client.active == activeType)) : originalClients);
  }, [clinicianName]);

  useEffect(() => {
    setClients(originalClients.filter((client: any) => client.active == activeType));
  }, [activeType]);

  const handleStatus = (e: { target: { checked: any; }; }, index: number) => {
    if (e.target.checked) setReactivateClients(prevState => [...new Set([...prevState, index])]);
    else setReactivateClients(prevState => prevState.filter(id => id !== index));
  };

  const handleReactivate = () => {
    setOriginalClients(originalClients.map((client: any) => reactivateClients.includes(client.id) ? { ...client, active: true } : client));
    setReactivateClients([]);
    setClients(clients.filter((client: any) => !reactivateClients.includes(client.id)));
  };

  const addClient = (client: any) => {
    setOriginalClients((prevItems) => [...prevItems, client]);

    if (activeType) setClients((prevItems) => [...prevItems, client]);

    setVisibleNewClientModal(false);
  };

  const closeClientModal = () => {
    setVisibleNewClientModal(false);
  };

  return (
    <>
      <Header />

      <div className="bg-gray-50 px-2 sm:px-0">
        <div className="container m-auto">
          <div className="flex justify-end items-center py-5">
            <QuestionMarkIcon />

            <div className="help-text text-sm ml-2">Help</div>
          </div>

          <div className="clients-container leading-6">
            <div className="text-xl font-bold">Clients</div>

            <div className="mt-4">
              <div className="tabs rounded-full h-10 bg-white flex">
                <div className={`tab w-1/2 flex items-center justify-center rounded-full cursor-pointer ${activeType ? 'active' : ''}`} onClick={() => { setActiveType(true); }}>In treatment ({originalClients.filter((client: any) => client.active).length})</div>
                <div className={`tab w-1/2 flex items-center justify-center rounded-full cursor-pointer ${activeType ? '' : 'active'}`} onClick={() => { setActiveType(false) }}>Deactivated ({originalClients.filter((client: any) => !client.active).length})</div>
              </div>
            </div>

            <div className="mt-4 md:flex justify-between">
              <div className="flex w-full md:w-1/2">
                <div className="mr-2 w-1/2">
                  <div className="text-black text-sm font-medium leading-4">Client name</div>
                  <input type="text" id="client_name" className="filter-input w-full rounded-lg border border-solid p-2 h-10 mt-2" placeholder="Filter by client name" onChange={(e) => { setClientName(e.target.value) }}></input>
                </div>

                <div className="w-1/2">
                  <div className="text-black text-sm font-medium leading-4">Clinician name</div>
                  <input type="text" id="clinician_name" className="filter-input w-full rounded-lg border border-solid p-2 h-10 mt-2" placeholder="Filter by clinician name" onChange={(e) => { setClinicianName(e.target.value) }}></input>
                </div>
              </div>

              <div className="flex justify-end items-end pt-4 md:pt-0">
                <button type="button" className="add-button rounded h-10 px-6 flex border border-solid flex items-center" onClick={() => { setVisibleNewClientModal(true); }}>
                  <AddIcon />
                  <div className="ml-2">Add new client</div>
                </button>
                {
                  reactivateClients.length && !activeType ?
                  <button type="button" className="add-button rounded h-10 px-6 flex border border-solid flex items-center ml-4" onClick={handleReactivate}>
                    <AddIcon />
                    <div className="ml-2">Reactivate</div>
                  </button> :
                  <></>
                }
              </div>
            </div>

            <div className="clients-table-container overflow-x-auto mt-4 rounded-lg mb-6">
              {
                clients.length ?
                <table className="clients-table min-w-full bg-white">
                  <thead className="bg-white border-b">
                    <tr className="text-left">
                      <th className="px-4 py-2 h-10 text-sm font-bold">Client name</th>
                      <th className="px-4 py-2 h-10 text-sm font-bold">Clinician name</th>
                      <th className="px-4 py-2 h-10 text-sm font-bold">Client type</th>
                      <th className="px-4 py-2 h-10 text-sm font-bold">Treatment plan</th>
                      <th className="px-4 py-2 h-10 text-sm font-bold">Last sesstion</th>
                      <th className="px-4 py-2 h-10 text-sm font-bold">Unsaved notes</th>
                      {
                        !activeType && <th className="px-4 py-2 h-10 text-sm font-bold">#</th>
                      }
                    </tr>
                  </thead>
                  <tbody>
                    {
                      clients.map((client: any, index: number) =>
                        <tr className="bg-white border-b capitalize" key={index}>
                          <td className="px-4 py-2 text-sm h-10">{client.clientName}</td>
                          <td className="px-4 py-2 text-sm h-10">{client.clinicianName}</td>
                          <td className="px-4 py-2 text-sm h-10">
                            <span className={`client-type py-1 px-2 rounded ${client.clientType}`}>{client.clientType}</span>
                          </td>
                          <td className="px-4 py-2 text-sm h-10">{client.treatmentPlan}</td>
                          <td className="px-4 py-2 text-sm h-10">{client.lastSession}</td>
                          <td className="px-4 py-2 text-sm h-10">{client.unsavedNotes}</td>
                          {
                            !activeType &&
                            <td className="px-4 py-2 text-sm h-10">
                              <input type="checkbox" className="form-checkbox text-blue-600" onChange={(e) => { handleStatus(e, client.id) }} />
                            </td>
                          }
                        </tr>
                      )
                    }
                  </tbody>
                </table> :
                <div className="text-center mt-6">🙁 Oops! No matches found. Please double-check your input.</div>
              }
            </div>
          </div>
        </div>

        {visibleNewClientModal && <ClientModal open={visibleNewClientModal} onClose={closeClientModal} addClient={addClient} />}
      </div>
    </>
  );
}

export default App;
