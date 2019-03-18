<?php 

header('Access-Control-Allow-Origin: *'); 
/*
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
*/

@session_start();
require_once dirname ( dirname ( __FILE__ ) ) . "/classes/globalFunctions.php";

$_SESSION['organizationID'] = 1;
$_SESSION['userID'] = 1;



?>