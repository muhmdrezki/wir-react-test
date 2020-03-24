import React, { Component } from 'react'
import { connect } from "react-redux";
import { fetchContacts, updateContacts } from '../../redux/actions/index';

// Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
// Custom CSS
import '../../css/my.css';

//Bootstrap Components
import Button from 'react-bootstrap/Button'
import { Form } from 'react-bootstrap';

export class ContactList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      id: '',
      nama : '',
      no_telp: '',
      alamat: '',
      search: ''
    }
    this.namaInput = this.namaInput.bind(this);
    this.no_telpInput = this.no_telpInput.bind(this);
    this.alamatInput = this.alamatInput.bind(this);
  }

  /**
   *  Form Handling 
   **/
  namaInput(value) {
    this.setState({ nama : value });
  }
  no_telpInput(value) {
    this.setState({ no_telp : value });
  }
  alamatInput(value) {
    this.setState({ alamat : value });
  }
  searchInput(value) {
    this.setState({ search: value });
  }

  /**
   * After page loaded
   */
  componentDidMount() {
    this.props.fetchContacts(); 
  }

  /**
   * Display Data on form
   */
  toEdit(to_be_edited) {
    this.setState({ 
      id : to_be_edited.id,
      nama : to_be_edited.nama,
      no_telp: to_be_edited.no_telp,
      alamat : to_be_edited.alamat
    });
  }

  /**
   * Update Data
   */
  update() {  
    this.props.updateContacts(this.state);
  }

  /**
   * Search Data
   */
  search() {
    this.props.fetchContacts(this.state.search);
  }

  render() {
    return (
      <div className="container">
        <h5 className="text-center"> Contact List </h5>
        <hr/>
        <div className="row">
          <div className="col-lg-6 col-md-6 col-sm-12 col-12">
            <div className="row mb-3">
              <div className="col-lg-8 col-md-6 col-sm-12 col-12">
                <Form.Control type="text" placeholder="Search By Name"
                onChange={e => this.searchInput(e.target.value)}></Form.Control>
              </div>
              <div className="col-lg-3 col-md-3 col-sm-12 col-12">
                <Button variant="info" onClick={() => this.search()}> Cari </Button>
              </div>
            </div>
            <table className="table table-sm table-bordered table-striped">
              <thead>
                <tr>
                  <th> Nama </th>
                  <th> No Telp </th>
                  <th> Action </th>
                </tr>
              </thead>
              <tbody>
                {this.props.contacts.map(el => (
                  <tr key={el.id}>
                    <td> {el.nama} </td>
                    <td> {el.no_telp} </td>
                    <td> <Button variant="warning" size="sm" onClick={() => this.toEdit(el)}> Edit </Button> </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="col-lg-6 col-md-6 col-sm-12 col-12">
            <h6> Detail Contact </h6>
            <hr/>
            <Form.Group>
              <Form.Label> Nama </Form.Label>
              <Form.Control type="text" className="formControl" value={this.state.nama ? this.state.nama : ''}
              onChange={e => this.namaInput(e.target.value)}/>
            </Form.Group>
            <Form.Group>
              <Form.Label> Nomor Telepon </Form.Label>
              <Form.Control type="text" className="formControl" value={this.state.no_telp ? this.state.no_telp : ''}
              onChange={e => this.no_telpInput(e.target.value)}/>
            </Form.Group>
            <Form.Group>
              <Form.Label> Alamat </Form.Label>
              <textarea className="form-control" value={this.state.alamat ? this.state.alamat : ''} onChange={e => this.alamatInput(e.target.value)}></textarea>
            </Form.Group>
            <Button variant="primary" onClick={() => this.update()}> Update Data </Button>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    contacts: state.contacts
  };
}

export default connect(
  mapStateToProps,
  { fetchContacts, updateContacts }
)(ContactList);