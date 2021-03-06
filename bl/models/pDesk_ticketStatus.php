<?php
require_once dirname ( dirname ( dirname ( __FILE__ ) ) ) . "/dl/dal.php";
use data\TableItem;
class pDesk_ticketStatus extends TableItem {
    
    // fields
    public $ID;
    public $name;
        
    // Counctructor
    function __construct($ID = NULL) {
        parent::__construct ();
        $this->ID = $ID;
        $this->settable ( "pDesk_ticketStatus" );
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
    
    function getTicketStatus()
    {
        return $this->executenonquery("select ID, name from pDesk_ticketStatus order by ID;", true );
    }
    
}
?>