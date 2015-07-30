<?php 
 
$idea= $_POST['idea'];

$msg = 'New Story Idea:  '.$idea.'.';
 

 
$to = "mlinson@essentialhospitals.org";
$subject = "Walls Down Story Idea!";
$headers = "From: survey@wallsdownmag.org" . "\r\n" .
"CC: slaycox@essentialhospitals.org";

mail($to,$subject,$msg,$headers);


?>