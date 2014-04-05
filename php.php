<?php

// ANAKONDA - a programozók fenevada
// www.anakonda.hu

// IP cím ellenőrzése
function is_ip($ertek = '') {
	if (!is_string($ertek)) return FALSE;
	return (bool)preg_match('^([1-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])(\.([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])){3}^', $ertek);
}

// IP cím lekérdezése
function ip() {
	$ip = $_SERVER['REMOTE_ADDR'];
	foreach (array('HTTP_X_FORWARDED_FOR', 'HTTP_CLIENT_IP', 'HTTP_X_CLIENT_IP', 'HTTP_X_CLUSTER_CLIENT_IP') as $nev) {
		if (isset($_SERVER[$nev]) && !empty($_SERVER[$nev])) {
			$ip = $_SERVER[$nev];
			break;
		}
	}
	if (!is_ip($ip)) $ip = '0.0.0.0';
	return $ip;
}

// Kérés: IP cím
if ($_GET['p'] == 'ip') echo ip();

// Kérés: Honlapméret
else if ($_GET['p'] == 'meret') {
	$meret = filesize(realpath(__DIR__).DIRECTORY_SEPARATOR.'index.html') + filesize(realpath(__DIR__).DIRECTORY_SEPARATOR.'css.css') + filesize(realpath(__DIR__).DIRECTORY_SEPARATOR.'js.js') + filesize(realpath(__DIR__).DIRECTORY_SEPARATOR.'php.php') + filesize(realpath(__DIR__).DIRECTORY_SEPARATOR.'eger.cur') + filesize(realpath(__DIR__).DIRECTORY_SEPARATOR.'hash.js');
	echo round($meret / 1024).' KB ('.number_format($meret, 0, '.', ' ').' bájt)';
}

// Kérés: Statisztika
else if (substr($_GET['p'], 0, 6) == '|stat|') {
	$fajl = realpath(__DIR__).DIRECTORY_SEPARATOR.'stat.txt';
	if (!is_file($fajl)) {
		$fajl = fopen($fajl, 'a+');
		fwrite($fajl, '');
		fclose($fajl);
	}
	file_put_contents($fajl, file_get_contents($fajl).'|'.$_SERVER['REQUEST_TIME'].'|'.ip().'|'.substr($_GET['p'], 6));
}

// Kérés: Domain
else {
	$_GET['p'] = str_replace(array('domain ', 'http', 'https', '://', 'www.'), array('', '', '', '', ''), $_GET['p']);
	if (substr($_GET['p'], strripos($_GET['p'], '.')) != '.hu') {
		$html = file_get_contents('http://who.is/whois/'.$_GET['p']);
		if (stripos($html, 'appears to be available') === FALSE && stripos($html, 'IP Location') !== FALSE) echo 'foglalt';
		else echo 'szabad';
	}
	else {
		$domain = str_replace(array('%C3%A1', '%C3%81', '%C3%A9', '%C3%89', '%C3%AD', '%C3%8D', '%C3%B3', '%C3%93', '%C3%B6', '%C3%96', '%C5%91', '%C5%90', '%C3%BA', '%C3%9A', '%C3%BC', '%C3%9C', '%C5%B1', '%C5%B0'), array('%E1', '%C1', '%E9', '%C9', '%ED', '%CD', '%F3', '%D3', '%F6', '%D6', '%F5', '%D5', '%FA', '%DA', '%FC', '%DC', '%FB', '%DB'), urlencode(substr($_GET['p'], 0, strripos($_GET['p'], '.'))));
		$html = file_get_contents('http://www.domain.hu/domain/szabad-e/?domain='.$domain.'&tld=hu');
		if (substr_count($html, 'nincs regisztr') > 0) echo 'szabad';
		else echo 'foglalt';
	}
}

?>