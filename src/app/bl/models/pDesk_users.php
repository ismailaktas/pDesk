<?php
require_once dirname ( dirname ( dirname ( __FILE__ ) ) ) . "/dl/dal.php";
use data\TableItem;
class pDesk_users extends TableItem {
    
    // fields
    public $ID;
    public $fullname;
    public $username;
    public $password;
    public $organizationID;
    public $userType;
    public $createdDate;
    public $createdBy;
    public $isPassive;

    // Counctructor
    function __construct($ID = NULL) {
        parent::__construct ();
        $this->ID = $ID;
        $this->settable ( "pDesk_users" );
        $this->refresh ( $ID );
    }
    function __set($property, $value) {
        $this->$property = $value;
    }
    function __get($property) {
        if (isset ( $this->$property )) {
            return $this->$property;
        }
    }
    
    function getUsers($organizationID)
    {
        return $this->executenonquery("select ID, fullname from pDesk_users where ifnull(isPassive, 0) = 0 and ( $organizationID = 0 or (organizationID = $organizationID  or organizationID = 0 ) ) order by fullname;", true );
    }

    function getAllUsers($userID)
    {
        return $this->executenonquery("call prcGetUsers($userID);", true );
    }    

    function checkUser($username, $password)
    {
        $strSQL = "call prcCheckUser('$username', '$password'); ";
        return $this->executenonquery($strSQL, true );
    }  
    
    function getLoggedUserInfo($userID)
    {
        $strSQL = "select ID as userID, fullname as userFullName, organizationID as userOrganizationID, userType as usertType, username as username from pDesk_users where ID = $userID ";
        return $this->executenonquery($strSQL, true );
    }
    
    function getUserTypes($userID)
    {
        return $this->executenonquery("call prcGetUserTypes($userID); ", true );
    } 
    
    function getUserOrganizations($userID)
    {
        return $this->executenonquery("call prcGetUserOrganizations($userID); ", true );
    }  
    
    function getAllOrganizations()
    {
        return $this->executenonquery("select ID, name from pdesk_organization order by name ", true );
    }      

    
}
?>