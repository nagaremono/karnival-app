import AppBar from '../components/AppBar';
import { useMeQuery } from '../generated/graphql';
import { withApollo } from '../utils/withApollo';

const Index = () => {
  const { data } = useMeQuery();

  return (
    <>
      <AppBar />
      <div>Hello World!</div>
      {!data?.me ? <h1>{!data?.me}</h1> : null}
    </>
  );
};

export default withApollo()(Index);
