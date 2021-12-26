import PropTypes from 'prop-types';
import styled from 'styled-components';
export default function Container({ children, className }) {
  return <ContainerWrapper className={className}>{children}</ContainerWrapper>;
}
Container.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};
export const ContainerWrapper = styled.div`
  padding: 0 10px;
  margin: 0 auto;
`;
