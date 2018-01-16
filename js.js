
/*
 * ANAKONDA - a programozók fenevada
 * www.anakonda.hu
 * (CC) 2009-2018 Szabó Gergő
 */

$('k').focus();
fajl('meret', 'a');

document.onkeyup = terminal;
document.onmouseup = eger;

var bill = 0;
var katt = 0;

var ind = unix_time();
var irany = '';

var el = new Array();
el[0] = '';

var ei = 1;
var ek = 1;

var nl = '<' + 'br' + '/' + '>&nbsp; ';
var pl = {'about': '', 'auto': ' ', 'cal': ' ', 'color': ' ', 'cls': ' ', 'const': ' ', 'date': ' ', 'display': '', 'domain': ' ', 'exit': '', 'fac': ' ', 'fib': ' ', 'fn': ' ', 'google': ' ', 'gora': ' ', 'help': ' ', 'ip': '', 'label': ' ', 'md5': ' ', 'sha1': ' ', 'sha224': ' ', 'sha256': ' ', 'mirrow': ' ', 'mouse': ' ', 'pages': '', 'php': ' ', 'prim': ' ', 'profile': ' ', 'ref': ' ', 'reload': ' ', 'reset': ' ', 'stat': '', 'time': ' ', 'url': ' ', 'vol': ''};
var hiba = 'HIBA: Nincs ilyen paraméter!';

var a = 'off';
var m = '';

function $(v) {
	return document.getElementById(v);
}

function eger() {
	katt++;
	$('k').focus();
}

function trim(s) {
	return s.replace(/^\s*(.*?)\s*$/,"$1");
}

function is_hex(s) {
	s = s.toUpperCase();
	var l = s.length;
	var h = '0123456789ABCDEF';
	for (var i = 0; i < l; i++) if (substr_count(h, s[i]) == 0) return false;
	return true;
}

function substr_count(h, n, o, l) {
	var p = 0, c = 0;
	h += '';
	n += '';
	if (isNaN(o)) o = 0;
	if (isNaN(l)) l = 0;
	o--;
	while ((o = h.indexOf(n, o + 1)) != -1) {
		if (l > 0 && (o + n.l) > l) return false;
		else c++;
	}
	return c;
}

function utf8_encode(a) {
	var s = a + '';
	var t = '';
	var r, e;
	var sl = 0;
	r = e = 0;
	sl = s.length;
	for (var n = 0; n < sl; n++) {
		var c1 = s.charCodeAt(n);
		var enc = null;
		if (c1 < 128) e++;
		else if (c1 > 127 && c1 < 2048) enc = s.fromCharCode((c1 >> 6) | 192) + s.fromCharCode((c1 & 63) | 128);
		else enc = s.fromCharCode((c1 >> 12)|224) + s.fromCharCode(((c1 >> 6) & 63) | 128) + s.fromCharCode((c1 & 63) | 128);
		if (enc !== null) {
			if (e > r) t += s.substr(r, e);
			t += enc;
			r = e = n + 1;
		}
	}
	if (e > r) t += s.substr(r, s.length);
	return t;
}

function ajax(url, callbackFunction) {
	var that = this;
	this.updating = false;
	this.abort = function() {
		if (that.updating) {
			that.updating = false;
			that.AJAX.abort();
			that.AJAX = null;
		}
	};
	this.update = function(passData, postMethod) {
		if (that.updating) return false;
		that.AJAX = null;
		if (window.XMLHttpRequest) that.AJAX = new XMLHttpRequest();
		else that.AJAX = new ActiveXObject('Microsoft.XMLHTTP');
		if (that.AJAX == null) return false;
		else {
			that.AJAX.onreadystatechange = function() {
				if (that.AJAX.readyState == 4) {
					that.updating = false;
					that.callback(that.AJAX.responseText, that.AJAX.status, that.AJAX.responseXML);
					that.AJAX = null;
				}
			};
			that.updating = new Date();
			if (/post/i.test(postMethod)) {
				var uri = urlCall + '?' + that.updating.getTime();
				that.AJAX.open('POST', uri, true);
				that.AJAX.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
				that.AJAX.setRequestHeader('Content-Length', passData.length);
				that.AJAX.send(passData);
			}
			else {
				var uri = urlCall + '?' + passData + '&timestamp=' + (that.updating.getTime());
				that.AJAX.open('GET', uri, true);
				that.AJAX.send(null);
			}
			return true;
		}
	};
	var urlCall = url;
	this.callback = callbackFunction || function(){};
}

function unix_time() {
	return Math.round(new Date().getTime() / 1000);
}

Date.prototype.getDOY = function() {
	var d = new Date(this.getFullYear(), 0, 1);
	return Math.ceil((this - d) / 86400000);
}

Date.prototype.getWeek = function() {
	var w = new Date(this.getFullYear(), 0, 1);
	return Math.ceil((((this - w) / 86400000) + w.getDay() + 1) / 7);
}

