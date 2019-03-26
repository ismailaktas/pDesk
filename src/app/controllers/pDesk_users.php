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
    case "getLoggedUserID":
        $userID = $globalFunctions->getUserID();
        echo $userID;
        break;          
    case "getLoggedUserInfo":
        $userID = $globalFunctions->getUserID();
        $result = $users->getLoggedUserInfo($userID);
        $result = $users->toJson;
        echo $result;
        break;    
    case "logout":
        $_SESSION['userID'] = 0;
        $_SESSION['organizationID'] = 0;
        $result = $_SESSION['userID'];
        session_unset();
        session_destroy();        
        echo $result;
        break;               
    case "checkUser":
        $username = $_POST["username"];
        $password = $_POST["password"];
        $result = $users->checkUser($username, $password);
        $result = $users->toJson;

        $userObj = json_decode($result);
        $userCount = count($userObj);

        if ($userCount>0) {
            $_SESSION['organizationID'] = $userObj[0]->organizationID;
            $_SESSION['userID'] = $userObj[0]->ID;
            $_SESSION['fullname'] = $userObj[0]->fullname;
            $_SESSION['username'] = $userObj[0]->username;
            $_SESSION['userType'] = $userObj[0]->userType;
        }

        echo $userCount;
        break;
}


?>