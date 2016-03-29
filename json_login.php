<?php

header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
header('Content-type: application/json');

session_start();

//regarder ce qu'il y a dans ces champs:
//$_POST['email']
//$_POST['password']
//s'ils existe, regarder si ils sont valides (en PHP)


$obj = new stdClass();

//ici on simule que les id sont valides


$obj->success = true;
$obj->message = "Bonjour, vous pouvez maintenant jouer";

$_SESSION['connecte'] = "utilisateur_lambda";

echo json_encode($obj);