function terminal(e) {
	bill++;
	var h = nl + 'HIBA: Nincs ilyen parancs!';
	var b = (window.event) ? event.keyCode:e.keyCode;
	var p = trim($('k').value).toLowerCase();
	if (b == 13 && p != '') {
		if (p.substr(0, 6) == 'label ') label(p);
		else if (p.substr(0, 4) == 'md5 ') hash_md5(p);
		else if (p.substr(0, 5) == 'sha1 ') hash_sha1(p);
		else if (p.substr(0, 7) == 'sha224 ') hash_sha224(p);
		else if (p.substr(0, 7) == 'sha256 ') hash_sha256(p);
		else if (p.substr(0, 7) == 'mirrow ') mirrow(p);
		else if (substr_count(p, ' ') == 1) {
			p = p.toLowerCase().split(' ');
			switch (p[0]) {
				case 'auto': auto(p[1]); break;
				case 'cal': cal(p[1]); break;
				case 'color': color(p[1]); break;
				case 'cls': cls(p[1]); break;
				case 'const': constant(p[1]); break;
				case 'date': date(p[1]); break;
				case 'domain': fajl(p[0] + ' ' + p[1], 'p'); break;
				case 'fac': fac(p[1]); break;
				case 'fib': fib(p[1]); break;
				case 'google': google(p[1], ''); break;
				case 'gora': gora(p[1], ''); break;
				case 'help': help(p[1]); break;
				case 'mouse': mouse(p[1]); break;
				case 'php': php(p[1], ''); break;
				case 'prim': prim(p[1]); break;
				case 'profile': profile(p[1]); break;
				case 'ref': ref(p[1], ''); break;
				case 'reload': reload(p[1]); break;
				case 'reset': reset(p[1]); break;
				case 'url': url(p[1], ''); break;
				case 'time': time(p[1]); break;
				default:
					el[ei] = p[0] + ' ' + p[1];
					elozo(el[ei] + h);
			}
		}
		else if (substr_count(p,' ') == 2) {
			p = p.toLowerCase().split(' ');
			switch (p[0]) {
				case 'color': color(p[1] + ' ' + p[2]); break;
				case 'fn': fn(p[1], p[2]); break;
				case 'google': google(p[1], p[2]); break;
				case 'gora': gora(p[1], p[2]); break;
				case 'php': php(p[1], p[2]); break;
				case 'ref': ref(p[1], p[2]); break;
				case 'url': url(p[1], p[2]); break;
				default:
					el[ei] = p[0] + ' ' + p[1] + ' ' + p[2];
					elozo(el[ei] + h);
			}
		}
		else {
			switch (p) {
				case 'about': about(); break;
				case 'cls': cls(''); break;
				case 'date': date(''); break;
				case 'display': display(); break;
				case 'exit': exit(); break;
				case 'ip': fajl('ip', 'p'); break;
				case 'like': url('http://www.facebook.com/sharer.php?u=http://www.anakonda.hu&t=Anakonda, a programozók fenevada', ''); break;
				case 'pages': pages(); break;
				case 'reload': reload(''); break;
				case 'reset': reset(''); break;
				case 'stat': stat(); break;
				case 'time': time(''); break;
				case 'vol': vol(); break;
				default:
					el[ei] = p;
					elozo(p + nl + 'HIBA: Helytelen szintaxis!');
			}
		}
	}
	else if ($('elozo').innerHTML != '' && (b == 38 || b == 40)) {
		if (b == 38) {
			if (irany == 'l') ek++;
			irany = 'f';
		}
		else if (b == 40) {
			if (irany == 'f') ek -= 2;
			irany = 'l';
		}
		if (ek < 0) ek = 0;
		if (ek == 0) ek = el.length;
		if (ek > el.length) ek = el.length;
		if (ek == ei) --ek;
		if (el[(ei - ek)] != undefined) $('k').value = el[(ei - ek)];
		if (b == 38) ek++;
		else if (b == 40 && ei - ek != el.length - 1) ek--;
	}
	else if (b != 8 && a == 'on') {
		if (p.indexOf(' ') == -1) {
			var t = 0;
			var n = '';
			for (i in pl) {
				if (i.indexOf(p) > -1) {
					n = i;
					t++;
				}
			}
			if (t == 1) $('k').value = n + pl[n];
		}
		else {
			p = p.split(' ');
			if (p[0] == 'profile') {
				ps = {'default': '', 'geek': '', 'modern': ''};
				var t = 0;
				var n = '';
				for (i in ps) {
					if (i.indexOf(p[1]) > -1) {
						n = i;
						t++;
					}
				}
				if (t == 1) $('k').value = 'profile ' + n + ps[n];
			}
			else if (p[0] == 'url') {
				switch (p[1]) {
					case 'ttt': $('k').value = 'url tttweb.hu'; break;
					case 'rejt': $('k').value = 'url rejtjelezo.hu'; break;
					case 'szabo': $('k').value = 'url szabogergo.hu'; break;
					case 'szg': $('k').value = 'url szabogergo.hu'; break;
					case 'hiper': $('k').value = 'url hiperkapu.hu'; break;
					case 'indi': $('k').value = 'url indikator.hu'; break;
					case 'face': $('k').value = 'url facebook.com'; break;
					case 'fb': $('k').value = 'url facebook.com'; break;
					case 'goog': $('k').value = 'url google.hu'; break;
					case 'gma': $('k').value = 'url gmail.com'; break;
					case 'you': $('k').value = 'url youtube.com'; break;
					case 'tw': $('k').value = 'url twitter.com'; break;
					case 'w3': $('k').value = 'url w3schools.com'; break;
				}
			}
			else if (p[0] == 'fn') {
				switch (p[1]) {
					case 's': $('k').value = 'fn sin '; break;
					case 'c': $('k').value = 'fn cos '; break;
					case 't': $('k').value = 'fn tan '; break;
					case 'as': $('k').value = 'fn asin '; break;
					case 'ac': $('k').value = 'fn acos '; break;
					case 'at': $('k').value = 'fn atan '; break;
					case 'l': $('k').value = 'fn log '; break;
				}
			}
			else if (p[0] == 'help') {
				var t = 0;
				var n = '';
				for (i in pl) {
					if (i.indexOf(p[1]) > -1) {
						n = i;
						t++;
					}
				}
				if (t == 1) $('k').value = 'help ' + n + pl[n];
			}
		}
	}
}

