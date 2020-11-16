import React from 'react'
import { Modal, Row, Col, Container, } from "react-bootstrap";

const RuleDialog = (props) => {

  const { open, handleStart } = props

  return (
    <Modal show={open} onHide={handleStart} centered={true}>
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body>
        <Container>
          <Modal.Title className="text-center">
            Game Pamusi
            </Modal.Title>
          <Modal.Title as='h5' className="text-center text-muted">
            Papan Multi Fungsi FPB dan KPK
          </Modal.Title>
          <Row className='mt-5'>
            <Col>
              <p>Baca aturan bermain  sebelum melakukan permainan.</p>
            </Col>
          </Row>
          <Row>
            <Col md='12'>
              <p>Berikut adalah aturan bermain PAMUSI,</p>
            </Col>
            <Col md='12'>
              <ol start='1'>
                <li>1. Pilih konsep FPB atau KPK.</li>
                <li>2. Pilih angka yang akan dicari faktor bilangannya.</li>
                <li>3. Tekan tombol mulai</li>
                <li>4. Tentukan faktor bilangan dari angka yang telah dipilih sebelumnya, dengan klik tanda di bawah angka sesuai dengan faktor bilangan dari angka yang dipilih.</li>
                <li>5. Pilih dari angka yang termasuk faktor bilangan untuk menentukan FPB atau KPK.</li>
                <li>6. Tekan tombol selesai </li>
                <li>7. Apabila pemain berhasil dapat melanjutkan ke soal berikutnya, apabila  pemain salah mengulang kembali.</li>
              </ol>
            </Col>
          </Row>
        </Container>
      </Modal.Body>
    </Modal>

  )
}

export default RuleDialog
