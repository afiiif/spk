<?php

function dd($A, $dump = 0, $html = false)
{
	$A = $html ? htmlentities($A) : $A;
	echo '<pre>';
	$dump ? var_dump($A) : print_r($A);
	echo '</pre>';
}

function writeFile($filename, $content = '')
{
	$f = fopen($filename, 'w');
	fwrite($f, $content);
	fclose($f);
}
