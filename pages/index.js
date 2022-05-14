import axios from "axios";

const Index = ({ data }) => (
  <div>
    Hello World
    <h1> {data} </h1>
  </div>
);
Index.getInitialProps = async () => {
  try {
    const response = await axios.get(
      "https://mi42m.sse.codesandbox.io/api/start"
    );
    console.log(response.data);
    return { ...response.data };
  } catch (error) {
    console.log(error);
    return {
      data: error.message
    };
  }
  // return {
  //   data: "some data"
  // };
};
export default Index;
