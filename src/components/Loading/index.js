import ReactLoading from 'react-loading';

export default function Loading({ isLoading, size }) {
  return <ReactLoading type={isLoading ? "spinningBubbles" : 'blank'} color="#f7b2d1" width={size || 50} />
}