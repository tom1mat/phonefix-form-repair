import React from 'react';
import './App.css';

import { Form, notification, Input, Button, Checkbox, Select, Row, Col } from 'antd';

const { Option } = Select;

// models: ["5 / 5S / 5C", "SE", "6", "6 PLUS", "6S", "6S PLUS", "7", "7 PLUS", "8", "8 PLUS", "X", "XS", "XS MAX", "XR"],
// repairs: ["Pantalla", "Batería", "Conector de carga", "Señal celular", "Señal WiFi", "Cámara frontal", "Cámara principal", "Micrófono", "Altavoz"],
const formStyles = {
  padding: '10%',
  background: 'whitesmoke',
}
class FixForm extends React.Component {
  constructor(props) {
    super(props);

    const relaciones = {
      X: {
        Pantalla: {
          imagen: 'https://images-na.ssl-images-amazon.com/images/I/41YGS1ufu6L._AC_SY400_.jpg',
          precio: 1500,
        },
        Batería: {
          imagen: 'https://images-na.ssl-images-amazon.com/images/I/41YGS1ufu6L._AC_SY400_.jpg',
          precio: 1500,
        },
        Micrófono: {
          imagen: 'https://images-na.ssl-images-amazon.com/images/I/41YGS1ufu6L._AC_SY400_.jpg',
          precio: 1500,
        }
      },
      5: {
        Pantalla: {
          imagen: 'https://cdn.computerhoy.com/sites/navi.axelspringer.es/public/styles/main_card_image/https/bdt.computerhoy.com/sites/default/files/Apple_iphone-5.png?itok=44Zn1pEd',
          precio: 1500,
        },
        Batería: {
          imagen: 'https://cdn.computerhoy.com/sites/navi.axelspringer.es/public/styles/main_card_image/https/bdt.computerhoy.com/sites/default/files/Apple_iphone-5.png?itok=44Zn1pEd',
          precio: 1500,
        },
        Micrófono: {
          imagen: 'https://cdn.computerhoy.com/sites/navi.axelspringer.es/public/styles/main_card_image/https/bdt.computerhoy.com/sites/default/files/Apple_iphone-5.png?itok=44Zn1pEd',
          precio: 1500,
        }
      }
    }

    const reparaciones = ['Pantalla', 'Batería', 'Micrófono'];
    const modelos = ['5', 'X'];

    this.state = {
      modelos,
      reparaciones,
      relaciones,
      selectedModel: null,
    }
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const item = this.state.relaciones[values.modelo][values.modelo];

        notification.success({
          message: 'Se ha enviado la información',
          description: 'Lo contactaremos a la brevedad',
          placement: 'bottomRight'
        });
      }
    });
  };

  handleModelChange = modelo => {
    this.props.form.setFieldsValue({ modelo });
    const reparacion = this.props.form.getFieldValue('reparacion');

    if (reparacion) {
      const selectedModel = this.state.relaciones[modelo][reparacion];
      this.setState({ selectedModel });
    }
  }

  handleRepairChange = reparacion => {
    this.props.form.setFieldsValue({ reparacion });
    const modelo = this.props.form.getFieldValue('modelo');

    if (modelo) {
      const selectedModel = this.state.relaciones[modelo][reparacion];
      this.setState({ selectedModel });
    }
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { modelos, reparaciones, selectedModel } = this.state;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form" style={formStyles}>
        <Row gutter={24}>
          <Col span={12}>
            <Form.Item>
              {getFieldDecorator('modelo', {
                rules: [{ required: true, message: 'Por favor seleccione un modelo' }],
              })(<Select size="large" placeholder="Seleccionar modelo" onChange={this.handleModelChange}>
                {modelos.map(modelo => (<Option key={modelo} value={modelo}>{modelo}</Option>))}
              </Select>)}
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item>
              {getFieldDecorator('reparacion', {
                rules: [{ required: true, message: 'Por favor seleccione una reparación' }],
              })(<Select size="large" placeholder="Seleccionar reparación" onChange={this.handleRepairChange}>
                {reparaciones.map(reparacion => (<Option key={reparacion} value={reparacion}>{reparacion}</Option>))}
              </Select>)}
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={12}>
            <Form.Item>
              {getFieldDecorator('direccion', {
                rules: [{ message: 'Por favor ingrese la dirección' }],
              })(<Input size="large" placeholder="Dirección" />)}
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item>
              {getFieldDecorator('telefono', {
                rules: [{ message: 'Por favor ingrese un teléfono' }],
              })(<Input size="large" placeholder="Teléfono" />)}
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={12}>
            <Form.Item>
              {getFieldDecorator('email', {
                rules: [
                  { message: 'Por favor ingrese una dirección de mail' },
                  { type: 'email', message: 'El formato de email no es válido' }
                ],
              })(<Input size="large" placeholder="Email" />)}
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item>
              {getFieldDecorator('nombre', {
                rules: [{ message: 'Por favor ingrese su nombre' }],
              })(<Input size="large" placeholder="Nombre" />)}
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={12}>
            <Form.Item>
              {getFieldDecorator('remember', {
                valuePropName: 'checked',
                initialValue: true,
              })(<Checkbox>Puerta a puerta</Checkbox>)}
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item>
              <Button size="large" htmlType="submit">Solicitar reparación</Button>
            </Form.Item>
          </Col>
        </Row>
        {selectedModel && <img src={selectedModel.imagen} alt="Modelo"/>}
      </Form>
    );
  }
}

export default Form.create({ repair: "asd" })(FixForm);