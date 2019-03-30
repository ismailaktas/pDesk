<?php
require_once dirname ( dirname ( dirname ( __FILE__ ) ) ) . "/dl/dal.php";
use data\TableItem;
class pDesk_ticketModules extends TableItem {
    
    // fields
    public $ID;
    public $name;
    public $organizationID;
        
    // Counctructor
    function __construct($ID = NULL) {
        parent::__construct ();
        $this->ID = $ID;
        $this->settable ( "pDesk_ticketModules" );
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
    
    function getTicketModules($organizationID)
    {
        return $this->executenonquery("select ID, name from pDesk_ticketModules where organizationID = $organizationID order by name;", true );
    }

    function getAllModules($organizationID)
    {
        return $this->executenonquery("call prcGetModules($organizationID);", true );
    }    
    
}
?>