function elozo(e) {
	fajl('|stat|' + el[ei], 'a');
	ei++;
	$('elozo').innerHTML += '&gt; ' + e + '<br/>';
	$('k').value = '';
}

function about() {
	el[ei] = 'about';
	elozo(el[ei] + nl + 'Készítette: &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Szabó Gergő' + nl + 'Honlap: &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; www.indikator.hu' + nl + 'E-mail cím: &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; info' + '@' + 'indi' + 'kator' + '.' + 'hu' + nl + 'Honlap mérete: &nbsp; &nbsp; &nbsp; &nbsp;' + m + nl + 'Utolsó módosítás: &nbsp; &nbsp; 2018. január 16.' + nl + 'Fejlesztés kezdete: &nbsp; 2009. november 6.');
}

function fajl(p, t) {
	var a = new ajax('php.php');
	a.callback = function(a, s) {
		if (t == 'p') {
			el[ei] = p;
			elozo(p + nl + a);
		}
		else m = a;
	};
	a.update('p=' + p, 'GET');
}

function auto(p) {
	el[ei] = 'auto ' + p;
	elozo(el[ei]);
	if (p == 'on' || p == 'off') a = p;
	else elozo(el[ei] + nl + hiba);
}

function cal(s) {
	s = 'cal ' + s;
	el[ei] = s;
	var m = '!';
	s.replace(' ', '');
	if (s.indexOf('+') >- 1) m = '+';
	if (s.indexOf('-') >- 1) m = '-';
	if (s.indexOf('*') >- 1) m = '*';
	if (s.indexOf('/') >- 1) m = '/';
	if (s.indexOf('%') >- 1) m = '%';
	if (m == '!') elozo(s + nl + 'HIBA: Helytelen művelet lett megadva!');
	else {
		var s1 = parseFloat(s.substr(4, s.indexOf(m)), 10);
		var s2 = parseFloat(s.substr(s.indexOf(m) + 1, s.length - 1), 10);
		if (!isNaN(s1) && !isNaN(s2)) {
			var e = 0;
			if (m == '+') e = s1 + s2;
			else if (m == '-') e = s1 - s2;
			else if (m == '*') e = s1 * s2;
			else if (m == '/') {
				if (s2 == 0) e = 0;
				else e = s1 / s2;
			}
			else if (m == '%') e = s1 % s2;
			elozo(s + nl + e);
		}
		else elozo(s + nl + 'HIBA: Mindkét értéknek számnak kell lennie!');
	}
}

function color(c) {
	var p1 = p2 = 0;
	var h = nl + 'HIBA: Helytelen paraméter!';
	var s = {0: '#000', 1: '#00F', 2: '#008000', 3: '#0FF', 4: '#F00', 5: '#800080', 6: '#FF0', 7: '#FFF', 8: '#808080', 9: '#C0C0C0', 'a': '#0F0', 'b': '#000080', 'c': '#800000', 'd': '#F0F', 'e': '#FF8040', 'f': '#008080'};
	if (c.length == 1 || c.length == 2) {
		if (is_hex(c[0])) p1 = 1;
		if (c.length == 2 && is_hex(c[1])) p2 = 1;
		if (p1 == 1) {
			$('body').style.background = $('k').style.background = s[c[0]];
			h = '';
		}
		if (p2 == 1) {
			$('body').style.color = $('k').style.color = s[c[1]];
			h = '';
		}
	}
	else if (substr_count(c, '#') > 0) {
		c = c.split(' ');
		if ((c[0].length == 4 || c[0].length == 7) && is_hex(c[0].substr(1))) p1 = 1;
		if (substr_count(c, '#') == 2 && (c[1].length == 4 || c[1].length == 7) && is_hex(c[1].substr(1))) p2 = 1;
		if (p1 == 1) {
			$('body').style.background = $('k').style.background = c[0];
			h = '';
		}
		if (p2 == 1) {
			$('body').style.color = $('k').style.color = c[1];
			h = '';
		}
	}
	el[ei] = 'color ' + c;
	elozo(el[ei] + h);
}

function cls(m) {
	el[ei] = trim('cls ' + m);
	switch (m) {
		case '': $('elozo').innerHTML = ''; break;
		case 'a': $('elozo').innerHTML = ''; $('szoveg').style.display = 'none'; break;
		case 'c': $('szoveg').style.display = 'none'; $('baloldal').style.maxWidth = 'none'; $('k').style.width = '740px'; break;
		default: elozo(el[ei] + nl + hiba);
	}
	$('k').value = '';
	if (m == 'com') elozo(el[ei]);
}

function constant(p) {
	el[ei] = trim('const ' + p);
	switch (p) {
		case 'e': elozo(el[ei] + nl + '2.7182818284 5904523536 0287471352 6624977572'); break;
		case 'p': elozo(el[ei] + nl + '3.1415926535 8979323846 2643383279 5028841971'); break;
		case 'f': elozo(el[ei] + nl + '1.6180339887 4989484820 4586834365 6381177203'); break;
		default: elozo(el[ei] + nl + hiba);
	}
}

