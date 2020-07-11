<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
// header("Access-Control-Allow-Headers: X-Requested-With");
header("Access-Control-Allow-Headers: AccountKey,x-requested-with, Content-Type, origin, authorization, accept, client-security-token, host, date, cookie, cookie2");
header('Content-Type: application/json');

$EMAILDESTINATARIO = 'tomasmateo10@gmail.com';

$MODELO    = filter_var($_POST['MODELO'],  FILTER_SANITIZE_STRING);
$EMAIL    = filter_var($_POST['EMAIL'],  FILTER_SANITIZE_EMAIL);
$REPARACION    = filter_var($_POST['REPARACION'],  FILTER_SANITIZE_STRING);
$PRECIO    = filter_var($_POST['PRECIO'],  FILTER_SANITIZE_STRING);
$DIRECCION    = filter_var($_POST['DIRECCION'],  FILTER_SANITIZE_STRING);
$PUERTA_A_PUERTA    = filter_var($_POST['PUERTA_A_PUERTA'],  FILTER_SANITIZE_STRING);
$TELEFONO    = filter_var($_POST['TELEFONO'],  FILTER_SANITIZE_STRING);

$MENSAJE   = "♦ PRESUPUESTADOR WEB" .PHP_EOL.PHP_EOL;

$MENSAJE  .= "• MODELO: {$MODELO}"  .PHP_EOL;
$MENSAJE  .= "• REPARACION: {$REPARACION}"  .PHP_EOL;
$MENSAJE  .= "• PRECIO: {$PRECIO}"  .PHP_EOL;
$MENSAJE  .= "• DIRECCION: {$DIRECCION}"  .PHP_EOL;
$MENSAJE  .= "• EMAIL: {$EMAIL}"  .PHP_EOL;
$MENSAJE  .= "• PUERTA_A_PUERTA: {$PUERTA_A_PUERTA}"  .PHP_EOL;
$MENSAJE  .= "• TELEFONO: {$TELEFONO}" .PHP_EOL.PHP_EOL;


$TITULO    = 'NUEVO PRESUPUETO WEB';
$CABECERAS = 'From: contacto@phone-fix.com.ar' . "\r\n" .
    "Reply-To: $EMAILDESTINATARIO" . "\r\n" .
    'X-Mailer: PHP/' . phpversion();

$response = mail($EMAILDESTINATARIO , $TITULO, $MENSAJE, $CABECERAS);

if ($response) {
    echo json_encode(['status' => 'success']);
    die();
} else {
    echo json_encode(['status' => 'error']);
    die();
}


?>
