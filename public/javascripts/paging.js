function setPaging(now, total, page, func) {
	if(total > 0) {
		var prev = now - 1;
		var next = now + 1;
		if(prev < 1) {
			prev = 1;
		}
		if(next > page) {
			next = page;
		}
		var text = "<ul class='pagination'>";
		text = text + "<li><a onclick='" + func + "(" + prev + ")' aria-label='Previous' style='cursor:pointer;'><span aria-hidden='true'>＜</span></a></li>";
		var group = Math.ceil(now / 5);
		group = ((group - 1) * 5) + 1;
		for(i=group; i<group+5; i++) {
			if(i == now) {
				text = text + "<li><a><font color='84b4c2' style='font-weight:bold;'>" + i + "</font></a></li>";
			} else {
				if(i <= page) {
					text = text + "<li><a onclick='" + func + "(" + i + ")' style='cursor:pointer;'>" + i + "</a></li>";
				}
			}
		}
		text = text + "<li><a onclick='" + func + "(" + next + ")' aria-label='Next' style='cursor:pointer;'><span aria-hidden='true'>＞</span></a></li>";
		text = text + "</ul>";
		document.getElementById("paging").innerHTML = text;
	} else {
		var text = "<ul class='pagination'>";
		text = text + "</ul>";
		document.getElementById("paging").innerHTML = text;
	}
}