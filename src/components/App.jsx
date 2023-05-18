import { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import Form from './Form/form';
import Filter from './Filter/filter';
import ContactList from './ContactList/contactList';
import { Section } from './App.styled';

export function App() {
  const [contacts, setContacts] = useState(
    () => JSON.parse(window.localStorage.getItem('contactList')) ?? []
  );
  const [filter, setFilter] = useState('');

  useEffect(() => {
    window.localStorage.setItem('contactList', JSON.stringify(contacts));
  }, [contacts]);

  const formSubmitHandler = data => {
    const { name, number } = data;

    addContacts(name, number);
  };

  let addContacts = (name, number) => {
    const newContact = {
      id: nanoid(),
      name: name,
      number: number,
    };

    const isContactExist = contacts.find(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );

    if (isContactExist) {
      alert(`${name} is already in contacts.`);
      return;
    }

    setContacts(prevState => [newContact, ...contacts]);
  };

  const handleChangeFilter = e => {
    setFilter(e.currentTarget.value);
  };

  const deleteContact = contactId => {
    setContacts(contacts.filter(contact => contact.id !== contactId));
  };

  const normalazedFilter = filter.toLowerCase();
  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(normalazedFilter)
  );

  return (
    <Section>
      <h1>Phonebook</h1>
      <Form onSubmit={formSubmitHandler} />

      <h2>Contacts</h2>
      <Filter value={filter} onChange={handleChangeFilter} />
      <ContactList
        filteredContacts={filteredContacts}
        onDeleteContact={deleteContact}
      />
    </Section>
  );
}
