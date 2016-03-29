<?php

header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
header('Content-type: application/json');



//regarder ce qu'il y a dans ces champs:
//$_POST['email']
//$_POST['password']
//les creer si email n'existe pas

$obj = new stdClass();

$obj->success = true;
$obj->message = "Enregistré !";