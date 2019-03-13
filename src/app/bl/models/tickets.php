<?php
require_once dirname ( dirname ( dirname ( __FILE__ ) ) ) . "/dl/dal.php";
use data\TableItem;
class tickets extends TableItem {
    
    // fields
    public $ID;
    public $parentId;
    public $subject;
    public $description;
    public $filePath;
    public $createdDate;
    public $createdBy;
        
    // Counctructor
    function __construct($ID = NULL) {
        parent::__construct ();
        $this->ID = $ID;
        $this->settable ( "tickets" );
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
    
    function getTickets()
    {
        return $this->executenonquery("call prcAcademicCalendarMainPage();", true );
    }
    
}
?>