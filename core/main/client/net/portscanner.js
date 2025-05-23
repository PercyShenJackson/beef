//
// Copyright (c) 2006-2025 Wade Alcorn - wade@bindshell.net
// Browser Exploitation Framework (BeEF) - https://beefproject.com
// See the file 'doc/COPYING' for copying permission
//

/**
 * Provides port scanning functions for the zombie. A mod of pdp's scanner
 * 
 * Version: '0.1',
 * author: 'Petko Petkov',
 * homepage: 'http://www.gnucitizen.org'
 * @namespace beef.net.portscanner
 */

beef.net.portscanner = {

		/**
		 * 
		 * @param callback 
		 * @param target 
		 * @param port 
		 * @param timeout 
		 */
		scanPort: function(callback, target, port, timeout) 
		{
			var timeout = (timeout == null)?100:timeout;
			var img = new Image();

			img.onerror = function () {
				if (!img) return;
				img = undefined;
				callback(target, port, 'open');
			};

			img.onload  = img.onerror;
			
			img.src = 'http://' + target + ':' + port;

			setTimeout(function () {
				if (!img) return;
				img = undefined;
				callback(target, port, 'closed');
			}, timeout);

		},
		/**
		 * 
		 * @param callback 
		 * @param target 
		 * @param ports_str 
		 * @param timeout 
		 */
		scanTarget: function(callback, target, ports_str, timeout)
		{
			var ports = ports_str.split(",");

			for (index = 0; index < ports.length; index++) {
				this.scanPort(callback, target, ports[index], timeout);
			};

		}
};

beef.regCmp('beef.net.portscanner');

