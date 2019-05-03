<?php 

header('Access-Control-Allow-Origin: *'); 
//ini_set('display_errors', 1);
//ini_set('display_startup_errors', 1);
//error_reporting(E_ALL);

require_once dirname ( dirname ( __FILE__ ) ) . "/bl/models/pDesk_ticketModules.php";
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

$obj = new pDesk_ticketModules($strID);

switch($strMethod) {
    case "saveModule":
        $obj->name = $_POST["moduleName"]; 
        $obj->organizationID = $_POST["organizationID"]; 
        $strID = $obj->save();
        echo $strID;
        break;    
    case "deleteModule":
        $result = $obj->delete();
        echo $result;
        break;         
    case "getTicketModules":
        $organizationID  = $_GET['oID'];
        $result = $obj->getTicketModules($organizationID);
        $result = $obj->toJson;
        echo $result;
        break;
    case "getAllModules":
        $organizationID  = $_GET['oID'];
        $result = $obj->getAllModules( $organizationID );
        $result = $obj->toJson;
        echo $result;
        break;         
}


?>