import React, { useState, useEffect, useContext } from "react";
import Box from "@mui/material/Box";
import { toast } from "react-toastify";
import { AuthContext } from "../context/auth-context";
import { Table, Modal } from "rsuite";

import axios from "axios";

import { Form, Row, Col, Card, Button } from "react-bootstrap";
import { PencilSquare, TrashFill, FiletypeJpg } from "react-bootstrap-icons";

const Dashboard = () => {
  const [listOfWallet, setListOfWallet] = useState();
  const [exchangeRate, setExchangeRate] = useState();
  const { HeaderCell, Cell, Column } = Table;
  const auth = useContext(AuthContext);

  const [openDeleteConfirmModal, setOpenDeleteConfirmModal] = useState(false);
  const [walletToDelete, setWalletToDelete] = useState();

  var userId = 0;
  if (auth.userId !== 1) {
    userId = JSON.parse(sessionStorage.getItem("session")).userId;
  } else {
    userId = auth.userId;
  }

  const exchangeRateLocal = [
    {
      id: 1,
      base_currency: "SGD",
      exchange_currency: "CAD",
      rate: 0.9255,
    },
    {
      id: 2,
      base_currency: "SGD",
      exchange_currency: "CNH",
      rate: 4.7868,
    },
    {
      id: 3,
      base_currency: "SGD",
      exchange_currency: "EUR",
      rate: 0.7086,
    },
    {
      id: 4,
      base_currency: "SGD",
      exchange_currency: "HKD",
      rate: 5.583,
    },
    {
      id: 5,
      base_currency: "SGD",
      exchange_currency: "JPY",
      rate: 97.5303,
    },
    {
      id: 6,
      base_currency: "SGD",
      exchange_currency: "NZD",
      rate: 1.1612,
    },
    {
      id: 7,
      base_currency: "SGD",
      exchange_currency: "NOK",
      rate: 7.2912,
    },
    {
      id: 8,
      base_currency: "SGD",
      exchange_currency: "GBP",
      rate: 0.5974,
    },
    {
      id: 9,
      base_currency: "SGD",
      exchange_currency: "SEK",
      rate: 7.5168,
    },
    {
      id: 10,
      base_currency: "SGD",
      exchange_currency: "THB",
      rate: 25.7275,
    },
    {
      id: 11,
      base_currency: "SGD",
      exchange_currency: "USD",
      rate: 0.7113,
    },
  ];

  const walletLocal = [
    {
      id: 1,
      user_id: 1,
      name: "Multi-Currency Account",
    },
    {
      id: 2,
      user_id: 1,
      name: "Travel Account",
    },
    {
      id: 3,
      user_id: 2,
      name: "Trading Account",
    },
    {
      id: 4,
      user_id: 3,
      name: "Multi-Currency Account",
    },
    {
      id: 5,
      user_id: 4,
      name: "Trip to Japan",
    },
  ];

  useEffect(() => {
    const abortController = new AbortController();
    try {
      //load wallet and exchange rate
    } catch (err) {
      toast.error("Error retrieving information. Please try again later.");
    }

    return () => {
      abortController.abort();
    };
  }, []);

  const deleteWallet = (event) => {
    event.preventDefault();
    const walletId = walletToDelete.id;
    const response = await axios
    .delete(
      `${process.env.REACT_APP_API_FLASK}/delete/wallet/${walletId}`
    )
    .catch(function(error) {
      if (
        error !== undefined &&
        error.response !== undefined &&
        error.response !== null
      ) {
        toast.error(error.response.data);
      }
    });

  if (
    response !== null &&
    response !== undefined &&
    response.status === 200
  ) {
    toast.success("Deleted wallet.");
    const oldListOfWallet = listOfWallet;
    oldListOfWallet.filter((wallet) => {
        if(wallet.id !== walletId){
            return wallet;
        }
    });

    setListOfWallet(oldListOfWallet);
    setOpenDeleteConfirmModal(false);
  }
    


  };

  return (
    <React.Fragment>
      <div className="mx-2 mt-4 mb-2 ">
        <h3 className="ms-2">Tech Trek MultiCurrency Wallet</h3>
        <br />
        <div className="dash-container mb-4">
          <Card
            id="exchangeTableCard"
            style={{ width: "90%", margin: "0 auto" }}
            className="ms-2"
          >
            <Card.Header className="dash-card_header">
              <h5>Your Wallets</h5>
            </Card.Header>
            <Card.Body>
              <Table
                autoHeight
                wordWrap
                data={walletLocal.filter((wallet) => {
                  console.log(auth.userId);
                  //   console.log(wallet);
                  console.log(wallet.user_id);
                  if (wallet.user_id === userId) {
                    return wallet;
                  }
                })}
              >
                <Column flexGrow={1}>
                  <HeaderCell>S/N</HeaderCell>
                  <Cell dataKey="id" />
                </Column>

                <Column flexGrow={1}>
                  <HeaderCell>userId</HeaderCell>
                  <Cell dataKey="user_id" />
                </Column>

                <Column flexGrow={1}>
                  <HeaderCell>Name of Wallet</HeaderCell>
                  <Cell dataKey="name" />
                </Column>

                <Column width={120} fixed="right">
                  <HeaderCell>Action</HeaderCell>

                  <Cell>
                    {(rowData) => {
                      function deleteAction() {
                        setWalletToDelete(rowData);
                        setOpenDeleteConfirmModal(true);
                      }
                      return (
                        <span>
                          {/* <a onClick={handleAction}> Edit </a> |{" "}
                          <a onClick={handleAction}> Remove </a> */}
                          <TrashFill
                            style={{
                              fontSize: "140%",
                              cursor: "pointer",
                              marginLeft: "10px",
                              marginRight: "10px",
                            }}
                            onClick={deleteAction}
                            color="red"
                          />
                        </span>
                      );
                    }}
                  </Cell>
                </Column>
              </Table>
            </Card.Body>
          </Card>
        </div>

        <div className="dash-container">
          <Card
            id="exchangeTableCard"
            style={{ width: "90%", margin: "0 auto" }}
            className="ms-2"
          >
            <Card.Header className="dash-card_header">
              <h5>Exchange Rates</h5>
            </Card.Header>
            <Card.Body>
              <Table
                autoHeight
                wordWrap
                data={exchangeRateLocal}
                onRowClick={(data) => {
                  console.log(data);
                }}
              >
                <Column flexGrow={1}>
                  <HeaderCell>S/N</HeaderCell>
                  <Cell dataKey="id" />
                </Column>

                <Column flexGrow={1}>
                  <HeaderCell>Base Currency</HeaderCell>
                  <Cell dataKey="base_currency" />
                </Column>

                <Column flexGrow={1}>
                  <HeaderCell>Exchange Currency</HeaderCell>
                  <Cell dataKey="exchange_currency" />
                </Column>

                <Column flexGrow={1}>
                  <HeaderCell>Rate</HeaderCell>
                  <Cell dataKey="rate" />
                </Column>
              </Table>
            </Card.Body>
          </Card>
        </div>
      </div>
      <Modal
        id="deleteConfirmationModal"
        backdrop={"static"}
        keyboard={false}
        open={openDeleteConfirmModal}
        onClose={() => setOpenDeleteConfirmModal(false)}
        size={"md"}
        overflow={false}
        // style={{
        //   width: width,
        //   height: height,
        //   margin: margin,
        // }}
      >
        <Modal.Header>
          <Modal.Title style={{ fontWeight: "bold" }}>
            Confirm delete your wallet
          </Modal.Title>
          <Modal.Body
            style={{ width: "95%", marginLeft: "auto", marginRight: "auto" }}
          >
            <p>
              Are you sure you wish to delete your wallet{" "}
              <strong>
                {walletToDelete !== undefined && walletToDelete !== null
                  ? walletToDelete.name
                  : ""}
              </strong>
              ?
            </p>
          </Modal.Body>
          <Modal.Footer>
            <div className="align-right">
              <Button
                type={"button"}
                onClick={deleteWallet}
                variant="danger"
                style={{
                  textTransform: "uppercase",
                  fontWeight: "bold",
                  marginRight: "10px",
                }}
              >
                Delete
              </Button>
              <Button
                onClick={() => setOpenDeleteConfirmModal(false)}
                appearance="subtle"
              >
                Cancel
              </Button>
            </div>
          </Modal.Footer>
        </Modal.Header>
      </Modal>
    </React.Fragment>
  );
};

export default Dashboard;
