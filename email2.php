<?php 
 
$idea= $_POST['idea'];

$msg = 'New Story Idea:  '.$idea.'.';
 

 
$to = "joshdodd@meshfresh.com";
$subject = "Walls Down Story Idea!";
$headers = "From: survey@wallsdownmag.org" . "\r\n" .
"CC:  t@meshfresh.com";

mail($to,$subject,$msg,$headers);


?>