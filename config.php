<?php

define('SITE', 'http://'.$_SERVER['HTTP_HOST']);
// define('SITE', 'http://localhost');
// define('SITE', 'https://webapps.bps.go.id/kayongutarakab');

ini_set('max_execution_time', 40*60);

error_reporting(E_ALL & ~E_NOTICE);
