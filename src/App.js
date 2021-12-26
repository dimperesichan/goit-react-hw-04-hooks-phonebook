import { useState, useMemo } from 'react';
import Section from './components/section';
import Container from './components/container';
import Title from './components/title';
import Form from './components/form';
import Filter from './components/filter';
import Contacts from './components/contacts';
import dataGenerator from './helpers/dataGenerator';
import contactsData from './data/contacts.json';
import { nanoid } from 'nanoid';
import useLocalStorage from './hooks/useLocalStorage';
const defaultContacts = dataGenerator(contactsData);
export default function APP() {
  const [contacts, setContacts] = useLocalStorage('contacts', defaultContacts);
  const [filter, setFilter] = useState('');
  const formSubmitHandler = data => {
    const isContactValid = validateContact(data, contacts);
    if (isContactValid) {
      data.id = nanoid();
      setContacts(contacts => [data, ...contacts]);
    }
  };
  const validateContact = (data, contacts) => {
    if (contacts.some(({ name }) => name === data.name)) {
      alert(`${data.name} is already in contacts!`);
      return false;
    } else if (contacts.some(({ number }) => number === data.number)) {
      alert(`${data.number} is already in contacts!`);
      return false;
    } else return true;
  };
  const deleteContact = id => {
    setContacts(state => state.filter(contact => contact.id !== id));
  };
  const handleSearch = event => {
    setFilter(event.currentTarget.value);
  };
  const filteredContacts = useMemo(() => {
    const getFiltredContacts = contacts => {
      const lowerCaseFilter = filter.toLowerCase();
      return contacts.filter(person =>
        person.name.toLowerCase().includes(lowerCaseFilter),
      );
    };
    return getFiltredContacts(contacts);
  }, [contacts, filter]);
  return (
    <>
      <Form onSubmit={formSubmitHandler} />
      <Section>
        <Container>
          <Title title="Contacts" />
          <Filter value={filter} onChange={handleSearch} />
          <Contacts
            contacts={filteredContacts}
            onDeleteButtonClick={deleteContact}
          />
        </Container>
      </Section>
    </>
  );
}
