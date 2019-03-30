<?php 

header('Access-Control-Allow-Origin: *'); 
date_default_timezone_set('Europe/Istanbul');
@session_start();

/*
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
*/

error_reporting(E_ALL);
ini_set("display_errors", 1);

require_once dirname ( dirname ( __FILE__ ) ) . "/bl/models/pDesk_users.php";
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

$users = new pDesk_users($strID);

$globalFunctions = new globalFunctions();

switch($strMethod) {
    case "saveUser":
        $users->fullname = $_POST["fullname"];
        $users->username = $_POST["username"];
        $users->password = $_POST["password"];
        $users->organizationID = $_POST["organizationID"];
        $users->userType = $_POST["userType"];
        $users->isPassive = 0;
        if ($strID == 0) {
            $users->createdBy = $_POST["uID"];
            $users->createdDate = globalFunctions::convertStringtoDate(globalFunctions::getDateOrTime("dateTime"), "dateTime");
        }
        $result = $users->save();
        echo $result;
        break;   
    case "deleteUser":
        $result = $users->delete();
        echo $result;
        break;            
    case "getUsers":
        $organizationID = $_GET["oID"];
        $userType = $_GET["utype"];
        if ($userType == 1) {
            $organizationID = 0;
        }
        $result = $users->getUsers($organizationID);
        $result = $users->toJson;
        echo $result;
        break;
    case "getUserTypes":
        $userID = $_GET["uID"];
        $result = $users->getUserTypes($userID);
        $result = $users->toJson;
        echo $result;
        break;
    case "getUserOrganizations":
        $userID = $_GET["uID"];
        $result = $users->getUserOrganizations($userID);
        $result = $users->toJson;
        echo $result;
        break;        
    case "getAllUsers":
        $userID = $_GET["uID"];
        $result = $users->getAllUsers($userID);
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
    case "setUserActivePassive":
        $userID = $_GET["userID"];
        $activePassive = $_GET["activePassive"];

        $userActivePassive = new pDesk_users($userID);
        $userActivePassive->isPassive = $activePassive;
        $result = $userActivePassive->save();
        
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
            $_SESSION['organizationName'] = $userObj[0]->organizationName;
            $_SESSION['userID'] = $userObj[0]->ID;
            $_SESSION['fullname'] = $userObj[0]->fullname;
            $_SESSION['username'] = $userObj[0]->username;
            $_SESSION['userType'] = $userObj[0]->userType;
        }
        else {
            $result = "null";
        }
        echo $result;
        break;
}

?>