function date(p) {
	el[ei] = trim('date ' + p);
	if (p == '') {
		var n = new Array('vasárnap', 'hétfő', 'kedd', 'szerda', 'csütörtök', 'péntek', 'szombat');
		var h = new Array('január', 'február', 'március', 'április', 'május', 'június', 'július', 'augusztus', 'szeptember', 'október', 'november', 'december');
		var i = new Date();
		el[ei] = 'date';
		elozo(el[ei] + nl + i.getFullYear() + '. ' + h[i.getMonth()] + ' ' + i.getDate() + '. ' + n[i.getDay()]);
	}
	else if (p == 'd') {
		var ma = new Date();
		elozo(el[ei] + nl + ma.getDOY() + '. nap');
	}
	else if (p == 'w') {
		var ma = new Date();
		elozo(el[ei] + nl + ma.getWeek() + '. hét');
	}
	else elozo(el[ei] + nl + hiba);
}

function display() {
	var w = document.documentElement.clientWidth ? document.documentElement.clientWidth : document.body.clientWidth;
	var h = document.documentElement.clientHeight ? document.documentElement.clientHeight : document.body.clientHeight;
	el[ei] = 'display';
	if (m == 'on') var eger = 'bekapcsolva';
	else var eger = 'kikapcsolva';
	elozo('display' + nl + 'felbontás: &nbsp; ' + w + ' x ' + h + nl + 'egér: &nbsp; &nbsp; &nbsp; &nbsp;' + eger);
}

function exit() {
	$('terminal').innerHTML = '';
	$('body').style.cursor = 'url(), url(), default';
}

function fac(s) {
	el[ei] = 'fac ' + s;
	if (parseInt(s) != s) elozo(el[ei] + nl + 'HIBA: Egész számot kell megadni!');
	else {
		var e = 1;
		for (var i = 2; i <= s; i++) e = e * i;
		elozo('fac ' + s + nl + e);
	}
}

function fib(s) {
	el[ei] = 'fib ' + s;
	if (parseInt(s) != s) elozo(el[ei] + nl + 'HIBA: Egész számot kell megadni!');
	else if (s == 0) elozo('fib 0' + nl + '0');
	else if (s == 1) elozo('fib 1' + nl + '0 1');
	else {
		var f = [];
		f[0] = 0;
		f[1] = 1;
		var e = '0 1';
		for (var i = 2; i < s; i++) {
			f[i] = f[i - 1] + f[i - 2];
			e += ' ' + f[i];
		}
		elozo('fib ' + s + nl + e);
	}
}

function fn(f, s) {
	el[ei] = 'fn ' + f + ' ' + s;
	if (parseFloat(s) != s) elozo(el[ei] + nl + 'HIBA: Valós számot kell megadni!');
	else if (f == 'sin') elozo(el[ei] + nl + Math.sin(s));
	else if (f == 'cos') elozo(el[ei] + nl + Math.cos(s));
	else if (f == 'tan') elozo(el[ei] + nl + Math.tan(s));
	else if (f == 'asin') elozo(el[ei] + nl + Math.asin(s));
	else if (f == 'acos') elozo(el[ei] + nl + Math.acos(s));
	else if (f == 'atan') elozo(el[ei] + nl + Math.atan(s));
	else if (f == 'log') elozo(el[ei] + nl + Math.log(s));
	else elozo(el[ei] + nl + 'HIBA: Nincs ilyen függvény!');
}

function google(q, p) {
	el[ei] = trim('google ' + q + ' ' + p);
	elozo(el[ei]);
	if (p == '') window.open('http://www.google.hu/#hl=hu&q=' + q, '_blank');
	else if (p == 's') window.location.href = 'http://www.google.hu/#hl=hu&q=' + q;
	else $('elozo').innerHTML += nl + hiba;
}

function gora(s, p) {
	var a = 1.61803399;
	el[ei] = trim('gora ' + s + ' ' + p);
	if (parseFloat(s) != s) elozo(el[ei] + nl + 'HIBA: Valós számot kell megadni!');
	else if (p == '') {
		var r = Math.round(s / a * 100) / 100;
		elozo(el[ei] + nl + r + ' ' + (s - r));
	}
	else if (p == 'b') elozo(el[ei] + nl + (Math.round(s * a * 100) / 100));
	else if (p == 's') elozo(el[ei] + nl + (Math.round(s / a * 100) / 100));
	else elozo(el[ei] + nl + hiba);
}

