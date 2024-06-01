import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import axios from "axios";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import moment from "moment";

const UserTable = () => {
  const [data, setData] = useState([]);

  const getUserData = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_URL}/user`);
      setData(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <>
      <div className="container">
        <Row>
          <div className="col mt-5">
            <Card className="shadow">
              <Table className="align-items-center rounded-5" responsive="sm">
                <thead className="thead-dark fs-5">
                  <tr className="table-dark">
                    <th>Id</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>DOB</th>
                    <th>Password</th>
                  </tr>
                </thead>

                <tbody>
                  {data.map((user, index) => (
                    <tr
                      key={index + 1}
                      className={index % 2 === 0 ? "table-light" : null}
                    >
                      <td>{index + 1}</td>
                      <td>{user.name}</td>
                      <td className="p-3">{user.email}</td>
                      <td>
                        {moment(user.dob, "YYYY-MM-DD").format("DD/MM/YYYY")}
                      </td>
                      <td>{user.password}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card>
          </div>
        </Row>
      </div>
    </>
  );
};

export default UserTable;
