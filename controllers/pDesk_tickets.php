<?php 

header('Access-Control-Allow-Origin: *'); 
date_default_timezone_set('Europe/Istanbul');
@session_start();

/*
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
*/

require_once dirname ( dirname ( __FILE__ ) ) . "/bl/models/pDesk_tickets.php";
require_once dirname ( dirname ( __FILE__ ) ) . "/classes/globalFunctions.php";

$strMethod = "";
$strID = "";
$uploadFolder =  dirname ( dirname ( __FILE__  ) ) . "/uploads/" ;

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

$tickets = new pDesk_tickets($strID);
$globalFunctions = new globalFunctions();

switch($strMethod) {
    case "getTickets":
        $userID  = $_GET['uID'];
        $organizationID = $_GET['oID'];
        $ticketStatus = $_GET['ticketStatus'];
        $ticketType = $_GET['ticketType'];
        
        $result = $tickets->getTickets($organizationID, $userID, $ticketStatus, $ticketType);
        $result = $tickets->toJson;
        echo $result;
        break;  
    case "getTicketsSearch":
        $userID  = $_GET['uID'];
        $organizationID = $_GET['oID'];
        $key = $_GET['key'];
        $result = $tickets->getTicketsSearch($organizationID, $userID, $key);
        $result = $tickets->toJson;
        echo $result;
        break;            
    case "ticketSave":
        $tickets->parentId = $_POST["parentTicketID"];
        $tickets->description = $_POST["ticketResponse"];
        $tickets->subject = $_POST["ticketResponseSubject"];
        $tickets->status = $_POST["ticketStatus"];    
        $tickets->organizationID = $_POST["oID"];  
        $tickets->createdBy = $_POST["uID"];  
        $tickets->assignUserID = $_POST["ticketAssign"]; 
        $tickets->ticketType = $_POST["ticketType"]; 
        $tickets->ticketModule = $_POST["ticketModule"]; 
        $tickets->createdDate = globalFunctions::convertStringtoDate(globalFunctions::getDateOrTime("dateTime"), "dateTime");
        $strID = $tickets->save();

        if ($_POST["parentTicketID"] != 0) {
            $ticketsStatus = new pDesk_tickets( $_POST["parentTicketID"] );
            $ticketsStatus->status = $_POST["ticketStatus"];
            $strIDParent = $ticketsStatus->save();
        }

        //Upload
        if (isset($_FILES['ticketFile']['tmp_name']))
        {
            $fileName = $_FILES['ticketFile']['tmp_name'];
            $fileBaseName = basename($_FILES['ticketFile']['name']);
            $array = explode('.', $fileBaseName);
            $extension = end($array);
            $lastFileName = $strID.".".$extension;
            $uploadFile = $uploadFolder . $lastFileName;

            if (move_uploaded_file($_FILES['ticketFile']['tmp_name'], $uploadFile))
            {
                $ticketsFile = new pDesk_tickets( $strID );
                $ticketsFile->filePath = $lastFileName;
                $ticketsFile->save();
            }
            else{
                echo $_FILES['ticketFile']['tmp_name']." Upload edilemedi";
            }            
        }        
        
        echo $strID;
        break;
    case "getTicketDetails":
        $ticketID  = $_GET['ticketID'];
        $result = $tickets->getTicketDetails( $ticketID );
        $result = $tickets->toJson;
        echo $result;
        break;
    case "getTicketTypes":
        $result = $tickets->getTicketTypes();
        $result = $tickets->toJson;
        echo $result;
        break; 
    case "getTicketCounts":
        $prmStatus = $_GET['status'];
        $prmType = $_GET['type'];
        $organizationID = $_GET['oID'];
        $result = $tickets->getTicketCounts( $prmStatus, $prmType, $organizationID );
        $result = $tickets->toJson;
        echo $result;
        break; 
    case "getTicketById":
        $ticketID  = $_GET['ticketID'];
        $result = $tickets->getTicketById( $ticketID );
        $result = $tickets->toJson;
        echo $result;
        break;        
    case "ticketDelete":
        $ticketID  = $_GET['ticketID'];
        $userID = $globalFunctions->getUserID();
        $result = $tickets->deleteTicketDetails( $ticketID, $userID );
        $result = $tickets->toJson;
        echo $result;
        break;  
    case "ticketFileDelete":
        $ticketID  = $_GET['ticketID'];
        $ticketFile = new pDesk_tickets( $ticketID );
        $ticketFile->filePath = null;
        $strID = $ticketFile->save();
        echo $strID;
        break;    
    case 'downloadFile': 
        $fileName  = $_GET['fileName'];
        $uploadFile = $uploadFolder.$fileName;
        header("Content-Length: " . filesize($uploadFile));
        header('Content-Type: application/octet-stream');
        header('Content-Disposition: attachment; filename='.$fileName);
        readfile($uploadFile);   
    case "prcRptTicketStatus":
        $organizationID = $_GET['oID'];
        $result = $tickets->prcRptTicketStatus( $organizationID );
        $result = $tickets->toJson;
        echo $result;
        break; 
    case "prcRptTicketTypes":
        $organizationID = $_GET['oID'];
        $result = $tickets->prcRptTicketTypes( $organizationID );
        $result = $tickets->toJson;
        echo $result;
        break; 
    case "prcRptModuleErros":
        $organizationID = $_GET['oID'];
        $result = $tickets->prcRptModuleErros( $organizationID );
        $result = $tickets->toJson;
        echo $result;
        break;      
    case "prcRptAssignedUsers":
        $organizationID = $_GET['oID'];
        $result = $tickets->prcRptAssignedUsers( $organizationID );
        $result = $tickets->toJson;
        echo $result;
        break;              
                                                    
}


?>