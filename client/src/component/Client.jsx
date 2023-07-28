import {  useQuery } from "@apollo/client";

import ClientRow from "./ClientRow";
import { GET_CLIENTS } from "./queries/clientQuery";




function Client() {
    const { loading, error, data } = useQuery(GET_CLIENTS);
    console.log(data);
  if (loading) return <p>loading....</p>;
  if (error) return <p>error....</p>;

  return (
    <>
          {!loading && !error &&
              (<table className="table table-hover mt-3">
        <thead>
          <tr>
            <td>id</td>
            <td>name</td>
            <td>email</td>
            <td>phone</td>
          </tr>
        </thead>
        <tbody />
        {data.clients.map((client) => {
            return (
                <ClientRow key={client.id} client={ client} />
            );
        })}
      </table>)}
    </>
  );
}

export default Client;
