<?php
	
    header('Cache-Control: no-cache, must-revalidate');
	header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
	header('Content-type: application/json');
	
    session_start();

    $id = $_POST['id'];
    $pwd = $_POST['password'];
    
    

	$obj = new stdClass();

    //ici on simule que les id sont valides
    

	$obj->success = true;
	$obj->message = "Bonjour Florian";

    $_SESSION['connecte'] = "Mr Gros";

	echo json_encode($obj);	
