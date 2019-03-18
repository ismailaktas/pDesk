<?php 

header('Access-Control-Allow-Origin: *'); 
/*
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
*/

require_once dirname ( dirname ( __FILE__ ) ) . "/bl/models/pDesk_users.php";
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
    $strID = $_GET['ID'];
}

$users = new pDesk_users($strID);

$globalFunctions = new globalFunctions();

switch($strMethod) {
    case "getUsers":
        $organizationID = $globalFunctions->getOrganizationID();
        $result = $users->getUsers($organizationID);
        $result = $users->toJson;
        echo $result;
        break;
}


?>