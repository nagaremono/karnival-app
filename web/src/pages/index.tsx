import AppBar from '../components/AppBar';
import { useMeQuery } from '../generated/graphql';
import { withApollo } from '../utils/withApollo';

const Index = () => {
  return (
    <>
      <AppBar />
      <div>Hello World!</div>
    </>
  );
};

export default withApollo()(Index);
