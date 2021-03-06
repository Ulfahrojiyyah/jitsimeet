import React, { useContext, useState, useEffect } from "react";
import "./LihatKelas.css";
import {
  Button,
  Col,
  Container,
  FormControl,
  InputGroup,
  Pagination,
  Row,
  Table,
} from "react-bootstrap";
import { Link, useHistory, useParams } from "react-router-dom";
import { KelasContext } from "../KelasContext/KelasContext";
import { Modal } from "react-bootstrap";
import Tambah from "../Tambah/Tambah";
import EditDetailMatkul from "../EditDetailMatkul";

const LihatKelas = (props) => {
  const [kelass, setKelas] = useContext(KelasContext);
  const [listKelas, setListKelas] = useState([]);
  const { id } = useParams();

  console.log(props);

  useEffect(() => {
    const getKelasYangDifilter = kelass.filter(
      (data) => data.idMataKuliah === id
    );
    setListKelas(getKelasYangDifilter);
  }, []);

  const [show, setShow] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  const [selectKelas, setSelectKelas] = useState(null);
  const history = useHistory();

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const handleShowEdit = (id) => {
    setShowEdit(true);
    const kelasSelect = listKelas.filter((data) => data.id === id);
    setSelectKelas(kelasSelect);
  };

  const handleCloseEdit = () => setShowEdit(false);
  const handleCloseDelete = () => setShowDelete(true);

  const handleKembali = () => {
    console.log("dipanggil 1");
    setListKelas(kelass);
  };

  const confirmDeleteAction = (id) => {
    console.log("id", id);
    const kelasSelect = kelass.filter((data) => data.id !== id);
    console.log("kelasSelect", kelasSelect);
    setKelas(kelasSelect);
    setShowDelete(false);
  };

  console.log(selectKelas);

  return (
    <>
      <div className="bg-white read-wrapper">
        <div className="hamburger-icon mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            onClick={props.isShowSidebar}
            style={{ cursor: "pointer" }}
          >
            {props.isOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>

          <h4 className="">Tabel Detail Mata Kuliah</h4>
        </div>

        <Row className="d-flex align-items-center">
          <Col>
            <Button
              onClick={handleShow}
              className="btn btn-success"
              data-toggle="modal"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                style={{ width: 24, marginRight: 4 }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              <span>Tambah Kelas</span>
            </Button>

            <Button
              onClick={() => history.goBack()}
              className="btn btn-secondary btn-read-kembali"
              data-toggle="modal"
            >
              <span>Kembali</span>
            </Button>
          </Col>
          <Col lg={3}>
            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  style={{ width: 24 }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </InputGroup.Text>
              <FormControl
                placeholder="Pencarian..."
                aria-label="Pencarian..."
                aria-describedby="basic-addon1"
              />
            </InputGroup>
          </Col>
        </Row>

        <Row>
          <Col>
            <Table responsive striped bordered>
              <thead>
                <tr>
                  <th>Judul Pertemuan</th>
                  <th>Waktu Pertemuan</th>
                  <th>Jumlah Siswa</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {listKelas.map((kelas) => (
                  <tr>
                    <td>{kelas.id}</td>
                    <td>{kelas.name}</td>
                    <td>{kelas.position}</td>
                    <td>
                      <Link to={"/Meet/" + kelas.id}>
                        <Button
                          className="btn btn-primary  mb-0 m-2"
                          variant="primary"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            style={{ width: 24, marginRight: 4 }}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                            />
                          </svg>
                          <span>Meet</span>
                        </Button>
                      </Link>

                      <Button
                        onClick={() => handleShowEdit(kelas.id)}
                        className="btn btn-info  mb-0 m-2"
                        variant="info"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          style={{ width: 24, marginRight: 4 }}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                          />
                        </svg>
                        <span>Edit</span>
                      </Button>

                      <Button
                        onClick={() => handleCloseDelete(kelas.id)}
                        className="btn btn-danger mb-0 m-2"
                        variant="danger"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          style={{ width: 24, marginRight: 4 }}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                        <span>Hapus</span>
                      </Button>
                    </td>

                    <Modal show={showDelete} onHide={handleCloseDelete}>
                      <Modal.Header closeButton>
                        <Modal.Title>Hapus</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <p>Yakin Mau Hapus ?</p>
                        <Button onClick={() => confirmDeleteAction(kelas.id)}>
                          Ya
                        </Button>{" "}
                        <Button
                          class="btn btn-secondary"
                          variant="secondary"
                          onClick={() => setShowDelete(false)}
                        >
                          Tidak
                        </Button>
                      </Modal.Body>
                    </Modal>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
        <Row>
          <Col className="d-flex justify-content-end">
            <Pagination>
              <Pagination.First />
              <Pagination.Prev />
              <Pagination.Item active>{1}</Pagination.Item>
              <Pagination.Ellipsis />

              <Pagination.Item>{10}</Pagination.Item>
              <Pagination.Item>{11}</Pagination.Item>
              <Pagination.Item>{12}</Pagination.Item>
              <Pagination.Item>{13}</Pagination.Item>
              <Pagination.Item>{14}</Pagination.Item>

              <Pagination.Ellipsis />
              <Pagination.Item>{20}</Pagination.Item>
              <Pagination.Next />
              <Pagination.Last />
            </Pagination>
          </Col>
        </Row>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Tambah Kelas</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Tambah
              dataUser={listKelas}
              newValue={(value) => {
                setListKelas([...listKelas, value]);
              }}
              onHide={handleClose}
            />
          </Modal.Body>
        </Modal>

        <Modal show={showEdit} onHide={handleCloseEdit}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Detail Mata Kuliah</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <EditDetailMatkul
              dataUser={selectKelas}
              isEdit={true}
              onHide={() => handleCloseEdit()}
            />
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
};

export default LihatKelas;
