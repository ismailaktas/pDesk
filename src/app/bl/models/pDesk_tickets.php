<?php
require_once dirname ( dirname ( dirname ( __FILE__ ) ) ) . "/dl/dal.php";
use data\TableItem;
class pDesk_tickets extends TableItem {
    
    // fields
    public $ID;
    public $parentId;
    public $subject;
    public $description;
    public $filePath;
    public $organizationID;
    public $status;
    public $assignUserID;
    public $createdDate;
    public $createdBy;
    public $isDeleted;
    public $deletedDate;
        
    // Counctructor
    function __construct($ID = NULL) {
        parent::__construct ();
        $this->ID = $ID;
        $this->settable ( "pDesk_tickets" );
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
    
    function getTicketDetails($prmTicketID)
    {
        return $this->executenonquery("call prcGetTicketDetail($prmTicketID);", true );
    }

    function deleteTicketDetails($prmTicketID, $prmUserID)
    {
        return $this->executenonquery("update pDesk_tickets set isDeleted = 1, deletedDate = now(), createdBy = $prmUserID where pDesk_tickets.ID = $prmTicketID", false, true );
    }    
    
}
?>