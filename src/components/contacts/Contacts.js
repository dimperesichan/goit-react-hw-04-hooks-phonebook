import styled from 'styled-components';
import PropTypes from 'prop-types';
import Button from '../button';
export default function Contacts({ contacts, onDeleteButtonClick }) {
  return (
    <ul>
      {contacts.map(person => (
        <ListItem key={person.id}>
          {person.name} : {person.number}
          <Button
            content="Delete"
            handleClick={() => onDeleteButtonClick(person.id)}
          />
        </ListItem>
      ))}
    </ul>
  );
}
Contacts.propTypes = {
  contacts: PropTypes.arrayOf(PropTypes.object),
  onDeleteButtonClick: PropTypes.func.isRequired,
};
export const ListItem = styled.li`
  position: relative;
  display: flex;
  justify-content: space-between;
  list-style: circle;
  align-items: baseline;
  width: 350px;
  padding: 5px;
  font-family: var(--font);
  font-size: 18px;
  line-height: 1.5;
  ::before {
    content: '';
    display: block;
    height: 7px;
    width: 7px;
    background-color: var(--yellow);
    border-radius: 50%;
  }
  button {
    margin: 5px 0 5px 10px;
    padding: 3px 10px 3px 10px;
    :hover {
      background-color: var(--blue);
      border: 1px solid var(--dark);
    }
  }
`;
