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
  state = {
    models: ["5 / 5S / 5C", "SE"],
    repairs: ["Pantalla", "Batería"],
    prices: {
      "5 / 5S / 5C": {
        "Pantalla": 100,
        "Batería": 200,
      },
      "SE": {
        "Pantalla": 101,
        "Batería": 202,
      }
    },
    selectedModel: null,
    selectStyles: {
      // width: 120,
    }
  }

  calculatePrice() {
    const model = this.props.form.getFieldValue('model');
    const repair = this.props.form.getFieldValue('repair');
    if (model && repair) {
      const price = this.state.prices[model][repair];
      this.setState({ price });
    }
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.calculatePrice();
        notification.success({
          message: 'Se ha enviado la información',
          description: 'Lo contactaremos a la brevedad',
          placement: 'bottomRight'
        });
      }
    });
  };

  handleModelChange = model => {
    this.props.form.setFieldsValue({ model });
  }

  handleRepairChange = repair => {
    this.props.form.setFieldsValue({ repair });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { models, repairs, price, selectStyles } = this.state;
    return (
        <Form onSubmit={this.handleSubmit} className="login-form" style={formStyles}>
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item>
                {getFieldDecorator('model', {
                  rules: [{ required: true, message: 'Por favor seleccione un modelo' }],
                })(<Select size="large" style={selectStyles} placeholder="Seleccionar modelo" onChange={this.handleModelChange}>
                  {models.map(model => (<Option key={model} value={model}>{model}</Option>))}
                </Select>)}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item>
                {getFieldDecorator('repair', {
                  rules: [{ required: true, message: 'Por favor seleccione una reparación' }],
                })(<Select size="large" style={selectStyles} placeholder="Seleccionar reparación" onChange={this.handleRepairChange}>
                  {repairs.map(repair => (<Option key={repair} value={repair}>{repair}</Option>))}
                </Select>)}
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item>
                {getFieldDecorator('direccion', {
                  rules: [{ required: true, message: 'Por favor ingrese la dirección' }],
                })(<Input size="large" placeholder="Dirección" />)}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item>
                {getFieldDecorator('telefono', {
                  rules: [{ required: true, message: 'Por favor ingrese un teléfono' }],
                })(<Input size="large" placeholder="Teléfono" />)}
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item>
                {getFieldDecorator('email', {
                  rules: [
                    { required: true, message: 'Por favor ingrese una dirección de mail' },
                    { type: 'email', message: 'El formato de email no es válido' }
                  ],
                })(<Input size="large" placeholder="Email" />)}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item>
                {getFieldDecorator('nombre', {
                  rules: [{ required: true, message: 'Por favor ingrese su nombre' }],
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
        </Form>
    );
  }
}

export default Form.create({ repair: "asd" })(FixForm);