function help(p) {
	el[ei] = 'help ' + p;
	var s = 'help ' + p + nl;
	switch(p) {
		case 'about':
			elozo(s + 'ABOUT - Információk' + nl + 
			'Honlappal kapcsolatos tudnivalók kiírása.' + nl +
			'parancs: &nbsp; ABOUT [nincs paramétere]');
			break;
		case 'auto':
			elozo(s + 'AUTO - Gyorsgépelés' + nl + 
			'Automatikusan kiegészíti a parancsok neveit.' + nl +
			'parancs: &nbsp; AUTO [on/off]' + nl +
			'példa: &nbsp; &nbsp; auto on');
			break;
		case 'cal':
			elozo(s + 'CAL - Egyszerű számológép' + nl +
			'Öt művelet végezhető el vele két valós számon.' + nl +
			'&nbsp;+ &nbsp; összeadás' + nl +
			'&nbsp;- &nbsp; kivonás' + nl +
			'&nbsp;* &nbsp; szorzás' + nl +
			'&nbsp;/ &nbsp; osztás' + nl +
			'&nbsp;% &nbsp; maradékos osztás' + nl +
			'parancs: &nbsp; CAL [szám][művelet][szám]' + nl +
			'példa: &nbsp; &nbsp; cal 6*4');
			break;
		case 'color':
			elozo(s + 'COLOR - Stílusváltás' + nl +
			'A paraméter két hexadecimális számból áll. Az első' + nl +
			'a hátteret, a második a betűszínt változtattja meg.' + nl +
			'A második megadása opcionális. Színkódok:' + nl +
			'&nbsp;0 = fekete &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;8 = szürke' + nl +
			'&nbsp;1 = kék &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 9 = világos szürke' + nl +
			'&nbsp;2 = zöld &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;A = világos zöld' + nl +
			'&nbsp;3 = tengerkék &nbsp; &nbsp; &nbsp; B = sötét kék' + nl +
			'&nbsp;4 = piros &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; C = sötét piros' + nl +
			'&nbsp;5 = lila &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;D = rózsaszín' + nl +
			'&nbsp;6 = sárga &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; E = naracssárga' + nl +
			'&nbsp;7 = fehér &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; F = kékes-zöld' + nl +
			'parancs: &nbsp; COLOR [színkód] [színkód]' + nl +
			'példa: &nbsp; &nbsp; color 17' + nl +
			'&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;color #51AE87 #66C');
			break;
		case 'cls':
			elozo(s + 'CLS - Képernyő törlése' + nl +
			'Háromféle képpen lehet vele törölni a képernyőt.' + nl +
			'&nbsp;- &nbsp; csak az előző parancsok törlése' + nl +
			'&nbsp;a &nbsp; a logó kivételével mindent töröl' + nl + 
			'&nbsp;c &nbsp; oldalsó parancslista törlése' + nl +
			'parancs: &nbsp; CLS [-/a/c]' + nl +
			'példa: &nbsp; &nbsp; cls a');
			break;
		case 'const':
			elozo(s + 'CONST - Konstansok' + nl +
			'Matematikai állandók értéke.' + nl +
			'&nbsp;e &nbsp; &nbsp;e' + nl +
			'&nbsp;fi &nbsp; fi' + nl + 
			'&nbsp;pi &nbsp; pi' + nl +
			'parancs: &nbsp; CONST [e/f/p]' + nl +
			'példa: &nbsp; &nbsp; const fi');
			break;
		case 'date':
			elozo(s + 'DATE - Aktuális dátum mutatása' + nl +
			'Megjelenítí az aktuális dátumot.' + nl +
			'Paraméterei:' + nl +
			'&nbsp;- &nbsp; teljes dátum' + nl +
			'&nbsp;d &nbsp; eltelt napok száma' + nl +
			'&nbsp;w &nbsp; eltelt hetek száma' + nl +
			'parancs: &nbsp; DATE [-/d/w]' + nl +
			'példa: &nbsp; &nbsp; date w');
			break;
		case 'display':
			elozo(s + 'DISPLAY - Képernyő tulajdonságok' + nl +
			'A látható felülethez kapcsolódó információk kiírása.' + nl +
			'parancs: &nbsp; DISPLAY [nincs paramétere]');
			break;
		case 'domain':
			elozo(s + 'DOMAIN - Gyorsellenőrző' + nl +
			'Kiírja, hogy az adott domain szabad vagy foglalt.' + nl +
			'parancs: &nbsp; DOMAIN [webcím]' + nl +
			'példa: &nbsp; &nbsp; domain tttweb.hu');
			break;
		case 'exit':
			elozo(s + 'EXIT - Kilépés' + nl +
			'Böngészés befejezése a honlapon.' + nl +
			'parancs: &nbsp; EXIT [nincs paramétere]');
			break;
		case 'fac':
			elozo(s + 'FAL - Faktorálás' + nl +
			'Kiszámolja a megadott szám faktoriálisát.' + nl +
			'parancs: &nbsp; FAC [szám]' + nl +
			'példa: &nbsp; &nbsp; fac 5');
			break;
		case 'fib':
			elozo(s + 'FIB - Fibonacci' + nl +
			'Kiírja a számsorozat a megadott hosszúságig.' + nl +
			'parancs: &nbsp; FIB [szám]' + nl +
			'példa: &nbsp; &nbsp; fib 7');
			break;
		case 'fn':
			elozo(s + 'FN - Függvények' + nl +
			'Nevezetes matematikai függvények.' + nl +
			'Paraméterei:' + nl +
			'&nbsp;sin &nbsp; &nbsp;sinus' + nl +
			'&nbsp;cos &nbsp; &nbsp;cosinus' + nl +
			'&nbsp;tan &nbsp; &nbsp;tangens' + nl +
			'&nbsp;asin &nbsp; 1 / sinus' + nl +
			'&nbsp;acos &nbsp; 1 / cosinus' + nl +
			'&nbsp;atan &nbsp; 1 / tangens' + nl +
			'&nbsp;log &nbsp; &nbsp;logaritmus' + nl +
			'parancs: &nbsp; FN [függvény] [szám]' + nl +
			'példa: &nbsp; &nbsp; fn sin 6');
			break;
		case 'google':
			elozo(s + 'GOOGLE - Keresés a weben' + nl +
			'A megadott kulcsszóval keress a Google-ben.' + nl +
			'Paraméterei:' + nl +
			'&nbsp;- &nbsp; új ablakban nyílik meg' + nl +
			'&nbsp;s &nbsp; jelenlegi ablakban nyílik meg' + nl +
			'parancs: &nbsp; GOOGLE [szöveg] [-/s]' + nl +
			'példa: &nbsp; &nbsp; google valami');
			break;
		case 'gora':
			elozo(s + 'GORA - Aranymetszés' + nl +
			'Kiszámolja a megadott számhoz tartozó párt.' + nl +
			'Paraméterei:' + nl +
			'&nbsp;- &nbsp; a számból lesz képezve két arányszám' + nl +
			'&nbsp;b &nbsp; a szám szorozva lesz az aránnyal' + nl +
			'&nbsp;s &nbsp; a szám osztva lesz az aránnyal' + nl +
			'parancs: &nbsp; GORA [szám] [-/b/s]' + nl +
			'példa: &nbsp; &nbsp; gora 512 b');
			break;
		case 'help':
			elozo(s + 'HELP - A honlap súgója' + nl +
			'Segítségével lekérdezhető a parancsok dokumentációja.' + nl +
			'parancs: &nbsp; HELP [parancs]' + nl +
			'példa: &nbsp; &nbsp; help time');
			break;
		case 'ip':
			elozo(s + 'IP - IP cím mutatása' + nl +
			'Kiírja a használatban lévő gép IP címét.' + nl +
			'parancs: &nbsp; IP [nincs paramétere]');
			break;
		case 'label':
			elozo(s + 'LABEL - Honlap címének átírása' + nl +
			'Módosítja a weboldal nevét.' + nl +
			'parancs: &nbsp; LABEL [szöveg]' + nl +
			'példa: &nbsp; &nbsp; label Az én terminálom');
			break;
		case 'like':
			elozo(s + 'LIKE - Tetszik az oldal' + nl +
			'Weblap lájkolása a Facebook közösségi portálon.' + nl +
			'parancs: &nbsp; LIKE [nincs paramétere]');
			break;
		case 'md5':
			elozo(s + 'MD5 - Szövegátalakítás' + nl +
			'A beírt szöveget alakítja át md5 algoritmus szerint.' + nl +
			'parancs: &nbsp; MD5 [tetszőleges szöveg]' + nl +
			'példa: &nbsp; &nbsp; md5 Programozónak lenni király :)');
			break;
		case 'sha1':
			elozo(s + 'SHA1 - Szövegátalakítás' + nl +
			'A beírt szöveget alakítja át sha1 algoritmus szerint.' + nl +
			'parancs: &nbsp; SHA1 [tetszőleges szöveg]' + nl +
			'példa: &nbsp; &nbsp; sha1 Programozónak lenni király :)');
			break;
		case 'sha224':
			elozo(s + 'SHA224 - Szövegátalakítás' + nl +
			'A beírt szöveget alakítja át sha224 algoritmus szerint.' + nl +
			'parancs: &nbsp; SHA224 [tetszőleges szöveg]' + nl +
			'példa: &nbsp; &nbsp; sha224 Programozónak lenni király :)');
			break;
		case 'sha256':
			elozo(s + 'SHA256 - Szövegátalakítás' + nl +
			'A beírt szöveget alakítja át sha256 algoritmus szerint.' + nl +
			'parancs: &nbsp; SHA256 [tetszőleges szöveg]' + nl +
			'példa: &nbsp; &nbsp; sha256 Programozónak lenni király :)');
			break;
		case 'mirrow':
			elozo(s + 'MIRROW - Tükrözés' + nl +
			'A beírt szöveget fordítja meg betűnként.' + nl +
			'parancs: &nbsp; MIRROW [tetszőleges szöveg]' + nl +
			'példa: &nbsp; &nbsp; mirrow Visszafele nehezebb elolvasni.');
			break;
		case 'mouse':
			elozo(s + 'MOUSE - Egérkurzor' + nl +
			'Elrejti vagy láthatóvá teszi az egérmutatót.' + nl +
			'parancs: &nbsp; MOUSE [on/off]' + nl +
			'példa: &nbsp; &nbsp; mouse on');
			break;
		case 'pages':
			elozo(s + 'PAGES - Partner oldalak' + nl +
			'Akik kapcsolatban vannak az Anakondával.' + nl +
			'parancs: &nbsp; PAGES [nincs paramétere]');
			break;
		case 'php':
			elozo(s + 'PHP - Függvénykereső' + nl +
			'A php hivatalos leírásában keres.' + nl +
			'Paraméterei:' + nl +
			'&nbsp;- &nbsp; új ablakban nyílik meg' + nl +
			'&nbsp;s &nbsp; jelenlegi ablakban nyílik meg' + nl +
			'parancs: &nbsp; PHP [szöveg] [-/s]' + nl +
			'példa: &nbsp; &nbsp; php substr');
			break;
		case 'prim':
			elozo(s + 'PRIM - Prímszám ellenőrzése' + nl +
			'Eldönti a megadott számról, hogy prím-e.' + nl +
			'parancs: &nbsp; PRIM [szám]' + nl +
			'példa: &nbsp; &nbsp; prim 4657812');
			break;
		case 'profile':
			elozo(s + 'PROFILE - Oldal testreszabása' + nl +
			'Előre meghatározott profilt állít be.' + nl +
			'parancs: &nbsp; PROFILE [default/geek/modern]' + nl +
			'példa: &nbsp; &nbsp; profile geek');
			break;
		case 'ref':
			elozo(s + 'REF - Referenciák' + nl +
			'Webes nyelvek referencia listái.' + nl +
			'Paraméterei:' + nl +
			'&nbsp;h4 &nbsp; HTML4.01' + nl +
			'&nbsp;h5 &nbsp; HTML5' + nl +
			'&nbsp;c &nbsp; CSS 1,2,3' + nl +
			'&nbsp;j &nbsp; JavaScript' + nl +
			'&nbsp;q &nbsp; jQuery' + nl +
			'&nbsp;s &nbsp; SQL' + nl +
			'&nbsp;- &nbsp; új ablakban nyílik meg' + nl +
			'&nbsp;s &nbsp; jelenlegi ablakban nyílik meg' + nl +
			'parancs: &nbsp; REF [h4/h5/c/j/q/s] [-/s]' + nl +
			'példa: &nbsp; &nbsp; ref h5 n');
			break;
		case 'reload':
			elozo(s + 'RELOAD - Oldal újratöltése' + nl +
			'Betölti újra a weboldalt. A parancs után írt' + nl +
			'valós szám értékével késleltetés állítható be.' + nl +
			'parancs: &nbsp; RELOAD [-/szám]' + nl +
			'példa: &nbsp; &nbsp; reload 4');
			break;
		case 'reset':
			elozo(s + 'RESET - Újraindítás' + nl +
			'Statisztika és előzmények törlése.' + nl +
			'Paraméterei:' + nl +
			'&nbsp;- &nbsp; minden adat törlése' + nl + 
			'&nbsp;h &nbsp; előzmények törlése' + nl +
			'&nbsp;s &nbsp; statisztika törlése' + nl +
			'parancs: &nbsp; RESET [-/h/s]' + nl +
			'példa: &nbsp; &nbsp; reset h');
			break;
		case 'sha1':
			elozo(s + 'SHA1 - Szövegátalakítás' + nl +
			'A beírt szöveget alakítja át sha1 algoritmus szerint.' + nl +
			'parancs: &nbsp; SHA1 [tetszőleges szöveg]' + nl +
			'példa: &nbsp; &nbsp; sha1 Az ég kék.');
			break;
		case 'stat':
			elozo(s + 'STAT - Statisztika' + nl +
			'Különböző statisztikai adatokat ír ki.' + nl +
			'parancs: &nbsp; STAT [nincs paramétere]');
			break;
		case 'time':
			elozo(s + 'TIME - Aktuális idő mutatása' + nl +
			'Paraméterei:' + nl +
			'&nbsp;- &nbsp; óra:perc' + nl +
			'&nbsp;u &nbsp; unix időbélyeg' + nl +
			'parancs: &nbsp; TIME [-/u]' + nl +
			'példa: &nbsp; &nbsp; time u');
			break;
		case 'url':
			elozo(s + 'URL - Honlap betöltése' + nl +
			'A parancs egy weboldalt nyit meg.' + nl +
			'Paraméterei:' + nl +
			'&nbsp;- &nbsp; új ablakban nyílik meg' + nl +
			'&nbsp;s &nbsp; jelenlegi ablakban nyílik meg' + nl +
			'parancs: &nbsp; URL [webcím] [-/s]' + nl +
			'példa: &nbsp; &nbsp; url anakonda.hu n');
			break;
		case 'vol':
			elozo(s + 'VOL - Honlap címének kiírása' + nl +
			'Megjelenítí a weboldal nevét.' + nl +
			'parancs: &nbsp; VOL [nincs paramétere]');
			break;
		default: elozo(s + 'HIBA: Nincs ilyen parancs!');
	}
}

