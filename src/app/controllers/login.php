<?php 

header('Access-Control-Allow-Origin: *'); 
/*
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
*/

@session_start();
require_once dirname ( dirname ( __FILE__ ) ) . "/classes/globalFunctions.php";



$domain = ($_SERVER['HTTP_HOST'] != 'localhost') ? $_SERVER['HTTP_HOST'] : false; 
setcookie('isim', 'ismail', time()+60*60*24*365, '/', $domain, false);



?>