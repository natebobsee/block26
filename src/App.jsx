import { useState } from 'react'
import {useEffect} from 'react'
import './App.css'
//import {ContactList} from './components/contactList.jsx'

function SelectedContact({setSelectedContactId, SelectedContactId, setContacts}) {

  useEffect(() => {
  async function fetchContact() {
    try {
      const response = await fetch(
        "https://fsa-jsonplaceholder-69b5c48f1259.herokuapp.com/users/${SelectedContactId}"
      );
      const result = await response.json();
      setContacts(result);
      console.log(result);
    } catch (error) {
      console.error(error);
    }
    fetchContact();
}},[]);
<ContactList setSelectedContactId={setSelectedContactId} contacts={contacts}/>
}
const dummyContacts = [
  { id: 1, name: "R2-D2", phone: "222-222-2222", email: "r2d2@droids.com" },
  { id: 2, name: "C-3PO", phone: "333-333-3333", email: "c3po@droids.com" },
  { id: 3, name: "BB-8", phone: "888-888-8888", email: "bb8@droids.com" },
];
function ContactRow({ setSelectedContactId, contact }) {
  return (
    <tr
      onClick={() => {
        setSelectedContactId(contact.id);
        //console.log(contact.id);
      }}
    >
      <td>{contact.name}</td>
      <td>{contact.email}</td>
      <td>{contact.phone}</td>
    </tr>
  );
}
function ContactList({ setSelectedContactId, contacts }) {
 
  return (
    <table>
      <thead>
        <tr>
          <th colSpan="3">Contact List</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Name</td>
          <td>Email</td>
          <td>Phone</td>
        </tr>
        {contacts.map((contact) => {
          return <ContactRow key={contact.id} contact={contact} setSelectedContactId={setSelectedContactId}/>;
        })}
      </tbody>
    </table>
  );
}

   function App() {
    const [contacts, setContacts] = useState(dummyContacts);
    useEffect(() => {
      async function fetchContacts() {
        try {
          const response = await fetch(
            "https://fsa-jsonplaceholder-69b5c48f1259.herokuapp.com/users"
          );
          const result = await response.json();
          setContacts(result);
          console.log(result);
        } catch (error) {
          console.error(error);
        }
        console.log(contacts);
      }
      fetchContacts();
    }, []);
 
    const [selectedContactId, setSelectedContactId] = useState(null);

  return (
    <>
      {selectedContactId ? (
        <SelectedContact setSelectedContactId={setSelectedContactId} SelectedContactId={SelectedContactId} setContacts={setContacts}/>
        
        ) : (
        <ContactList setSelectedContactId={setSelectedContactId} contacts={contacts}/>
      )}
      <button>reset</button>
    </>
  );
}


export default App