function label(l) {
	l = l.substr(6);
	window.document.title = l;
	el[ei] = 'label ' + l;
	elozo(el[ei]);
}

function hash_md5(s) {
	el[ei] = s;
	elozo(s + nl + md5(s.substr(4)));
}

function hash_sha1(s) {
	el[ei] = s;
	elozo(s + nl + sha1(s.substr(5)));
}

function hash_sha224(s) {
	el[ei] = s;
	elozo(s + nl + sha224(s.substr(4)));
}

function hash_sha256(s) {
	el[ei] = s;
	elozo(s + nl + sha256(s.substr(4)));
}

function mirrow(s) {
	el[ei] = s;
	s = s.substr(7);
	var h = s.length;
	var e = '';
	for (var i = h; i > 0; i = i - 1) e = e + s[i - 1];
	elozo(el[ei] + nl + e);
}

function mouse(p) {
	el[ei] = 'mouse ' + p;
	elozo(el[ei]);
	if (p == 'on') $('body').style.cursor = 'url(), url(), default';
	else if (p == 'off') $('body').style.cursor = 'url(eger.cur), url(eger.cur), default';
	else elozo(el[ei] + nl + hiba);
}

function pages() {
	el[ei] = 'pages';
	elozo(el[ei] + nl +
		'www.tttweb.hu &nbsp; &nbsp; &nbsp; Titkos Tudás Tárháza' + nl +
		'www.rejtjelezo.hu &nbsp; &nbsp; Rejtjelező' + nl +
		'www.szabogergo.hu &nbsp; &nbsp; Szabó Gergő fotóoldala' + nl +
		'www.hiperkapu.hu &nbsp; &nbsp; Hiperkapu :: Sci-Fi űrhajók' + nl +
		'www.indikator.hu &nbsp; &nbsp; &nbsp;INDIKÁTOR | kreatív honlapkészítés' + nl +
		'www.memlex.hu &nbsp; &nbsp; &nbsp; Memória Lexikon'
	);
}

