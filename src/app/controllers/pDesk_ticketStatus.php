<?php 

header('Access-Control-Allow-Origin: *'); 
//ini_set('display_errors', 1);
//ini_set('display_startup_errors', 1);
//error_reporting(E_ALL);

require_once dirname ( dirname ( __FILE__ ) ) . "/bl/models/pDesk_ticketStatus.php";
require_once dirname ( dirname ( __FILE__ ) ) . "/classes/globalFunctions.php";

$strMethod = "";
$strID = "";

if (isset($_POST["method"])) {
    $strMethod  = $_POST['method'];
}

if (isset($_POST["ID"])) {
    $strID  = $_POST['ID'];
}


if (isset($_GET["method"])) {
    $strMethod  = $_GET['method'];
}

if (isset($_GET["ID"])) {
    $strID  = $_GET['ID'];
}

$obj = new pDesk_ticketStatus($strID);

switch($strMethod) {
    case "getTicketStatus":
        $result = $obj->getTicketStatus();
        $result = $obj->toJson;
        echo $result;
        break;
}


?>