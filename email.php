<?php 
 
$magazine= $_POST['magazine'];
$story= $_POST['story'];
$shareone= $_POST['shareone'];
$sharetwo= $_POST['sharetwo'];
$learned= $_POST['learned'];
$more= $_POST['more'];
$aeh= $_POST['aeh'];
$industry= $_POST['industry'];
$job= $_POST['job'];
$emailin= $_POST['emailin'];

$msg = 'This magazine is '.$magazine.'.';
$msg .= ' My favorite story was ' .$story.'.';
$msg .= ' I want to share it with '.$shareone.' and '.$sharetwo. '.';
$msg .= ' Before reading this, I didn’t know ' .$learned.'. Now, tell me more about '.$more.'!';
$msg .= ' I '.$aeh. ' Americas Essential Hospitals.';
$msg .= ' I work in '.$industry. ' industry as a ' .$job.'.';
$msg .= ' Lets talk more! Heres my email: '.$emailin.'.';

 
$to = "mlinson@essentialhospitals.org";
$subject = "Walls Down Survey!";
$headers = "From: survey@wallsdownmag.org" . "\r\n" .
"CC:  slaycox@essentialhospitals.org";

mail($to,$subject,$msg,$headers);


?>
 