function php(q, p) {
	el[ei] = trim('php ' + q + ' ' + p);
	elozo(el[ei]);
	if (p == '') window.open('http://php.net/manual-lookup.php?pattern=' + q, '_blank');
	else if (p == 's') window.location.href = 'http://php.net/manual-lookup.php?pattern=' + q;
	else $('elozo').innerHTML += nl + hiba;
}

function prim(n) {
	var p = 'prim ' + n;
	el[ei] = p;
	if (parseInt(n) != n || n < 0) elozo(p + nl + 'HIBA: Természetes számot kell beírni!');
	else if (n == 1 || n == 2) elozo(p + nl + 'igen');
	else {
		for (var i = 2; i < n; i++) {
			if (n % i == 0) {
				var e = 0;
				elozo(p + nl + 'nem');
				break;
			}
			if (n % i != 0) var e = 1;
		}
		if (e == 1) elozo(p + nl + 'igen');
	}
}

function profile(p) {
	el[ei] = 'profile ' + p;
	elozo(el[ei]);
	if (p == 'default') {
		a = 'off';
		$('body').style.background = $('k').style.background = '#000';
		$('body').style.color = $('k').style.color = '#008000';
		$('szoveg').style.display = 'block';
		$('baloldal').style.maxWidth = '460px';
		$('k').style.width = '440px';
		$('body').style.cursor = 'url(eger.cur), url(eger.cur), default';
	}
	else if (p == 'geek') {
		a = 'off';
		$('body').style.background = $('k').style.background = '#000';
		$('body').style.color = $('k').style.color = '#fff';
		$('szoveg').style.display = 'none';
		$('baloldal').style.maxWidth = 'none';
		$('k').style.width = '740px';
		$('body').style.cursor = 'url(eger.cur), url(eger.cur), default';
	}
	else if (p == 'modern') {
		a = 'on';
		$('body').style.background = $('k').style.background = '#008080';
		$('body').style.color = $('k').style.color = '#fff';
		$('szoveg').style.display = 'block';
		$('baloldal').style.maxWidth = '460px';
		$('k').style.width = '440px';
		$('body').style.cursor = 'url(), url(), default';
	}
	else elozo(el[ei] + nl + hiba);
}

