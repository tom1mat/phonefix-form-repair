// <?php
// /**
//  * The Header for our theme
//  *
//  * Displays all of the <head> section and everything up till <div id="main">
//  *
//  * @package WordPress
//  * @subpackage Templatemela
//  */
//  $query = "SELECT wps4_posts.ID, wps4_postmeta.meta_key, wps4_postmeta.meta_value FROM wps4_postmeta INNER JOIN wps4_posts ON wps4_posts.ID = wps4_postmeta.post_id WHERE wps4_postmeta.meta_key = 'reparacion' OR wps4_postmeta.meta_key = 'precio' or wps4_postmeta.meta_key = 'imagen' or wps4_postmeta.meta_key = 'modelo'";
//  $res = $wpdb->get_results($query);


//  $items = [];
//  $modelos = [];
//  $reparaciones = [];
//  $relaciones = [];

//  foreach ($res as $each) {
//      $items[$each->ID][$each->meta_key] = $each->meta_key == 'imagen' ? wp_get_attachment_image_src($each->meta_value, 'full') : $each->meta_value;

//      if ($each->meta_key == 'modelo') {
//         if (!in_array ($each->meta_value, $modelos)) $modelos[] = $each->meta_value;
//      }

//      if ($each->meta_key == 'reparacion') {
//         if (!in_array ($each->meta_value, $reparaciones)) $reparaciones[] = $each->meta_value;
//      }
//  }

//  foreach ($items as $each) {
//      $relaciones[$each['modelo']][$each['reparacion']] = $each;
//  }

//  $modRelsStringified = json_encode($relaciones);
//  $modelosStringified = json_encode($modelos);
//  $reparacionesStringified = json_encode($reparaciones);
// ?>
//     <!DOCTYPE html>
// <html <?php language_attributes(); ?>>
//     <head>
//         <script>
//             var presup_relaciones = JSON.parse('<?php echo $modRelsStringified; ?>');
//             var presup_modelos = JSON.parse('<?php echo $modelosStringified; ?>');
//             var presup_reparaciones = JSON.parse('<?php echo $reparacionesStringified; ?>');
//             console.log(presup_relaciones);
//             console.log(presup_modelos);
//             console.log(presup_reparaciones);
//         </script>
import React from 'react';

import { Form, notification, Input, Button, Checkbox, Select, Row, Col } from 'antd';

const { Option } = Select;

// models: ["5 / 5S / 5C", "SE", "6", "6 PLUS", "6S", "6S PLUS", "7", "7 PLUS", "8", "8 PLUS", "X", "XS", "XS MAX", "XR"],
// repairs: ["Pantalla", "Batería", "Conector de carga", "Señal celular", "Señal WiFi", "Cámara frontal", "Cámara principal", "Micrófono", "Altavoz"],
class FixForm extends React.Component {
  constructor(props) {
    super(props);

    // const relaciones = {
    //   X: {
    //     Pantalla: {
    //       imagen: 'https://images-na.ssl-images-amazon.com/images/I/41YGS1ufu6L._AC_SY400_.jpg',
    //       precio: 1500,
    //     },
    //     Batería: {
    //       imagen: 'https://images-na.ssl-images-amazon.com/images/I/41YGS1ufu6L._AC_SY400_.jpg',
    //       precio: 1500,
    //     },
    //     Micrófono: {
    //       imagen: 'https://images-na.ssl-images-amazon.com/images/I/41YGS1ufu6L._AC_SY400_.jpg',
    //       precio: 1500,
    //     }
    //   },
    //   5: {
    //     Pantalla: {
    //       imagen: 'https://cdn.computerhoy.com/sites/navi.axelspringer.es/public/styles/main_card_image/https/bdt.computerhoy.com/sites/default/files/Apple_iphone-5.png?itok=44Zn1pEd',
    //       precio: 1500,
    //     },
    //     Batería: {
    //       imagen: 'https://cdn.computerhoy.com/sites/navi.axelspringer.es/public/styles/main_card_image/https/bdt.computerhoy.com/sites/default/files/Apple_iphone-5.png?itok=44Zn1pEd',
    //       precio: 1500,
    //     },
    //     Micrófono: {
    //       imagen: 'https://cdn.computerhoy.com/sites/navi.axelspringer.es/public/styles/main_card_image/https/bdt.computerhoy.com/sites/default/files/Apple_iphone-5.png?itok=44Zn1pEd',
    //       precio: 1500,
    //     }
    //   }
    // }

    const { modelos, reparaciones, relaciones } = window;

    console.log(modelos, reparaciones, relaciones);

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

      console.log(modelo, ' ', reparacion);
      console.log(this.state.relaciones);
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
      <Form onSubmit={this.handleSubmit} className="form-reparaciones">
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
        {selectedModel && <img src={selectedModel.imagen[0]} alt="Modelo" />}
      </Form>
    );
  }
}

export default Form.create({ repair: "asd" })(FixForm);