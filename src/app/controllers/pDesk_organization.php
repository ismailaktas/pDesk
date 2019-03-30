<?php 

header('Access-Control-Allow-Origin: *'); 
date_default_timezone_set('Europe/Istanbul');
@session_start();

require_once dirname ( dirname ( __FILE__ ) ) . "/bl/models/pDesk_organization.php";
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

$obj = new pdesk_organization($strID);

switch($strMethod) {
    case "saveOrganization":
        $obj->name = $_POST["organizationName"];
        $strID = $obj->save();
        echo $strID;
        break;  
    case "deleteOrganization":
        $strID = $obj->delete();
        echo $strID;
        break;        
    case "getAllOrganizations":
        $result = $obj->getAllOrganizations();
        $result = $obj->toJson;
        echo $result;
        break;
}


?>