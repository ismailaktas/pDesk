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
        return $this->executenonquery("select ID, fullname from pDesk_users where organizationID = $organizationID order by fullname;", true );
    }

    function checkUser($username, $password)
    {
        $strSQL = "select ID, fullname, organizationID, userType, username from pDesk_users where username = '$username' and password = '$password' ";
        return $this->executenonquery($strSQL, true );
    }  
    
    function getLoggedUserInfo($userID)
    {
        $strSQL = "select ID as userID, fullname as userFullName, organizationID as userOrganizationID, userType as usertType, username as username from pDesk_users where ID = $userID ";
        return $this->executenonquery($strSQL, true );
    }      

    
}
?>