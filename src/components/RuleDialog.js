import React from 'react'
import styled from 'styled-components'
import { Modal, Row, Col, Container, } from "react-bootstrap";

const RuleDialog = (props) => {

  const { open, handleStart } = props

  return (
    <Modal show={open} onHide={handleStart} centered={true} >
      <Modal.Header style={{ color: '#D9ED9E', backgroundColor: '#00B052' }} closeButton></Modal.Header>
      <Modal.Body style={{ color: '#D9ED9E', backgroundColor: '#00B052' }}>
        <Container>
          <Modal.Title className="text-center" style={{color: '#EB2629'}}>
            Game Pamusi
            </Modal.Title>
          <Modal.Title className="text-center" style={{color: '#EB2629'}}>
            Papan Multi Fungsi FPB dan KPK
          </Modal.Title>
          <Row className='mt-5'>
            <Col>
              <p style={{ color: '#D9ED9E' }}>Baca aturan bermain  sebelum melakukan permainan.</p>
            </Col>
          </Row>
          <Row>
            <Col md='12'>
              <p style={{ color: '#D9ED9E' }}>Baca aturan bermain sebelum melakukan permainan PAMUSI dibawah ini,</p>
            </Col>
            <Col md='12'>
              <Table>
                <tbody>
                  <tr>
                    <td>1.</td>
                    <td>Pilih konsep FPB atau KPK.</td>
                  </tr>
                  <tr>
                    <td>2.</td>
                    <td>Pilih angka yang akan dicari faktor bilangannya.</td>
                  </tr>
                  <tr>
                    <td>3.</td>
                    <td>Tekan tombol mulai.</td>
                  </tr>
                  <tr>
                    <td>4.</td>
                    <td>Klik tanda dibawah angka, segitiga dan belah ketupat sesuai dengan faktor bilangannya</td>
                  </tr>
                  <tr>
                    <td>5.</td>
                    <td>Pilih dari angka yang termasuk faktor bilangan untuk menentukan FPB atau KPK.</td>
                  </tr>
                  <tr>
                    <td>6.</td>
                    <td>Jika telah menemukan angka FPB atau KPK, klik tombol selesai.</td>
                  </tr>
                  <tr>
                    <td>7.</td>
                    <td>Jika jawaban kalian benar, boleh melanjutkan pada soal berikutnya, dan jika jawaban salah ulangilah kembali.</td>
                  </tr>
                  <tr>
                    <td>8.</td>
                    <td>Jika kalian telah selesai membaca petunjuk permainan, klik tombol silang (X) di pojok kanan atas.</td>
                  </tr>
                  <tr>
                    <td>9.</td>
                    <td>Silahkan mainkan.</td>
                  </tr>
                </tbody>
              </Table>
            </Col>
          </Row>
        </Container>
      </Modal.Body>
    </Modal>

  )
}

const Table = styled.table`
  td {
    vertical-align: top;
  }
`

export default RuleDialog
