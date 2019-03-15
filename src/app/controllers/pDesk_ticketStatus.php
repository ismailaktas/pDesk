<?php 

header('Access-Control-Allow-Origin: *'); 
//ini_set('display_errors', 1);
//ini_set('display_startup_errors', 1);
//error_reporting(E_ALL);

require_once dirname ( dirname ( __FILE__ ) ) . "/bl/models/ticketStatus.php";
require_once dirname ( dirname ( __FILE__ ) ) . "/classes/globalFunctions.php";

$strMethod = "";
$strID = "";

if ($_POST['method'] == ""){
    $strMethod = $formJson["method"];
    $strID = $_POST['ID'];
}
else {
    $strMethod = $_POST['method'];
    $strID = $_POST['ID'];
}

if ($strMethod == "" && $_GET['method'] != "" ) {
    $strMethod  = $_GET['method'];
}

$obj = new ticketStatus($strID);

switch($strMethod) {
    case "getTicketStatus":
        $result = $obj->getTicketStatus();
        $result = $obj->toJson;
        echo $result;
        break;
}


?>