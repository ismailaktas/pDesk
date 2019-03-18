<?php
date_default_timezone_set('Europe/Istanbul');
@session_start();

$_SESSION['organizationID'] = 1;
$_SESSION['userID'] = 1;

class globalFunctions {
	
	public static function getOrganizationID() {
	    if(isset($_SESSION['organizationID'])){
			return $_SESSION['organizationID'];
	    }
	    else
	    {
	        return 0;
		}
	}
	public static function getUserID() {
	    if(isset($_SESSION['userID'])){
			return $_SESSION['userID'];
	    }
	    else
	    {
	        return 0;
		}
	}

	public static function convertStringtoDate ($strDate, $strType = "date") {
		if ($strDate != "")
		{
			$date = new DateTime($strDate);
			$outputDate = $date->format('Y-m-d');
			if ($strType != "date")
			{
			    $outputDate = $date->format('Y-m-d H:i:s');
			}
			return $outputDate;
		}
		else {
			return "NULL";
		}
	}
	
	public static function convertDatetoString ($strDate) {
	    if ($strDate != "")
	    {
	        $newDate = date("d.m.Y", strtotime($strDate));
	        return $newDate;
	    }
	    else {
	        return "NULL";
	    }
	}
	
	public static function convertTimetoString ($strDateTime) {
	    if ($strDateTime != "")
	    {
	        $newDate = date("H:i", strtotime($strDateTime));
	        return $newDate;
	    }
	    else {
	        return "NULL";
	    }
	}

	public static function getDateOrTime ($strType) {
		if ($strType == "date")
		{
			return date('d.m.Y');
		}
		elseif ($strType == "dateTime")
		{
		    return date('d.m.Y H:i:s');
		}
		elseif ($strType == "dateTimeDbFormat")
		{
		    return date('Y-m-d H:i:s');
		}
		elseif ($strType == "shortTime")
		{
		    return date("H:i");
		}
		else {
			return date("H:i:s");
		}
	}

	public static function dateAdd ($strDate, $dayCount) {
	    if ($strDate != "")
	    {
	        $newDate = date('d.m.Y', strtotime($strDate. ' + '.$dayCount.' days'));
	        return $newDate;
	    }
	    else {
	        return "NULL";
	    }
	}
	
	public static function getRandomNumber () {
	    return rand();
	}
	
	public static function getUniqID() {
	    return uniqid();
	}
	
	public static function getSID() {
	    $rnd = rand()."000000000000";
	    $u1 = md5(uniqid(mt_rand(), true));
	    $u2 = md5(uniqid(mt_rand(), true));
	    $u3 = md5(uniqid(mt_rand(), true));
	    $u4 = md5(uniqid(mt_rand(), true));
	    
	    $strSID = substr($u1, 0, 8);
	    $strSID .= "-". substr($u2, 0, 4);
	    $strSID .= "-". substr($u3, 0, 4);
	    $strSID .= "-". substr($u4, 0, 4);
	    $strSID .= "-". substr($rnd, 0, 12);
	    
	    return $strSID;
	}
		
	public static function cleanText ($strText, $srtType) {
		if ($strText != "")
		{
			$result = "";
			switch ($srtType) {
				case "phone":
					$result = str_replace("(", "", $strText);
					$result = str_replace(")", "", $result);
					$result = str_replace("-", "", $result);
					$result = str_replace(" ", "", $result);
					break;
				case "seo":
				    $turkishChars = array("ş","Ş","ı","ü","Ü","ö","Ö","ç","Ç","ş","Ş","ı","ğ","Ğ","İ","ö","Ö","Ç","ç","ü","Ü");
				    $validChars = array("s","S","i","u","U","o","O","c","C","s","S","i","g","G","I","o","O","C","c","u","U");
				    $tr1 = str_replace($turkishChars, $validChars, $strText);
				    $tr1 = preg_replace("@[^a-z0-9\-_şıöüğçİŞĞÖÜÇ]+@i","-", $strText);
				    $result = $tr1;
				    break;
				default:
					$result = $strText;
					break;
			}
			return trim($result);
		}
		else {
			return "NULL";
		}
	}

