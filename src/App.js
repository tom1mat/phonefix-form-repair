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

import { Form, notification, Input, Button, Checkbox, Select, Row, Col, Badge } from 'antd';

const { Option } = Select;

class FixForm extends React.Component {
  constructor(props) {
    super(props);

    // const modelos = ["5", "X"];
    // const reparaciones = ["Micrófono", "Pantalla", "Batería"];
    // const exampleImage = ["https://previews.123rf.com/images/roywylam/roywylam1511/roywylam151100002/47935765-tel%C3%A9fono-celular-m%C3%B3vil-elegante-3d-que-pone-completamente.jpg", 1200, 1200, false];
    // const exampleImage2 = ["https://m.eltiempo.com/files/image_640_428/uploads/2017/11/24/5a18df6fd8628.jpeg", 1200, 1200, false];
    // const relaciones = {
    //   X: {
    //     Pantalla: {
    //       imagen: exampleImage,
    //       modelo: 'X',
    //       precio: 1500,
    //       reparacion: 'Pantalla',
    //     },
    //     Batería: {
    //       imagen: exampleImage,
    //       modelo: 'X',
    //       precio: 1500,
    //       reparacion: 'Batería',
    //     },
    //     Micrófono: {
    //       imagen: exampleImage,
    //       modelo: 'X',
    //       precio: 1500,
    //       reparacion: 'Micrófono',
    //     }
    //   },
    //   5: {
    //     Pantalla: {
    //       imagen: exampleImage2,
    //       precio: 1500,
    //       modelo: '5',
    //       reparacion: 'Pantalla',
    //     },
    //     Batería: {
    //       imagen: exampleImage2,
    //       precio: 1500,
    //       modelo: '5',
    //       reparacion: 'Batería',
    //     },
    //   }
    // }

    const { modelos, reparaciones, relaciones } = window;


    this.state = {
      modelos,
      reparaciones,
      relaciones,
      selectedModel: null,
      isDisabled: false,
    }
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        this.setState({ isDisabled: true });
        const item = this.state.relaciones[values.modelo][values.reparacion];

        const { direccion, email, telefono, remember } = values;

        const { modelo, reparacion, precio } = item;

        const data = new FormData();
        data.append('MODELO', modelo);
        data.append('REPARACION', reparacion);
        data.append('PRECIO', precio);
        data.append('DIRECCION', direccion);
        data.append('EMAIL', email);
        data.append('TELEFONO', telefono);
        data.append('PUERTA A PUERTA', remember ? 'Si' : 'No');

        const params = {
          method: 'POST',
          body: data,
        };

        try {
          // const url = 'http://localhost/mail-presupuestador.php';
          const url = '/mail-presupuestador.php';

          const response = await fetch(url, params);

          if (response.status === 200) {
            const { status } = await response.json();

            if (status === 'success') {
              notification.success({
                message: 'Se ha enviado la información',
                description: 'Lo contactaremos a la brevedad',
                placement: 'bottomRight'
              });
            } else {
              console.log('error 1');
              notification.error({
                message: 'No se pudo enviar el mensaje',
                description: 'Intente en otro momento por favor',
                placement: 'bottomRight'
              });
            }
          } else {
            console.log('error 2');
            notification.error({
              message: 'No se pudo enviar el mensaje',
              description: 'Intente en otro momento por favor',
              placement: 'bottomRight'
            });
          }
          this.setState({ isDisabled: false });
        } catch (error) {
          this.setState({ isDisabled: false });
          console.log('error 3');
          notification.error({
            message: 'No se pudo enviar el mensaje',
            description: 'Intente en otro momento por favor',
            placement: 'bottomRight'
          });
        }
      }
    });
  };

  handleModelChange = modelo => {
    this.props.form.setFieldsValue({ modelo });
    const reparacion = this.props.form.getFieldValue('reparacion');

    if (reparacion) {
      const reparacionesDisponibles = this.state.relaciones[modelo];
      const selectedModel = reparacionesDisponibles[reparacion];

      this.props.form.setFieldsValue({ reparacion: null });
      this.setState({ reparaciones: Object.keys(reparacionesDisponibles) })
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
      <Form onSubmit={this.handleSubmit} className="form-reparaciones">
        <Row gutter={24}>
          <Col xs={24} md={12}>
            <Form.Item>
              {getFieldDecorator('modelo', {
                rules: [{ required: true, message: 'Por favor seleccione un modelo' }],
              })(<Select size="large" placeholder="Seleccionar modelo" onChange={this.handleModelChange}>
                {modelos.map(modelo => (<Option key={modelo} value={modelo}>{modelo}</Option>))}
              </Select>)}
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
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
          <Col xs={24} md={12}>
            <Form.Item>
              {getFieldDecorator('direccion', {
                rules: [{ message: 'Por favor ingrese la dirección' }],
              })(<Input size="large" placeholder="Dirección" />)}
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item>
              {getFieldDecorator('telefono', {
                rules: [{ message: 'Por favor ingrese un teléfono' }],
              })(<Input size="large" placeholder="Teléfono" />)}
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col xs={24} md={12}>
            <Form.Item>
              {getFieldDecorator('email', {
                rules: [
                  { message: 'Por favor ingrese una dirección de mail' },
                  { type: 'email', message: 'El formato de email no es válido' }
                ],
              })(<Input size="large" placeholder="Email" />)}
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item>
              {getFieldDecorator('nombre', {
                rules: [{ message: 'Por favor ingrese su nombre' }],
              })(<Input size="large" placeholder="Nombre" />)}
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col xs={24} md={24}>
            <Form.Item>
              {getFieldDecorator('remember', {
                valuePropName: 'checked',
                initialValue: true,
              })(<Checkbox className="puerta-puerta">Puerta a puerta</Checkbox>)}
            </Form.Item>
          </Col>
        </Row>
        {selectedModel && (
          <Row gutter={24}>
            <Col xs={24} md={12}>
              <Form.Item>
                <Button disabled={this.state.isDisabled} size="large" htmlType="submit">Solicitar reparación</Button>
              </Form.Item>
            </Col>
            <Col xs={24} md={12} className="col-precio">
              <div className="precio">
                Costo de la reparación: <Badge className="precio-badge" count={'$'+selectedModel.precio} />
              </div>
            </Col>
            <Col xs={24} md={24}>
              <img className="imagen-modelo" src={selectedModel.imagen[0]} alt="Modelo" />
            </Col>
          </Row>
        )}
      </Form>
    );
  }
}

export default Form.create({ repair: "asd" })(FixForm);