function ref(q, p) {
	el[ei] = trim('ref ' + q + ' ' + p);
	if (p == '') var hely = '_blank';
	else if (p == 's') var hely = '_self';
	else {
		elozo(el[ei] + nl + hiba);
		return;
	}
	if (q == 'h4') window.open('http://www.w3schools.com/tags/default.asp', hely);
	else if (q == 'h5') window.open('http://www.w3schools.com/html5/html5_reference.asp', hely);
	else if (q == 'c') window.open('http://www.w3schools.com/cssref/default.asp', hely);
	else if (q == 'j') window.open('http://www.w3schools.com/jsref/default.asp', hely);
	else if (q == 'q') window.open('http://www.w3schools.com/jquery/jquery_ref_selectors.asp', hely);
	else if (q == 's') window.open('http://www.w3schools.com/sql/sql_quickref.asp', hely);
	elozo(el[ei]);
}

function reload(m) {
	m = parseFloat(m);
	if (isNaN(m)) m = '';
	el[ei] = trim('reload ' + m);
	elozo(el[ei]);
	$('promt').innerHTML = '';
	$('k').disabled = true;
	$('elozo').innerHTML += '&nbsp;';
	if (m > 0) {
		for (var i = m; i >= 0; i = i - 1) {
			setTimeout(function() {
				$('elozo').innerHTML += ' ' + m;
				if (m == 0) window.location.reload(true);
				m--;
			}, (m - i) * 1000);
		}
	}
	else window.location.reload(true);
}

function reset(p) {
	el[ei] = trim('reset ' + p);
	if (p == '' || p == 's' || p == 'h') {
		elozo(el[ei] + nl + 'OK');
		if (p == '' || p == 'h') {
			irany = '';
			el = new Array();
			el[0] = '';
			ei = 1;
			ek = 1;
		}
		if (p == '' || p == 's') {
			bill = 0;
			katt = 0;
			ind = unix_time();
		}
	}
	else elozo(el[ei] + nl + hiba);
}

function stat() {
	var i = new Date(ind * 1000);
	var p = i.getMinutes();
	if (p < 10) p = '0' + p;
	var s = 'Weboldal indítása: &nbsp; &nbsp;' + i.getHours() + ':' + p + nl;
	i = new Date((unix_time() - ind) * 1000);
	var o = i.getHours() - 1;
	var p = i.getMinutes();
	if (p < 10) p = '0' + p;
	if (o == 0) i = '0:' + p;
	else i = o + ':' + p;
	s += 'Azóta eltelt idő: &nbsp; &nbsp; ' + i + nl + 'Kiadott parancsok: &nbsp; &nbsp;' + el.length + ' darab' + nl + 'Leütött billentyűk: &nbsp; ' + bill + ' darab' + nl + 'Egér kattintások: &nbsp; &nbsp; ' + katt + ' darab';
	el[ei] = 'stat';
	elozo('stat' + nl + s);
}

function time(p) {
	el[ei] = trim('time ' + p);
	if (p == '') {
		var i = new Date();
		var m = i.getMinutes();
		if (m < 10) m = '0' + m;
		elozo(el[ei] + nl + i.getHours() + ':' + m);
	}
	else if (p == 'u') elozo('time u' + nl + unix_time());
	else elozo(el[ei] + nl + hiba);
}

function url(u, p) {
	el[ei] = trim('url ' + u + ' ' + p);
	elozo(el[ei]);
	if (u.indexOf('http://') == -1 && u.indexOf('https://') == -1 && u.indexOf('ftp://') == -1) u = 'http://' + u;
	if (p == '') window.open(u, '_blank');
	else if (p == 's') window.location.href = u;
	else $('elozo').innerHTML += nl + hiba;
}

function vol() {
	el[ei] = 'vol';
	elozo(el[ei] + nl + window.document.title);
}