	public static function clearEnterFromText($strText)
	{
	    $strReturn = "";
	    if ($strText != "")
	    {
	        $strReturn = str_replace(array("\n\r", "\n", "\r"), ' ', $strText);
	    }
	    return $strReturn;
	}

	public static function isSuperAdmin () {
	    if(isset($_SESSION['isSuperAdmin'])){
	        if ($_SESSION['isSuperAdmin'] == 1)
    	    {
    	        return  true;
    	    }
    	    else {
    	        return  false;
    	    }
	    }
	    else
	    {
	        return  false;
	    }
	}
	
	public static function isAdmin () {
	    if(isset($_SESSION['accountType'])){
	        if ($_SESSION['accountType'] == 4 && $_SESSION["tcID"] !=  '12345678910') // 4= Yonetici
    	    {
    	        return true;
    	    }
    	    else {
    	        return false;
    	    }
	    }
	    else
	    {
	        return  false;
	    }
	}
	
	public static function bindJsontoClassandSave($tableName, $jsonData, $ID){

		require_once dirname(dirname(__FILE__))."/BL/Models/".$tableName.".php";
		$tableClass = new ReflectionClass($tableName);
		$record = $tableClass->newInstanceArgs(array($jsonData['ID']));
		$reflectionClass = new ReflectionClass($tableName);
			
		$reflectionClass->getProperty('ID')->setValue($record, ($action==1 ? null :$jsonData['ID']) );

		foreach ($jsonData as $row => $name)
		{
		  $rowName  = $row;
		  $rowValue = $jsonData[$row];

		  if ($rowValue == "")
		  {
		      $rowValue = "NULL";
		  }
		  
		  try {
		    if ( property_exists($tableName, $rowName) )
		    {
		        $reflectionClass->getProperty($rowName)->setValue($record, $rowValue);
		    }
		    } catch (Exception $error)
		  {
		    echo $error->getMessage();
		  }
		}

		return $record->save();
	}
	
	public static function sendEmail($senderUserID, $toFullName, $toEmail, $subject, $body, $templateID=1)
    {
        try 
        {
            require_once dirname(dirname(__FILE__)) . "/BL/Models/mailQueue.php";
            $mailQueue = new mailQueue();
            $mailQueue->sender = $senderUserID; //gonderen user ID
            $mailQueue->recipient = $toFullName; //alici adi
            $mailQueue->recipientEmail = $toEmail; //alici email
            $mailQueue->subject = $subject; //mail konu
            $mailQueue->body = $body; //mail icerik
            $mailQueue->createTime = globalFunctions::convertStringtoDate(globalFunctions::getDateOrTime("dateTime"), "dateTime"); 
            $mailQueue->templateID = $templateID; //mail template
            $mailQueue->save();
            return true;
        }
	    catch (Exception $error)
	    {
	        //echo $error->getMessage();
	        return false;
	    }
	
    }

    public static function secureJSFile($jsFile)
    {
        require_once dirname(dirname(__FILE__)) . "/Library/packer/src/Packer.php";
        /*
         * params of the constructor :
         * $script:           the JavaScript to pack, string.
         * $encoding:         level of encoding, int or string :
         *                    0,10,62,95 or 'None', 'Numeric', 'Normal', 'High ASCII'.
         *                    default: 62 ('Normal').
         * $fastDecode:       include the fast decoder in the packed result, boolean.
         *                    default: true.
         * $specialChars:     if you have flagged your private and local variables
         *                    in the script, boolean.
         *                    default: false.
         * $removeSemicolons: whether to remove semicolons from the source script.
         *                    default: true.
         */
        $objPacker = new Tholu\Packer\Packer($jsFile, 'Normal', true, false, true);
        $packed_JS = $objPacker->pack();
        return utf8_encode($packed_JS);
    }
    
    
    
}

?>